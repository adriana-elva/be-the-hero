//Metodo up é responsavel pela criação da tabela 
exports.up = function(knex) {
    //API criação de tabela
    //recebe como segundo parametro uma função que recebe nossa tabela como parametro 
    return knex.schema.createTable('ongs',function (table) {
        table.string('id').primary();
        table.string('nome').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf',2).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('ongs');
  
};
