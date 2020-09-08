import Knex from 'knex'

export async function up(Knex: Knex) {
    return await Knex.schema.createTable('classes', table => {
        table.increments('id').notNullable().primary().unique();
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();


        table.integer('user_id').
        notNullable().
        references('id').
        inTable('proffys').
        onDelete('CASCADE').
        onUpdate('CASCADE')
    })
}


export async function down(knex: Knex) {
    return await knex.schema.dropTable('classes')
}
