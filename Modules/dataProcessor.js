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

router.get('/hourPower/:tred/:id', (req, res) => {

    //route paramters
    let param = req.params
    let maxnumber = req.params.id
    let node = req.params.tred

    logger.info("request reached")
    logger.info(param)
    logger.info("finding trde number")
    logger.info(maxnumber)
    logger.info("finding root id")
    logger.info(node)

    pool.connection.getConnection((err, connection) => {
        if (err) {

            logger.error(err)
        }

        logger.info(`connected id ${connection.threadId}`)
        console.log(`connected id ${connection.threadId}`)
        logger.info("finding data")
        logger.info(`SELECT * FROM puf_${node}  ORDER BY timestamp DESC LIMIT ${maxnumber}`)

        connection.query("SELECT DATE_FORMAT(update_time, '%Y-%m-%d %H:00:00') AS hour_start, AVG(apparant_power) AS avg_value FROM vip_push_master_data WHERE update_time >= DATE_SUB(NOW(), INTERVAL ? HOUR) AND hardware_id = ? GROUP BY HOUR(update_time)",[maxnumber,node],(err, rows) => {
            connection.release()

            if (!err) {
                res.send(rows)

                logger.info("sending data packet")
                logger.info(rows)

            } else {
                res.send(err)

                logger.error("database error")
                logger.error(err)
            }
        });

    });

});
//////////////////////////////
//power day
router.get('/dayPower/:tred/:id', (req, res) => {

    //route paramters
    let param = req.params
    let maxnumber = req.params.id
    let node = req.params.tred

    logger.info("request reached")
    logger.info(param)
    logger.info("finding trde number")
    logger.info(maxnumber)
    logger.info("finding root id")
    logger.info(node)

    pool.connection.getConnection((err, connection) => {
        if (err) {

            logger.error(err)
        }

        console.log(`connected id ${connection.threadId}`)
        logger.info(`connected id ${connection.threadId}`)
        logger.info("finding data")
        logger.info(`SELECT * FROM puf_day${node}  ORDER BY timestamp DESC LIMIT ${maxnumber}`)

        connection.query('SELECT DATE(update_time) AS day_start, AVG(apparant_power) AS avg_value FROM vip_push_master_data WHERE update_time >= DATE_SUB(NOW(), INTERVAL ? DAY) AND hardware_id = ? GROUP BY DATE(update_time)',[maxnumber,node], (err, rows) => {
            connection.release()

            if (!err) {
                res.send(rows)

                logger.info("sending data packet")
                logger.info(rows)
            } else {
                res.send(err)

                logger.error("database eoor")
                logger.error(err)
            }
        });

    });

});
//////////////////////////////
//power month
router.get('/monthPower/:tred/:id', (req, res) => {

    //route paramters
    let param = req.params
    let maxnumber = req.params.id
    let node = req.params.tred

    logger.info("request reached")
    logger.info(param)
    logger.info("finding trde number")
    logger.info(maxnumber)
    logger.info("finding root id")
    logger.info(node)

    pool.connection.getConnection((err, connection) => {
        if (err) {

            logger.error(err)
        }

        console.log(`connected id ${connection.threadId}`)
        logger.info(`connected id ${connection.threadId}`)
        logger.info("finding data")
        logger.info(`SELECT * FROM puf_month${node}  ORDER BY timestamp DESC LIMIT ${maxnumber}`)

        connection.query("SELECT DATE_FORMAT(update_time, '%Y-%m-01') AS month_start, AVG(apparant_power) AS avg_value FROM vip_push_master_data WHERE update_time >= DATE_SUB(NOW(), INTERVAL ? MONTH) AND hardware_id = ? GROUP BY DATE_FORMAT(update_time, '%Y-%m')",[maxnumber,node], (err, rows) => {
            connection.release()

            if (!err) {
                res.send(rows)

                logger.info("sending data packet")
                logger.info(rows)
            } else {
                res.send(err)

                logger.error("database eoor")
                logger.error(err)
            }
        });

    });

});
//////////////////////////////
//unit hour
router.get('/hourUnit/:tred/:id', (req, res) => {

    //route paramters
    let param = req.params
    let maxnumber = req.params.id
    let node = req.params.tred

    logger.info("request reached")
    logger.info(param)
    logger.info("finding trde number")
    logger.info(maxnumber)
    logger.info("finding root id")
    logger.info(node)

    pool.connection.getConnection((err, connection) => {
        if (err) {

            logger.error(err)
        }

        console.log(`connected id ${connection.threadId}`)
        logger.info(`connected id ${connection.threadId}`)
        logger.info("finding data")
        logger.info(`SELECT * FROM puf_${node}  ORDER BY timestamp DESC LIMIT ${maxnumber}`)

        connection.query('SELECT apparant_power FROM vip_push_master_data WHERE update_time >= NOW() - INTERVAL ? HOUR and hardware_id = ?',[maxnumber,node], (err, rows) => {
            connection.release()

            if (!err) {

                let grb = JSON.parse(JSON.stringify(rows))
                let snapshot_value = 0
                let snapshot = 0
                for (let i = 0; i < grb.length; i++) {

                    snapshot_value = grb[i].apparant_power + snapshot_value
                }
                snapshot = snapshot_value / grb.length
                let avgUnit = (snapshot/1000)

                let snapJSON = { value: avgUnit }
                res.send(snapJSON)

                logger.info("sending data packet")
                logger.info(rows)
            } else {
                res.send(err)

                logger.error("database eoor")
                logger.error(err)
            }
        });

    });

})

