import Knex from 'knex'

const db = Knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'docker',
        database: 'Proffy'
    },
    useNullAsDefault: true
})


export default db