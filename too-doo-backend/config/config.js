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
  prod: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: 'too-doo-postgres',
    port: 5432,
    dialect: 'postgres',
    define: {
      underscored: true
    }
  }
};