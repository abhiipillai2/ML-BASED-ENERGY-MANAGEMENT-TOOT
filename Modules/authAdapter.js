const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const pool = require('./databseAdapter')
const logger = require('./logMaster')
const dotenv = require('dotenv').config({ path: './class/sql.env' })
const router = express.Router()

//must use body parser for decoding the params from the url
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let currentAuth = [];

//user-registration-DB
router.post('/authReg', (req, res) => {

    //ruele check
    pool.connection.getConnection((err, connection) => {
        if (err) {
            logger.error(err);
        }
        logger.info(`connected id ${connection.threadId}`);
        console.log(`connected id ${connection.threadId}`);
        const param = req.body
        const e_mail = param.e_mail

        logger.info("request reached");
        logger.info(param);
        logger.info("find the user e_mail");
        logger.info(e_mail);
        logger.info("check the user is already registered or not");
        logger.info("SELECT * FROM user_data_master WHERE e_mail=?");
        connection.query('SELECT * FROM user_data_master WHERE e_mail=?', e_mail, (err, rows) => {


            if (!err) {
                let resObj = rows
                if (resObj.length >= 1) {

                    res.send("user allredy exist!")
                    logger.info("user is allredy exist !");
                    logger.info("end of request processing");

                } else {

                    //creat new users
                    connection.query('INSERT INTO user_data_master SET id=?', param, (err, rows) => {
                        connection.release()

                        if (!err) {

                            res.send('auth-200')
                            logger.info("user is created");
                            logger.info("end of request processing");
                        } else {
                            res.send(err)
                            logger.info("databse error");
                            logger.error(err);
                        }
                    });
                }
            }
        });
    });

});


//for getting auth(current user details) details
router.get('/currentAuth/:id', (req, res) => {

    let param = req.params
    let authParameter = req.params.id

    logger.info("request reached")
    logger.info(param)
    logger.info("getting id from the request")
    logger.info(authParameter)

    pool.connection.getConnection((err, connection) => {
        if (err) {
            logger.error(err)
        }

        logger.info(`connected id ${connection.threadId}`)
        console.log(`connected id ${connection.threadId}`)
        logger.info("getting auth details using id")
        logger.info(`SELECT * FROM user_data_master WHERE e_mail = ${authParameter}`)
        connection.query('SELECT * FROM user_data_master WHERE e_mail = ' + authParameter, (err, rows) => {
            connection.release()

            if (!err) {
                currentAuth = rows
                res.send(currentAuth)
                logger.info("user details getted")
                logger.info(currentAuth)
                logger.info("end of request processing")
            } else {
                res.send(err)
                logger.error("database error")
                logger.error(currentAuth)
            }
        });
    });

})

//exporting
module.exports = router;