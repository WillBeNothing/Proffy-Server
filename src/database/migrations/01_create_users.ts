import Knex from 'knex'

export async function up(Knex: Knex) {
    return await Knex.schema.createTable('users', table => {
        table.increments('id').notNullable().primary();
        table.string('email').notNullable()
        table.string('password').defaultTo("SECRET_PASSWORD")
        table.string('password_hash').notNullable()
        table.string('name').notNullable();
        

        table.string('avatar_url')
        
    })
}


export async function down(knex: Knex) {
    return await knex.schema.dropTable('users')
}