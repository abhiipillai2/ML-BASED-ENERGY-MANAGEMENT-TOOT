const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const moment = require('moment')
const date = moment()
const pool = require('./databseAdapter')
const logger = require('./logMaster')
const dotenv = require('dotenv').config({ path: './class/sql.env' })
const router = express.Router()

//must use body parser for decoding the params from the url
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//harrware registration from user interface
router.post('/hwRgFU', (req, res) => {

    logger.info("request reached")

    //db updation according to the user details
    pool.connection.getConnection((err, connection) => {
        if (err) {

            logger.error(err)
        }

        console.log(`connected id ${connection.threadId}`)
        const param = req.body

        logger.info(param)
        logger.info(`connected id ${connection.threadId}`)
        logger.info("inserting data")
        logger.info(`INSERT INTO hardware_e_mail_schema SET id=?`)

        connection.query('INSERT INTO hardware_e_mail_schema SET id=?', param, (err, rows) => {
            connection.release()

            if (!err) {

                res.send('rg-200')
                logger.info("sedig 200")
                logger.info("end of requrst processing")
            } else {
                res.send(err)

                logger.error("database errorr")
                logger.error(err)
            }
        });
        console.log(param)
    });

});

//harrware remove from user interface
router.post('/hwRm', (req, res) => {
    //db updation according to the user details
    logger.info("request reached")
    pool.connection.getConnection((err, connection) => {
        if (err) {

            logger.error(err)
        }
        console.log(`connected id ${connection.threadId}`)
        const param = req.body.e_mail

        logger.info(param)
        logger.info(`connected id ${connection.threadId}`)
        logger.info("deleting data")
        logger.info(`DELETE FROM hardware_e_mail_schema WHERE e_mail = ?`)

        connection.query('DELETE FROM hardware_e_mail_schema WHERE e_mail = ?', param, (err, rows) => {
            connection.release()

            if (!err) {
                res.send('rm-200')

                logger.info("sedig 200")
                logger.info("end of requrst processing")
            } else {
                res.send(err)

                logger.error("database errorr")
                logger.error(err)
            }
        });
        console.log(param)
    });

});

//exporting
module.exports = router;