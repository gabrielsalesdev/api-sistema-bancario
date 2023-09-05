const express = require('express');
const errorMiddlewares = require('./middlewares/error');
const routes = require('./routes');
const app = express();
const port = 3000;

app.use(express.json());

app.use(routes);

app.use(errorMiddlewares.errorHandler);

app.listen(port);