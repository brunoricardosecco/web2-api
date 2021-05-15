require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

/* module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: `${process.env.DB_HOST}:${process.env.DB_PORT}`,
    dialect: process.env.DB_DIALECT || 'postgres',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: process.env.DB_DIALECT || 'postgres',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: process.env.DB_DIALECT || 'postgres',
  },
}; */

module.exports = {
  development: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialect: process.env.DB_DIALECT || 'postgres',
    /* dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    }, */
    operatorAliases: false,
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      ssl: true,
    },
  },
};
