pool.getConnection((err, connection) => {
    if (err) throw err
    console.log(`connected id of ${connection.threadId}`)
        //for power calculation
    connection.query('SELECT * FROM vip_' + vipPshId + ' WHERE id=(SELECT max(id) FROM vip_' + vipPshId + ')', (err, rows) => {

        if (!err) {
            //calculating the power || unit || fare
            let data = rows
            power_value = (data[0].voltage_value * data[0].current_value)
            unit_value = ((data[0].voltage_value * data[0].current_value) * 1) / (1000)
            fare_value = (((data[0].voltage_value * data[0].current_value) * 1) / (1000)) * (3.15)

            //JSON format
            let pufJSON = {
                dummy: 00,
                power_value: power_value,
                unint_value: unit_value,
                fare_value: fare_value
            };


            // puf updation
            connection.query('INSERT INTO puf_' + vipPshId + ' SET id=?', pufJSON, (err, rows) => {

                connection.release()
                if (!err) {
                    res.send(rows)
                } else {
                    res.send(err)
                }
            });

            res.send(rows)

        } else {
            res.send(err)
        }
    });

    // //////day operatio of power || unit || fare
    let hour = '11' //date.format('h')
    let togle = 'pm' //date.format('a')
    let month = date.format('MM')
    let monthCount = 2 //parseInt(month)
    let count = 2


    //for day action
    if (hour == '11' && togle == 'pm') {

        pool.getConnection((err, connection) => {
            if (err) throw err
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
                        //updating puf DB
                    pool.getConnection((err, connection) => {
                        if (err) throw err
                        console.log(`connected id ${connection.threadId}`)

                        connection.query('INSERT INTO puf_day_' + vipPshId + ' SET id=?', pufDayJSON, (err, rows) => {


                        });
                        console.log(param)
                    });

                } else {
                    res.send(err)
                }

            });

        });

    }

    //for month action
    if (monthCount == count) {

        pool.getConnection((err, connection) => {
            if (err) throw err
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
                            dummy: 11,
                            power_value_month: power_month_val,
                            unit_value_month: unit_month_val,
                            fare_value_month: fare_month_val
                        }
                        //updating puf DB
                    pool.getConnection((err, connection) => {
                        if (err) throw err
                        console.log(`connected id ${connection.threadId}`)

                        connection.query('INSERT INTO puf_month_' + vipPshId + ' SET id=?', pufMonthJSON, (err, rows) => {

                        });
                        console.log(param)
                    });

                } else {
                    res.send(err)
                }

            });

        });

        //condition updating
        count = monthCount + 1

    }
    //for connection relasing pool
    pool.getConnection((err, connection) => {
        if (err) throw err
        connection.query('SELECT * FROM user_data_master', (err, rows) => {
            connection.release()
            if (!err) {
                res.send("200-msater-end")
            } else {
                res.send(err)
            }

        });

    });


});