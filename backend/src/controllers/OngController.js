
const connection = require('../database/connection');

const generateId  = require('../utils/generateId');

module.exports = {
    /* chamamos o metodo que lista todos de index */
    async index (request,response) {
        
            const ongs = await connection('ongs').select('*').catch( error =>
                console.log(error));
        
            /*explicamos que o corpo(response) retornara no formato json*/
            return response.json(ongs);
        },
   
        /*1.1 adicionamos a função a declaração async pois o metodo "insert" do connection pode vir a demorar a a contecer, só podemos enviar o return final quando ela terminar. */
    async create(request, response) {

    /* configuramos para pegar o corpo da requisição
    e tambem fazemos a desestruturação dos dados, para pegar somente os dados que queremos */
         const {nome,email,whatsapp,city,uf} = request.body;
    
    /* estrategia para criar o ID (primaryKey utilizando o crypto que sera imoprtado)
    utilizando o metodo a baixo para gerar 4 bytes e transformamos em string('hex') hexadecimal
    */
    /* agora continuamos criando connection.js */
    const id = generateId();
    /* apos o connection criado, requirimos o connection e o configuramos */
    
    /*1.1 então adicionamos o await para o async aguardar o await deste codigo para continuar o return */
     await connection('ongs').insert( /*aqui os parametros sao a tabela escolhida, e suas colunas a serem enviadas*/
        { 
            id,
            nome,
            email,
            whatsapp,
            city,
            uf,
        }).catch( error =>
            console.log(error));
    
    
     /* salvamos o id no banco e tambem enviamos como resposta para utilização do user */
     /* no inmsonia conseguimos agora fazer o metodo post retornando um id */
        return response.json({ id
           
        });
    }
}