//////////////////////////////
//unit day
router.get('/dayUnit/:tred/:id', (req, res) => {

    //route paramters
    let param = req.params
    let maxnumber = req.params.id
    let node = req.params.tred

    logger.info("request reached")
    logger.info(param)
    logger.info("finding trde number")
    logger.info(maxnumber)
    logger.info("finding root id")
    logger.info(node)

    pool.connection.getConnection((err, connection) => {
        if (err) {

            logger.error(err)
        }


        console.log(`connected id ${connection.threadId}`)
        logger.info(`connected id ${connection.threadId}`)
        logger.info("finding data")
        logger.info(`SELECT * FROM puf_day${node}  ORDER BY timestamp DESC LIMIT ${maxnumber}`)

        let dayHour = (maxnumber * 24)
        connection.query('SELECT apparant_power FROM vip_push_master_data WHERE update_time >= NOW() - INTERVAL ? HOUR and hardware_id = ?',[dayHour,node], (err, rows) => {
            connection.release()

            if (!err) {

                let grb = JSON.parse(JSON.stringify(rows))
                let snapshot_value = 0
                let snapshot = 0
                for (let i = 0; i < grb.length; i++) {

                    snapshot_value = grb[i].apparant_power + snapshot_value
                }
                snapshot = snapshot_value / grb.length

                let avgUnit = (snapshot/1000)
                let snapJSON = { value: avgUnit }
                res.send(snapJSON)

                logger.info("sending data packet")
                logger.info(rows)

            } else {
                res.send(err)

                logger.error("database eoor")
                logger.error(err)
            }
        });

    });

});
//////////////////////////////
//unit month
router.get('/monthUnit/:tred/:id', (req, res) => {

    //route paramters
    let param = req.params
    let maxnumber = req.params.id
    let node = req.params.tred

    logger.info("request reached")
    logger.info(param)
    logger.info("finding trde number")
    logger.info(maxnumber)
    logger.info("finding root id")
    logger.info(node)

    pool.connection.getConnection((err, connection) => {
        if (err) {

            logger.error(err)
        }

        console.log(`connected id ${connection.threadId}`)
        logger.info(`connected id ${connection.threadId}`)
        logger.info("finding data")
        logger.info(`SELECT * FROM puf_month_${node}  ORDER BY timestamp DESC LIMIT ${maxnumber}`)

        let monthHour = (maxnumber * 672)
        connection.query('SELECT apparant_power FROM vip_push_master_data WHERE update_time >= NOW() - INTERVAL ? HOUR and hardware_id = ?',[monthHour,node], (err, rows) => {
            connection.release()

            if (!err) {
                //console.log(rows)
                let grb = JSON.parse(JSON.stringify(rows))
                let snapshot_value = 0
                let snapshot = 0
                for (let i = 0; i < grb.length; i++) {

                    snapshot_value = grb[i].apparant_power + snapshot_value
                }
                snapshot = snapshot_value / grb.length
                let avgUnit = (snapshot/1000)

                let snapJSON = { value: avgUnit }
                res.send(snapJSON)

                logger.info("sending data packet")
                logger.info(rows)

            } else {
                res.send(err)

                logger.error("database eoor")
                logger.error(err)
            }
        });

    });

});

