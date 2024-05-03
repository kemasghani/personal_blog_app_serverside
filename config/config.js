require('dotenv').config()
const config = {
    development: {
        username: process.env.DB_USER,
        password: process.env.PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.HOST,
        dialect: 'postgres'
    },
}

module.exports = config;
