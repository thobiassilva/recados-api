require("dotenv").config();

let config = {};

if (process.env.NODE_ENV?.toLocaleLowerCase() === "test") {
  config = {
    type: "sqlite",
    url: "./testdb.sqlite",
    synchronize: false,
    entities: ["src/core/infra/database/entities/**/*"],
    migrations: ["tests/core/infra/database/migrations/**/*"],
    cli: {
      entitiesDir: "src/core/infra/database/entities",
      migrationsDir: "tests/core/infra/database/migrations",
    },
  };
} else {
  const eProducao = process.env.NODE_ENV?.toLocaleLowerCase() === "prod";
  const pastaRaiz = eProducao ? "dist" : "src";

  config = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: false,
    logging: false,
    entities: [pastaRaiz + "/core/infra/database/entities/**/*"],
    migrations: [pastaRaiz + "/core/infra/database/migrations/**/*"],
    cli: {
      entitiesDir: "src/core/infra/database/entities",
      migrationsDir: "src/core/infra/database/migrations",
    },
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

module.exports = config;
