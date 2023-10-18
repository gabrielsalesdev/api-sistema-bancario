const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors');

const routes = require('./routes');

const errorMiddlewares = require('./middlewares/error');

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(errorMiddlewares.errorHandler);

app.listen(port);