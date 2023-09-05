const HttpError = require('../utils/http-error');
const sistemaBancario = require('../database');

const validarNumeroConta = (req, res, next) => {
    try {
        const { numeroConta } = req.params;
        const conta = sistemaBancario.contas.find(el => el.numero === numeroConta);

        if (!numeroConta || !conta) throw new HttpError('Número de conta inválido ou não encontrado', 404);

        req.conta = conta;
        next();
    } catch (e) {
        next(e);
    }
};

const validarPropriedadesUsuario = (req, res, next) => {
    try {
        const { nome, cpf, dataNascimento, telefone, email, senha } = req.body;

        if (!nome || !cpf || !dataNascimento || !telefone || !email || !senha) throw new HttpError('Dados obrigatórios não fornecidos', 400);

        next();
    } catch (e) {
        next(e);
    }
};

const autenticarConta = (req, res, next) => {
    try {
        const { numeroConta, senha } = req.query;
        const conta = sistemaBancario.contas.find(el => el.numero === numeroConta);

        if (!numeroConta || !conta) throw new HttpError('Número de conta inválido ou não encontrado', 404);
        if (!senha) throw new HttpError('Senha da conta não fornecida', 400);
        if (conta.usuario.senha !== senha) throw new HttpError('Autenticação falhou', 401);

        req.conta = conta;
        next();
    } catch (e) {
        next(e);
    }
};

module.exports = { validarNumeroConta, validarPropriedadesUsuario, autenticarConta };