//////////////////////////////
//bill hour
router.get('/hourBill/:tred/:id', (req, res) => {

    //route paramters
    let param = req.params
    let maxnumber = req.params.id
    let node = req.params.tred

    logger.info("request reached")
    logger.info(param)
    logger.info("finding trde number")
    logger.info(maxnumber)
    logger.info("finding root id")
    logger.info(node)

    pool.connection.getConnection((err, connection) => {
        if (err) {

            logger.error(err)
        }

        console.log(`connected id ${connection.threadId}`)
        logger.info(`connected id ${connection.threadId}`)
        logger.info("finding data")
        logger.info(`SELECT * FROM puf_${node}  ORDER BY timestamp DESC LIMIT ${maxnumber}`)

        connection.query('SELECT * FROM puf_' + node + ' ORDER BY timestamp DESC LIMIT ' + maxnumber + '', (err, rows) => {
            connection.release()

            if (!err) {

                let grb = JSON.parse(JSON.stringify(rows))
                let snapshot_value = 0
                let snapshot = 0
                for (let i = 0; i < grb.length; i++) {

                    snapshot_value = grb[i].fare_value + snapshot_value
                }
                snapshot = snapshot_value / grb.length

                let snapJSON = { value: snapshot }
                res.send(snapJSON)
                logger.info("sending data packet")
                logger.info(rows)
            } else {
                res.send(err)

                logger.error("database eoor")
                logger.error(err)
            }
        });

    });

});
//////////////////////////////
//bill day
router.get('/dayBill/:tred/:id', (req, res) => {

    //route paramters
    let param = req.params
    let maxnumber = req.params.id
    let node = req.params.tred

    logger.info("request reached")
    logger.info(param)
    logger.info("finding trde number")
    logger.info(maxnumber)
    logger.info("finding root id")
    logger.info(node)

    pool.connection.getConnection((err, connection) => {
        if (err) {

            logger.error(err)
        }

        console.log(`connected id ${connection.threadId}`)
        logger.info(`connected id ${connection.threadId}`)
        logger.info("finding data")
        logger.info(`SELECT * FROM puf_day_${node}  ORDER BY timestamp DESC LIMIT ${maxnumber}`)

        connection.query('SELECT * FROM puf_day_' + node + ' ORDER BY timestamp DESC LIMIT ' + maxnumber + '', (err, rows) => {
            connection.release()

            if (!err) {

                let grb = JSON.parse(JSON.stringify(rows))
                let snapshot_value = 0
                let snapshot = 0
                for (let i = 0; i < grb.length; i++) {

                    snapshot_value = grb[i].fare_value_day + snapshot_value
                }
                snapshot = snapshot_value / grb.length

                let snapJSON = { value: snapshot }
                res.send(snapJSON)

                logger.info("sending data packet")
                logger.info(rows)
            } else {
                res.send(err)

                logger.error("database eoor")
                logger.error(err)
            }
        });

    });

});
//////////////////////////////
//bill day
router.get('/monthBill/:tred/:id', (req, res) => {

    //route paramters
    let param = req.params
    let maxnumber = req.params.id
    let node = req.params.tred

    logger.info("request reached")
    logger.info(param)
    logger.info("finding trde number")
    logger.info(maxnumber)
    logger.info("finding root id")
    logger.info(node)

    pool.connection.getConnection((err, connection) => {
        if (err) {

            logger.error(err)
        }

        console.log(`connected id ${connection.threadId}`)
        logger.info(`connected id ${connection.threadId}`)
        logger.info("finding data")
        logger.info(`SELECT * FROM puf_month_${node}  ORDER BY timestamp DESC LIMIT ${maxnumber}`)

        connection.query('SELECT * FROM puf_month_' + node + ' ORDER BY timestamp DESC LIMIT ' + maxnumber + '', (err, rows) => {
            connection.release()

            if (!err) {
                //console.log(rows)
                let grb = JSON.parse(JSON.stringify(rows))
                let snapshot_value = 0
                let snapshot = 0
                for (let i = 0; i < grb.length; i++) {

                    snapshot_value = grb[i].fare_value_month + snapshot_value
                }
                snapshot = snapshot_value / grb.length

                let snapJSON = { value: snapshot }
                res.send(snapJSON)

                logger.info("sending data packet")
                logger.info(rows)
            } else {
                res.send(err)

                logger.error("database eoor")
                logger.error(err)
            }
        });

    });

});

//////////////////////////////
//vi-graph
router.get('/viTriger/:tred/:id', (req, res) => {

    //route paramters
    let param = req.params
    let maxnumber = req.params.id
    let node = req.params.tred

    logger.info("request reached")
    logger.info(param)
    logger.info("finding trde number")
    logger.info(maxnumber)
    logger.info("finding root id")
    logger.info(node)


    pool.connection.getConnection((err, connection) => {
        if (err) {

            logger.error(err)
        }

        console.log(`connected id ${connection.threadId}`)
        logger.info(`connected id ${connection.threadId}`)
        logger.info("finding data")
        logger.info(`SELECT * FROM vip_${node}  ORDER BY timestamp DESC LIMIT ${maxnumber}`)

        connection.query("SELECT DATE_FORMAT(update_time, '%Y-%m-%d %H:00:00') AS hour_start, AVG(current) AS avg_current_value, AVG(voltage) AS avg_voltage_value, AVG(power_factor) AS avg_pf_value FROM vip_push_master_data WHERE update_time >= DATE_SUB(NOW(), INTERVAL ? HOUR) AND hardware_id = ? GROUP BY HOUR(update_time)",[maxnumber,node] ,(err, rows) => {
            connection.release()

            if (!err) {
                res.send(rows)

                logger.info("sending data packet")
                logger.info(rows)
            } else {
                res.send(err)

                logger.error("database eoor")
                logger.error(err)
            }
        });

    });

});
//exporting
module.exports = router;