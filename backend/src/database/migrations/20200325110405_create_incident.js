
exports.up = function(knex) {
  return knex.schema.createTable('incidents', (table) => {
    table.increments(); //* chave primaria de auto increment
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.string('value').notNullable();
    
    /* referenciando chave estrangeira, a coluna e depois a referencia */
    table.string('ong_id').notNullable();
    table.foreign('ong_id').references('id').inTable('ongs');


  });
};

exports.down = function(knex) {
    /* para reverter o schema */
    /* npx knex para saber os comandos knex, como rollback para voltar*/
  knex.schema.dropTable('incidents');
/* apos isso precisamos configurar as rotas */
  
};
