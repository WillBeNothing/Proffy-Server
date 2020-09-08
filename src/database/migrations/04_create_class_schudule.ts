import Knex from 'knex'

export async function up(Knex: Knex) {
    return await Knex.schema.createTable('class_schedule', table => {
        table.increments('id').notNullable().primary();
        table.integer('week_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();


        table.integer('class_id').
        notNullable().
        references('id').
        inTable('classes').
        onDelete('CASCADE').
        onUpdate('CASCADE')
    })
}


export async function down(knex: Knex) {
    return await knex.schema.dropTable('class_schedule')
}
