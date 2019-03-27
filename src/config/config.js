const dotenv = require('dotenv');

dotenv.config();

const {
  LOCAL_DB_USER,
  LOCAL_DB_PASSWORD,
  LOCAL_DB_NAME,
  PROD_DB_URL,
} = process.env;

module.exports = {
  development: {
    username: LOCAL_DB_USER,
    password: LOCAL_DB_PASSWORD,
    database: LOCAL_DB_NAME,
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
  },
  production: {
    use_env_variable: PROD_DB_URL,
  },
};
