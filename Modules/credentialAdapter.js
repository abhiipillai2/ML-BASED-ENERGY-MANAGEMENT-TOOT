const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const pool = require('./databseAdapter')
const logger = require('./logMaster')
const e = require('express')
const dotenv = require('dotenv').config({ path: './class/sql.env' })
const router = express.Router()

//must use body parser for decoding the params from the url
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//for hardware
router.get('/hw/:id', (req, res) => {

    let param = req.params
    let hardwareId = req.params.id

    logger.info("request reached")
    logger.info(param)
    logger.info("getting id from request")
    logger.info(hardwareId)
    console.log(hardwareId)

    pool.connection.getConnection((err, connection) => {
        if (err) {
            logger.error(err)
        }

        console.log(`connected id ${connection.threadId}`)
        logger.info(`connected id ${connection.threadId}`)
        logger.info("getting hardware details from table")
        logger.info("SELECT * FROM harrdware_id_master WHERE hardware_id = ?")

        connection.query('SELECT * FROM harrdware_id_master WHERE hardware_id = ?', hardwareId, (err, rows) => {
            connection.release()

            if (!err) {
                let resObj = rows
                if (resObj.length >= 1) {
                    res.send('ok')

                    logger.info("checking hardware is registred or not")
                    logger.info("hardware details get send 200-ok to hardware")
                    logger.info("end of requet processing")
                } else {
                    res.send('nt')

                    logger.info("checking hardware is registred or not")
                    logger.info("hardware details not found sending nt to hardware")
                    logger.info("end of requet processing")
                }
            } else {
                res.send(err)

                logger.error("database error")
                logger.error(err)
            }
        });
    });

});



//for new hardware registration---main-operation take time not done repetly
router.get('/rg/:id', (req, res) => {

    //json file for new hardware registration
    let param = req.params
    let hardwareTable = req.params.id
    let hJson = { dummy: '123', hardware_id: hardwareTable }

    logger.info("request reached")
    logger.info(param)
    logger.info("getting id from request")
    logger.info(hardwareTable)
    console.log(hardwareTable)
    logger.info("formating to JSON")
    logger.info(hJson)

    //for hardware registration

    pool.connection.getConnection((err, connection) => {
        if (err) {

            logger.info(err)
        }

        console.log(`connected id ${connection.threadId}`)
        logger.info(`connected id ${connection.threadId}`)
        logger.info("inser new hardware details")
        logger.info("INSERT INTO harrdware_id_master SET id=?")

        connection.query('INSERT INTO harrdware_id_master SET id=?', hJson, (err, rows) => {

        });

    });

    logger.info("table creation started")
        //table creating section
        //for vip table creation
    pool.connection.getConnection((err, connection) => {
        if (err) {
            logger.error(err)
        }

        logger.info("vip table cration")
        logger.info(`CREATE TABLE vip_${hardwareTable} (id int NOT NULL AUTO_INCREMENT , dummy int , voltage_value float , current_value float , power_factor_value float , timestamp TIMESTAMP NOT NULL , PRIMARY KEY (id))'`)

        connection.query('CREATE TABLE ' + 'vip_' + hardwareTable + ' (id int NOT NULL AUTO_INCREMENT , dummy int , voltage_value float , current_value float , power_factor_value float , timestamp TIMESTAMP NOT NULL , PRIMARY KEY (id))', (err, rows) => {

        });

    });

    //for puf table creation
    logger.info("puf table cration")
    logger.info(`CREATE TABLE puf_${hardwareTable} (id int NOT NULL AUTO_INCREMENT , dummy int , voltage_value float , current_value float , power_factor_value float , timestamp TIMESTAMP NOT NULL , PRIMARY KEY (id))'`)

    pool.connection.getConnection((err, connection) => {
        if (err) throw err
        connection.query('CREATE TABLE ' + 'puf_' + hardwareTable + ' (id int NOT NULL AUTO_INCREMENT , dummy int , power_value float , unint_value float , fare_value float , timestamp TIMESTAMP NOT NULL , PRIMARY KEY (id))', (err, rows) => {

        });

    });

    //for puf day--creation

    logger.info("puf day table cration")
    logger.info(`CREATE TABLE puf_day_${hardwareTable} (id int NOT NULL AUTO_INCREMENT , dummy int , voltage_value float , current_value float , power_factor_value float , timestamp TIMESTAMP NOT NULL , PRIMARY KEY (id))'`)


    pool.connection.getConnection((err, connection) => {
        if (err) throw err
        connection.query('CREATE TABLE ' + 'puf_day_' + hardwareTable + ' (id int NOT NULL AUTO_INCREMENT , dummy int , power_value_day float , unit_value_day float , fare_value_day float , timestamp TIMESTAMP NOT NULL , PRIMARY KEY (id))', (err, rows) => {

        });

    });

    //for puf--mnth creation

    logger.info("puf month table cration")
    logger.info(`CREATE TABLE puf_month_s${hardwareTable} (id int NOT NULL AUTO_INCREMENT , dummy int , voltage_value float , current_value float , power_factor_value float , timestamp TIMESTAMP NOT NULL , PRIMARY KEY (id))'`)


    pool.connection.getConnection((err, connection) => {
        if (err) throw err
        connection.query('CREATE TABLE ' + 'puf_month_' + hardwareTable + ' (id int NOT NULL AUTO_INCREMENT , dummy int , power_value_month float , unit_value_month float , fare_value_month float , timestamp TIMESTAMP NOT NULL , PRIMARY KEY (id))', (err, rows) => {
            connection.release()
            if (!err) {
                res.send("ok-200-crated")

                logger.info("all tables are created")
                logger.info("end of request proceesing")

            } else {
                res.send(err)

                logger.error("database error")
                logger.error(err)
            }

        });

    });

});


//exporting
module.exports = router;