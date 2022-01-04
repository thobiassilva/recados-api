require('dotenv').config();

const eProducao = process.env.NODE_ENV?.toLocaleLowerCase() === 'production';

const pastaRaiz = eProducao ? 'dist' : 'src';

module.exports = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: false,
    logging: false,
    entities: [pastaRaiz + '/database/entities/**/*'],
    migrations: [pastaRaiz + '/database/migrations/**/*'],
    cli: {
        entitiesDir: 'src/database/entities',
        migrationsDir: 'src/database/migrations',
    },
    ssl: {
        rejectUnauthorized: false
    }
};
