const express = require('express');
const contasMiddlewares = require('./middlewares/contas');
const transacoesMiddlewares = require('./middlewares/transacoes');
const contasController = require('./controllers/contas');
const transacoesController = require('./controllers/transacoes');
const routes = express.Router();

routes.get('/contas', contasController.listarContas);
routes.get('/contas/saldo', contasMiddlewares.autenticarConta, contasController.exibirSaldo);
routes.get('/contas/extrato', contasMiddlewares.autenticarConta, contasController.exibirExtrato);
routes.post('/contas', contasMiddlewares.validarPropriedadesUsuario, contasController.criarConta);
routes.put('/contas/:numeroConta/usuario', contasMiddlewares.validarNumeroConta, contasMiddlewares.validarPropriedadesUsuario, contasController.atualizarUsuario);
routes.delete('/contas/:numeroConta', contasMiddlewares.validarNumeroConta, contasController.excluirConta);

routes.post('/transacoes/depositar', transacoesMiddlewares.validarDeposito, transacoesController.depositar);
routes.post('/transacoes/sacar', transacoesMiddlewares.validarSaque, transacoesController.sacar);
routes.post('/transacoes/transferir', transacoesMiddlewares.validarTransferencia, transacoesController.transferir);

module.exports = routes;