/*
- arquivos de teste sao colocados como spec
- testes são feitos em um formato de frase 
- npm test para testar
*/
const generateId = require('../../src/utils/generateId');

describe('Generate unique id' , () => {
    it('should generate a unique ID', () => {
        id = generateId();

        expect(id).toHaveLength(8);
    });
});