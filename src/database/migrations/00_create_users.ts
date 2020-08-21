import Knex from 'knex'

export async function up(Knex: Knex) {
    return await Knex.schema.createTable('users', table => {
        table.increments('id').notNullable().primary();
        table.string('name').notNullable();
        table.string('avatar').notNullable();
        table.string('whatsapp').notNullable();
        table.string('bio').notNullable();
    })
}


export async function down(knex: Knex) {
    return await knex.schema.dropTable('users')
}
