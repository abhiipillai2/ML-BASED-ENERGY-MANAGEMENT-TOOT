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

//server variable 
let power_value = 0
let unit_value = 0
let fare_value = 0

let power_day_val = 0
let unit_day_val = 0
let fare_day_val = 0

let power_month_val = 0
let unit_month_val = 0
let fare_month_val = 0

let month = date.format('MM')
let monthCount = parseInt(month)
let count = 0
    //condition updating
if (monthCount == 12) {

    count = 1
} else {

    count = monthCount + 1

}


//master VIP Push Route
router.post('/vipPush/:id', (req, res) => {
    const param = req.body
    let vipPshId = req.params.id

    logger.info("request reached")
    logger.info(param)
    logger.info("finding root id")
    logger.info(vipPshId)

    //db updation according to the vip details
    pool.connection.getConnection((err, connection) => {
        if (err) {

            logger.error(err)
        }
        console.log(`connected id ${connection.threadId}`)
        logger.info(`connected id ${connection.threadId}`)
        logger.info("inserting data to vip")
        logger.info(`INSERT INTO vip_${vipPshId} SET id=?`)

        connection.query('INSERT INTO vip_' + vipPshId + ' SET id=?', param, (err, rows) => {
            //vip updating connection
        });
        console.log(param)

        //for puf
        logger.info("inserting data to vip")
        logger.info(`SELECT * FROM vip_${vipPshId} id=(SELECT max(id) FROM vip_${vipPshId}`)

        connection.query('SELECT * FROM vip_' + vipPshId + ' WHERE id=(SELECT max(id) FROM vip_' + vipPshId + ')', (err, rows) => {

            //for puff connection
            if (!err) {
                //calculating the power || unit || fare
                let data = rows
                power_value = (data[0].voltage_value * data[0].current_value)
                unit_value = ((data[0].voltage_value * data[0].current_value) * 1) / (1000)
                fare_value = (((data[0].voltage_value * data[0].current_value) * 1) / (1000)) * (process.env.BILL)

                //JSON format
                let pufJSON = {
                    dummy: 00,
                    power_value: power_value,
                    unint_value: unit_value,
                    fare_value: fare_value
                };

                logger.info("JSON formating");
                logger.info(pufJSON);
                // puf updation
                logger.info("inserting data to puf")
                logger.info(`INSERT INTO puf_${vipPshId} SET id=?`)

                connection.query('INSERT INTO puf_' + vipPshId + ' SET id=?', pufJSON, (err, rows) => {
                    //nothing
                });

            } else {
                //res.send(err)
                logger.error("database errorr")
                logger.error(err)
            }

        });
        //puf -day
        //day operatio of power || unit || fare
        let hour = date.format('h')
        let togle = date.format('a')
        month = date.format('MM')
        monthCount = parseInt(month)



        logger.info(`hour id ${hour}`)
        logger.info(`togle id ${togle}`)
        logger.info(`mount id ${monthCount}`)
        logger.info(`next coud ${count}`)
            //for day action
        if (hour == process.env.HOUR && togle == process.env.TOGLE) {

            logger.info("getting data to puf")
            logger.info(`SELECT * FROM puf_${vipPshId} ORDER BY id DESC LIMIT 10`)

            connection.query('SELECT * FROM puf_' + vipPshId + ' ORDER BY id DESC LIMIT 10', (err, rows) => {

                if (!err) {

                    let pufData = rows
                    let powerOut = 0
                    let unitOut = 0
                    let fareOut = 0
                        //power day
                    for (let i = 0; i < pufData.length; i++) {

                        powerOut = pufData[i].power_value + powerOut
                        unitOut = pufData[i].unint_value + unitOut
                        fareOut = pufData[i].fare_value + fareOut
                    }
                    //avg value of power || unit || fare
                    power_day_val = powerOut / pufData.length
                    unit_day_val = unitOut / pufData.length
                    fare_day_val = fareOut / pufData.length
                        //JSON FOR PUF DAY
                    let pufDayJSON = {
                            dummy: 11,
                            power_value_day: power_day_val,
                            unit_value_day: unit_day_val,
                            fare_value_day: fare_day_val
                        }
                        //////
                    logger.info("JSON formating")
                    logger.info(pufDayJSON)
                    logger.info("inserting data to puf")
                    logger.info(`INSERT INTO puf_day_${vipPshId} SET id=?`)

                    connection.query('INSERT INTO puf_day_' + vipPshId + ' SET id=?', pufDayJSON, (err, rows) => {
                        //nothing douing
                    });
                } else {
                    //res.send(err)
                    logger.error("database errorr")
                    logger.error(err)
                }

            });

        }
        //puf-month
        if (monthCount == count) {

            logger.info("getting data to puf")
            logger.info(`SELECT * FROM puf_${vipPshId} ORDER BY id DESC LIMIT 2`)


            connection.query('SELECT * FROM puf_' + vipPshId + ' ORDER BY id DESC LIMIT 2', (err, rows) => {

                if (!err) {
                    let pufData = rows
                    let powerOut = 0
                    let unitOut = 0
                    let fareOut = 0
                        //power day
                    for (let i = 0; i < pufData.length; i++) {

                        powerOut = pufData[i].power_value + powerOut
                        unitOut = pufData[i].unint_value + unitOut
                        fareOut = pufData[i].fare_value + fareOut
                    }
                    //avg value of power || unit || fare

                    power_month_val = powerOut / pufData.length
                    unit_month_val = unitOut / pufData.length
                    fare_month_val = fareOut / pufData.length
                        //JSON FOR PUF month
                    let pufMonthJSON = {
                        dummy: '11',
                        power_value_month: power_month_val,
                        unit_value_month: unit_month_val,
                        fare_value_month: fare_month_val
                    };
                    //updating puf DB
                    logger.info("JSON formating")
                    logger.info(pufMonthJSON)
                    logger.info("inserting data to puf_month")
                    logger.info(`INSERT INTO puf_month_${vipPshId} SET id=?`)

                    connection.query('INSERT INTO puf_month_' + vipPshId + ' SET id=?', pufMonthJSON, (err, rows) => {
                        connection.release()
                        if (!err) {

                        } else {
                            //res.send(err)
                            logger.error("database errorr")
                            logger.error(err)
                        }
                    });

                } else {
                    //res.send(err)
                    logger.error("database errorr")
                    logger.error(err)
                }
            });

            //condition updating
            if (monthCount == 12) {

                count = 1
            } else {

                count = monthCount + 1

            }

        }

    });

    res.send("vip-push-sucess-full")
    logger.info("vip-push-sucess-full")

});



//exporting
module.exports = router;
