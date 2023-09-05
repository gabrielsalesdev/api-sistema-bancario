const { format } = require('date-fns');
const sistemaBancario = require('../database');

const depositar = (req, res, next) => {
    try {
        const { conta, valor } = req;

        conta.saldo += valor;

        const registro = {
            data: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            numeroConta: conta.numero,
            valor
        }

        sistemaBancario.depositos.push(registro);
        res.status(204).end();
    } catch (e) {
        next(e);
    }
};

const sacar = (req, res, next) => {
    try {
        const { conta, valor } = req;

        conta.saldo -= valor;

        const registro = {
            data: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            numeroConta: conta.numero,
            valor
        }

        sistemaBancario.saques.push(registro);
        res.status(204).end();
    } catch (e) {
        next(e);
    }
};

const transferir = (req, res, next) => {
    try {
        const { contaOrigem, contaDestino, valor } = req;

        contaOrigem.saldo -= valor;
        contaDestino.saldo += valor;

        const registro = {
            data: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            numeroContaOrigem: contaOrigem.numero,
            numeroContaDestino: contaDestino.numero,
            valor
        }

        sistemaBancario.transferencias.push(registro);
        res.status(204).end();
    } catch (e) {
        next(e);
    }
};

module.exports = { depositar, sacar, transferir };