const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Create ong', () => {
    beforeEach(async () => {
        await connection.migrate.latest();
        
    });
    it(' Should create a new ong', async () =>{
        const response = await request(app)
        .post('/ongs')
        .send({
            nome:"URF",
            email: "contato@URF.com.br",
            whatsapp: "48000000000",
            city: "Rio do Sul",
            uf: "sc"
        });
        console.log(response.body);
    });
});