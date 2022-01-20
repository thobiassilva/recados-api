require('dotenv').config();

const eProducao = process.env.NODE_ENV?.toLocaleLowerCase() === 'prod';

const pastaRaiz = eProducao ? 'dist' : 'src';

module.exports = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: false,
    logging: false,
    entities: [pastaRaiz + '/core/infra/database/entities/**/*'],
    migrations: [pastaRaiz + '/core/infra/database/migrations/**/*'],
    cli: {
        entitiesDir: 'src/core/infra/database/entities',
        migrationsDir: 'src/core/infra/database/migrations',
    },
    ssl: {
        rejectUnauthorized: false
    }
};
