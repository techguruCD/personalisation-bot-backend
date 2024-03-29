require('dotenv').config()
module.exports = {
    development: {
        host: process.env.DEV_DB_HOST,
        port: process.env.DEV_DB_PORT,
        username: process.env.DEV_DB_USERNAME,
        password: process.env.DEV_DB_PASSWORD,
        database: process.env.DEV_DB_DATABASE,
        dialect: process.env.DEV_DB_DIALECT
    }
}