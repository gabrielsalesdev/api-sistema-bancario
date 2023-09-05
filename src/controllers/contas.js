const HttpError = require('../utils/http-error');
const sistemaBancario = require('../database');

const listarContas = (req, res, next) => {
    try {
        const { senhaBanco } = req.query;

        if (!senhaBanco) throw new HttpError('Senha do banco não fornecida', 400);
        if (senhaBanco !== sistemaBancario.banco.senha) throw new HttpError('Autenticação falhou', 401);

        res.status(200).json(sistemaBancario.contas);
    } catch (e) {
        next(e);
    }
};

const criarConta = (req, res, next) => {
    try {
        const { nome, cpf, dataNascimento, telefone, email, senha } = req.body;

        const cpfExists = sistemaBancario.contas.some(el => el.usuario.cpf === cpf);
        const emailExists = sistemaBancario.contas.some(el => el.usuario.email === email);

        if (cpfExists || emailExists) throw new HttpError('Informações fornecidas já estão em uso', 409);

        const conta = {
            numero: (sistemaBancario.contNumeroContas++).toString(),
            saldo: 0,
            usuario: {
                nome,
                cpf,
                dataNascimento,
                telefone,
                email,
                senha
            }
        }

        sistemaBancario.contas.push(conta);
        res.status(201).end();
    } catch (e) {
        next(e);
    }
};

const atualizarUsuario = (req, res, next) => {
    try {
        const { conta } = req;
        const { nome, cpf, dataNascimento, telefone, email, senha } = req.body;

        const cpfExists = sistemaBancario.contas.some(el => el.numero !== conta.numero && el.usuario.cpf === cpf);
        const emailExists = sistemaBancario.contas.some(el => el.numero !== conta.numero && el.usuario.email === email);

        if (cpfExists || emailExists) throw new HttpError('Informações fornecidas já estão em uso', 409);

        conta.usuario.nome = nome;
        conta.usuario.cpf = cpf;
        conta.usuario.dataNascimento = dataNascimento;
        conta.usuario.telefone = telefone;
        conta.usuario.email = email;
        conta.usuario.senha = senha;

        res.status(204).end();
    } catch (e) {
        next(e);
    }
};

const excluirConta = (req, res, next) => {
    try {
        const { conta } = req;

        if (conta.saldo !== 0) throw new HttpError('Não é possível excluir uma conta com saldo positivo', 400);

        sistemaBancario.contas = sistemaBancario.contas.filter(el => el.numero !== conta.numero);
        res.status(204).end();
    } catch (e) {
        next(e);
    }
};

const exibirSaldo = (req, res, next) => {
    const { conta } = req;

    const saldo = {
        saldo: conta.saldo
    }

    res.status(200).json(saldo);
};

const exibirExtrato = (req, res, next) => {
    const { conta } = req;

    const registrosSaques = sistemaBancario.saques.filter(el => el.numeroConta === conta.numero);
    const registrosDepositos = sistemaBancario.depositos.filter(el => el.numeroConta === conta.numero);
    const registrosTransferenciasEnviadas = sistemaBancario.transferencias.filter(el => el.numeroContaOrigem === conta.numero);
    const registrosTransferenciasRecebidas = sistemaBancario.transferencias.filter(el => el.numeroContaDestino === conta.numero);

    const extrato = {
        saques: registrosSaques,
        depositos: registrosDepositos,
        transferenciasEnviadas: registrosTransferenciasEnviadas,
        transferenciasRecebidas: registrosTransferenciasRecebidas
    }

    res.status(200).json(extrato);
};

module.exports = { listarContas, criarConta, atualizarUsuario, excluirConta, exibirSaldo, exibirExtrato };