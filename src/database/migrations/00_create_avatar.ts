import Knex from 'knex'

export async function up(Knex: Knex) {
    return await Knex.schema.createTable('avatar', table => {
        table.increments('id').notNullable().primary();
        table.string('avatar_path').notNullable();
        table.string('avatar_name').notNullable();
        table.string('avatar_url').notNullable();
    })
}


export async function down(knex: Knex) {
    return await knex.schema.dropTable('avatar')
}