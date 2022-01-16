module.exports = {
  dev: {
    username: 'too_doo_user',
    password: 'password',
    database: 'too_doo_dev',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    define: {
      underscored: true
    }
  },
  test: {
    username: process.env.TEST_DB_USER || 'postgres',
    password: process.env.TEST_DB_PASSWORD || 'password',
    database: 'too_doo_test',
    host: process.env.TEST_DB_HOST || 'localhost',
    port: 5432,
    dialect: 'postgres',
    define: {
      underscored: true
    },
    logging: () => {}
  },
  prod: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST, // don't stick to specific host in Docker
    port: 5432,
    dialect: 'postgres',
    define: {
      underscored: true
    }
  }
};