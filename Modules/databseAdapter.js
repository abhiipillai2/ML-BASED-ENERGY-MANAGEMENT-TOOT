const mysql = require('mysql')
const logger = require('./logMaster')
const dotenv = require('dotenv').config({ path: './class/sql.env' })

//database connection

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});
//for gettng connection stutus
pool.getConnection((err, connection) => {
    if (err) {
        console.log(err)
        logger.debug("databas is not connected");
        logger.error(err);
    } else {
        console.log("database connection estblished sucessfully")
        logger.info("database connection estblished sucessfully");

    }
});

//exporting module
module.exports.connection = pool;