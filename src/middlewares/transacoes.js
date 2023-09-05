const HttpError = require('../utils/http-error');
const sistemaBancario = require('../database');

const validarDeposito = (req, res, next) => {
    try {
        const numeroConta = req.body.numeroConta;
        const valor = Number(req.body.valor);
        const conta = sistemaBancario.contas.find(el => el.numero === numeroConta);

        if (!numeroConta || !conta) throw new HttpError('Número de conta inválido ou não encontrado', 404);
        if (isNaN(valor) || !valor || valor <= 0) throw new HttpError('Valor de depósito inválido', 400);

        req.conta = conta;
        req.valor = valor;
        next();
    } catch (e) {
        next(e);
    }
};

const validarSaque = (req, res, next) => {
    try {
        const { numeroConta, senha } = req.body;
        const valor = Number(req.body.valor);
        const conta = sistemaBancario.contas.find(el => el.numero === numeroConta);

        if (!numeroConta || !conta) throw new HttpError('Número de conta inválido ou não encontrado', 404);
        if (isNaN(valor) || !valor || valor <= 0 || valor > conta.saldo) throw new HttpError('Valor de saque inválido ou saldo insuficiente', 400);
        if (!senha) throw new HttpError('Senha da conta não fornecida', 400);
        if (conta.usuario.senha !== senha) throw new HttpError('Autenticação falhou', 401);

        req.conta = conta;
        req.valor = valor;
        next()
    } catch (e) {
        next(e);
    }
};

const validarTransferencia = (req, res, next) => {
    try {
        const { numeroContaOrigem, numeroContaDestino, senha } = req.body;
        const valor = Number(req.body.valor);
        const contaOrigem = sistemaBancario.contas.find(el => el.numero === numeroContaOrigem);
        const contaDestino = sistemaBancario.contas.find(el => el.numero === numeroContaDestino);

        if (!numeroContaOrigem || !numeroContaDestino || !contaOrigem || !contaDestino) throw new HttpError('Número de conta inválido ou não encontrado', 404);
        if (numeroContaOrigem === numeroContaDestino) throw new HttpError('Não é possível transferir para a mesma conta', 400);
        if (isNaN(valor) || !valor || valor <= 0 || valor > contaOrigem.saldo) throw new HttpError('Valor de transferência inválido ou saldo insuficiente', 400);
        if (!senha) throw new HttpError('Senha da conta não fornecida', 400);
        if (contaOrigem.usuario.senha !== senha) throw new HttpError('Autenticação falhou', 401);

        req.contaOrigem = contaOrigem;
        req.contaDestino = contaDestino;
        req.valor = valor;
        next();
    } catch (e) {
        next(e);
    }
};

module.exports = { validarDeposito, validarSaque, validarTransferencia };