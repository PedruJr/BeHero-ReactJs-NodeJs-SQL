/* para começar a classe precisamos da requisição do knex e suas configurações que estão na pasta src */
const knex = require('knex');
const configuration = require("../../knexfile.js");
/* então configuramos uma variavel connection com o knex e suas configs */

const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

const connection = knex(config); /* obs foi pego o metodo development do arquivo configs js */


/* então exportamos o arquivo, que sera importado pelos que precisam utilizar o banco */
module.exports = connection;

