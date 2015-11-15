module.exports = {
  dbConfig: {
    client: 'mysql',
    connection: process.env.MYSQL_DATABASE_CONNECTION || {
      host: '127.0.0.1',
      user: 'root',
      password: 'root',
      database: 'rest_books',
      charset: 'utf8'
    }
  }
};
