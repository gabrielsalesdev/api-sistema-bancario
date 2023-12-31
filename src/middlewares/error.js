const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({ mensagem: err.message || 'Erro interno do servidor' });
};

module.exports = { errorHandler };
