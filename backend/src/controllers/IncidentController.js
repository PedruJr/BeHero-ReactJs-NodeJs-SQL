const connection = require("../database/Connection");


module.exports = {
    async index (request, response) {
        /* esquema de paginação, utilizamos as pages disponiveis no query */
        const { page = 1 } = request.query; /*colocamos =1 para setar o valor padrão caso a pagina nao tenha .page */

        /* mesmo paginando apenas 5 valores, precisamos retornar para o frontend
        a quantidade total de casos */
        const [count] = await connection('incidents').count();

       const incidents = await connection('incidents')
       .join('ongs', 'ongs.id', '=', 'incidents.ong_id') /*join para pegar as informaçoes da ong conforme o id da ong de request */
       .limit(5) /* aqui limitamos a busca a apenas 5 resultados */
       .offset((page - 1 ) * 5) /* conta 5 apartir da page, pulando as que foram vistas já */
       .select(['incidents.*', 'ongs.nome', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']); /* agora para nao haver sobreposição de campos, selecionamos no join os campos (colunas) que queremos */
        
       /* enviamos o count por header da response,utilizamos o console log para saber exatamente onde estava este valor */
       response.header('X-Total-Count', count['count(*)'])

        return response.json(incidents);

    },

    async indexEspecific(request, response) {
        ong_id = request.headers.authorization;
        
       const especificIndex = await connection('incidents')
       .where('ong_id', ong_id)
       .select('*');

        return response.json(especificIndex);
    },


    
    async create(request, response) {
        /* geralmente o header envia as informaçoes conjuntas(contexto) da requisição,
        tais elas como ong_id, localização entre outras = request.header; */
        const{title,description,value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').table('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        
        return response.json({id});
    },

    async delete(request, response) {
        
        /* para sabermos o id do request, vemos os parametros enviado para função */
        const { id } = request.params;
        /* para verificar se o ong-id é o mesmo de quem fez o request da tabela */
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id) /* params indicando o id desejado*/
        .select('ong_id') /* cofirmar se é a mesma ong fazendo o request */
        .first(); /*esta requisição possui apenas a primeira resposta */

        if (incident.ong_id !== ong_id) {
            console.log(ong_id);
            console.log(incident.ong_id);
            return response.status(401).json({ error: 'Acess denied'});
            
        }
        /* primeiro fazemos o condicionamento para ver se é o mesmo id de ong do incident,
         depois confirmamos aqui para fazer uma requisição e deletar */

        await connection('incidents').where('id', id).delete();
        console.log(ong_id);
            console.log(incident.ong_id);
        return response.status(204).send();
    }

}