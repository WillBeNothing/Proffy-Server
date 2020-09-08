import Knex from 'knex'

export async function up(Knex: Knex) {
    return await Knex.schema.createTable('proffys', table => {
        table.increments('id').notNullable().primary();
        table.string('name').notNullable();
        table.string('avatar_url').notNullable();
        table.string('whatsapp').notNullable();
        table.string('bio').notNullable();

        table.integer('user_id').
            notNullable().
            references('id').
            inTable('users').
            onDelete('CASCADE').
            onUpdate('CASCADE')
    })
}


export async function down(knex: Knex) {
    return await knex.schema.dropTable('proffys')
}
