require('dotenv').config()

module.exports = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: false,
    logging: false,
    entities: ['src/database/entities/*/**'],
    migrations: ['src/database/migrations/*/**'],
    cli: {
        entitiesDir: 'src/database/entities',
        migrationsDir: 'src/database/migrations',
    },
    ssl: {
        rejectUnauthorized: false
    }
};
