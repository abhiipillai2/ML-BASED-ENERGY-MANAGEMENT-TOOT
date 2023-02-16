const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const moment = require('moment')
const date = moment()
const pool = require('./databseAdapter')
const logger = require('./logMaster')
const dotenv = require('dotenv').config({ path: './class/hardwarePushProperties.env' })
const router = express.Router()

//must use body parser for decoding the params from the url
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//master VIP Push Route
router.post('/vipPush', (req, res) => {
    const body = req.body
    let hardwareId = body.hardware_id
    let current = body.data.current
    let voltage = body.data.voltage
    let active_power = body.data.active_power
    let reactive_power = body.data.reactive_power
    let apparent_power = body.data.apparant_power
    let power_factor = body.data.power_factor
    let thd = body.data.thd
    let phase_angle = body.data.phase_angle



    //db updation according to the vip details
    pool.connection.getConnection((err, connection) => {
        if (err) {

            logger.error(err)
        }
        console.log(`connected id ${connection.threadId}`)
        logger.info(`connected id ${connection.threadId}`)
        logger.info("inserting data to vip")

        connection.query('INSERT INTO vip_push_master_data (current,voltage,apparant_power,active_power,reactive_power,power_factor,thd,hardware_id,phase_angle) VALUES(?,?,?,?,?,?,?,?,?)', [ current , voltage , apparent_power,active_power,reactive_power,power_factor,thd,hardwareId,phase_angle ], (err, rows) => {
            //vip updating connection
        });
    });

    res.send({
        "statusCode": "SC0000",
        "statusDesc": "Success"
    })
    logger.info("vip-push-sucess-full")

});



//exporting
module.exports = router;
