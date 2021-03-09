const express = require('express'); /* importar com node */
const routes = require('./routes');
const cors = require('cors');
const { errors } = require('celebrate');

const app = express(); // * instanciando o framework */

app.use(cors());/* framework de segurança, informara quem pode acessar a aplicação */
app.use(express.json());//* indicando o tipo de arquivo no request do server*/
app.use(routes);//* aplicando nossas rotas no express*/
app.use(errors());

module.exports = app;
