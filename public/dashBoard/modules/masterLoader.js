//********************************************************************** */
//power hour
document.getElementById("lastHour").addEventListener('click', function() {
    let pH = document.getElementById("powerHourSelect")
    let select = pH.value;
    let selectNumber = 0
    if (select == 1) {
        selectNumber = 1
        sendHttpRequest('GET', HTTP_ROOT + '/hourPower/' + httpTred + '/' + selectNumber).then(responseData => {

            //for deleting all element for new update
            dataMaster.splice(0, dataMaster.length)

            //get value of power from db
            let ar = JSON.parse(JSON.stringify(responseData))
            for (let i = 0; i < ar.length; i++) {

                dataMaster.push(ar[i].power_value)
            }
            //remove all existing label from label 
            labelMaster.splice(0, labelMaster.length)
                //adding label corresponds to the value
            for (let j = 1; j < dataMaster.length + 1; j++) {

                labelMaster.push(j.toString())

            }
            //power graph
            let avgPower = 0
            powerGraphMaster();
            //avg power
            for (let n = 0; n < dataMaster.length; n++) {
                avgPower = dataMaster[n] + avgPower
            }
            document.getElementById("avgPower").textContent = "total " + avgPower / dataMaster.length + " Watt"
        });
    } else if (select == 2) {
        selectNumber = 5
        sendHttpRequest('GET', HTTP_ROOT + '/hourPower/' + httpTred + '/' + selectNumber).then(responseData => {

            //for deleting all element for new update
            dataMaster.splice(0, dataMaster.length)

            //get value of power from db
            let ar = JSON.parse(JSON.stringify(responseData))
            for (let i = 0; i < ar.length; i++) {

                dataMaster.push(ar[i].power_value)
            }
            //remove all existing label from label 
            labelMaster.splice(0, labelMaster.length)
                //adding label corresponds to the value
            for (let j = 1; j < dataMaster.length + 1; j++) {

                labelMaster.push(j.toString())
            }
            //power graph
            powerGraphMaster()
                //console.log(dataMaster);
                //avg power
            let avgPower = 0
            for (let n = 0; n < dataMaster.length; n++) {
                avgPower = dataMaster[n] + avgPower
            }
            document.getElementById("avgPower").textContent = "total " + avgPower / dataMaster.length + " Watt"
        });
    } else if (select == 3) {
        selectNumber = 12
        sendHttpRequest('GET', HTTP_ROOT + '/hourPower/' + httpTred + '/' + selectNumber).then(responseData => {

            //for deleting all element for new update
            dataMaster.splice(0, dataMaster.length)

            //get value of power from db
            let ar = JSON.parse(JSON.stringify(responseData))
            for (let i = 0; i < ar.length; i++) {

                dataMaster.push(ar[i].power_value)
            }
            //remove all existing label from label 
            labelMaster.splice(0, labelMaster.length)
                //adding label corresponds to the value
            for (let j = 1; j < dataMaster.length + 1; j++) {

                labelMaster.push(j.toString())
            }
            //power graph
            powerGraphMaster()
            let avgPower = 0
                //avg power
            for (let n = 0; n < dataMaster.length; n++) {
                avgPower = dataMaster[n] + avgPower
            }
            document.getElementById("avgPower").textContent = "total " + avgPower / dataMaster.length + " Watt"
        });
    } else if (select == 4) {
        selectNumber = 15
        sendHttpRequest('GET', HTTP_ROOT + '/hourPower/' + httpTred + '/' + selectNumber).then(responseData => {

            //for deleting all element for new update
            dataMaster.splice(0, dataMaster.length)

            //get value of power from db
            let ar = JSON.parse(JSON.stringify(responseData))
            for (let i = 0; i < ar.length; i++) {

                dataMaster.push(ar[i].power_value)
            }
            //remove all existing label from label 
            labelMaster.splice(0, labelMaster.length)
                //adding label corresponds to the value
            for (let j = 1; j < dataMaster.length + 1; j++) {

                labelMaster.push(j.toString())
            }
            //power graph
            powerGraphMaster()
            let avgPower = 0
                //avg power
            for (let n = 0; n < dataMaster.length; n++) {
                avgPower = dataMaster[n] + avgPower
            }
            document.getElementById("avgPower").textContent = "total " + avgPower / dataMaster.length + " Watt"
        });
    }

});
//***************************************************************************** */
//***************************************************************************** */
//power day
document.getElementById("lastDay").addEventListener('click', function() {
    let pD = document.getElementById("powerDaySelect")
    let select = pD.value;
    let selectNumber = 0
    if (select == 1) {
        selectNumber = 1
        sendHttpRequest('GET', HTTP_ROOT + '/dayPower/' + httpTred + '/' + selectNumber).then(responseData => {

            //for deleting all element for new update
            dataMaster.splice(0, dataMaster.length)

            //get value of power from db
            let ar = JSON.parse(JSON.stringify(responseData))
            for (let i = 0; i < ar.length; i++) {

                dataMaster.push(ar[i].power_value_day)
            }
            //remove all existing label from label 
            labelMaster.splice(0, labelMaster.length)
                //adding label corresponds to the value
            for (let j = 1; j < dataMaster.length + 1; j++) {

                labelMaster.push(j.toString())

            }
            //power graph
            powerGraphMaster()
            let avgPower = 0
                //avg power
            for (let n = 0; n < dataMaster.length; n++) {
                avgPower = dataMaster[n] + avgPower
            }
            document.getElementById("avgPower").textContent = "total " + avgPower / dataMaster.length + " Watt"

        });
    } else if (select == 2) {
        selectNumber = 3
        sendHttpRequest('GET', HTTP_ROOT + '/dayPower/' + httpTred + '/' + selectNumber).then(responseData => {

            //for deleting all element for new update
            dataMaster.splice(0, dataMaster.length)

            //get value of power from db
            let ar = JSON.parse(JSON.stringify(responseData))
            for (let i = 0; i < ar.length; i++) {

                dataMaster.push(ar[i].power_value_day)
            }
            //remove all existing label from label 
            labelMaster.splice(0, labelMaster.length)
                //adding label corresponds to the value
            for (let j = 1; j < dataMaster.length + 1; j++) {

                labelMaster.push(j.toString())
            }
            //power graph
            powerGraphMaster()
            let avgPower = 0
                //avg power
            for (let n = 0; n < dataMaster.length; n++) {
                avgPower = dataMaster[n] + avgPower
            }
            document.getElementById("avgPower").textContent = "total " + avgPower / dataMaster.length + " Watt"
        });
    } else if (select == 3) {
        selectNumber = 7
        sendHttpRequest('GET', HTTP_ROOT + '/dayPower/' + httpTred + '/' + selectNumber).then(responseData => {

            //for deleting all element for new update
            dataMaster.splice(0, dataMaster.length)

            //get value of power from db
            let ar = JSON.parse(JSON.stringify(responseData))
            for (let i = 0; i < ar.length; i++) {

                dataMaster.push(ar[i].power_value_day)
            }
            //remove all existing label from label 
            labelMaster.splice(0, labelMaster.length)
                //adding label corresponds to the value
            for (let j = 1; j < dataMaster.length + 1; j++) {

                labelMaster.push(j.toString())
            }
            //power graph
            powerGraphMaster()
            let avgPower = 0
                //avg power
            for (let n = 0; n < dataMaster.length; n++) {
                avgPower = dataMaster[n] + avgPower
            }
            document.getElementById("avgPower").textContent = "total " + avgPower / dataMaster.length + " Watt"
        });
    }
});
//***************************************************************************** */
//***************************************************************************** */
//power month
document.getElementById("lastMonth").addEventListener('click', function() {
    let pM = document.getElementById("powerMonthSelect")
    let select = pM.value;
    let selectNumber = 0
    if (select == 1) {
        selectNumber = 1
        sendHttpRequest('GET', HTTP_ROOT + '/monthPower/' + httpTred + '/' + selectNumber).then(responseData => {

            //for deleting all element for new update
            dataMaster.splice(0, dataMaster.length)

            //get value of power from db
            let ar = JSON.parse(JSON.stringify(responseData))
            for (let i = 0; i < ar.length; i++) {

                dataMaster.push(ar[i].power_value_month)
            }
            //remove all existing label from label 
            labelMaster.splice(0, labelMaster.length)
                //adding label corresponds to the value
            for (let j = 1; j < dataMaster.length + 1; j++) {

                labelMaster.push(j.toString())

            }
            //power graph
            powerGraphMaster()
            let avgPower = 0
                //avg power
            for (let n = 0; n < dataMaster.length; n++) {
                avgPower = dataMaster[n] + avgPower
            }
            document.getElementById("avgPower").textContent = "total " + avgPower / dataMaster.length + " Watt"

        });
    } else if (select == 2) {
        selectNumber = 3
        sendHttpRequest('GET', HTTP_ROOT + '/monthPower/' + httpTred + '/' + selectNumber).then(responseData => {

            //for deleting all element for new update
            dataMaster.splice(0, dataMaster.length)

            //get value of power from db
            let ar = JSON.parse(JSON.stringify(responseData))
            for (let i = 0; i < ar.length; i++) {

                dataMaster.push(ar[i].power_value_month)
            }
            //remove all existing label from label 
            labelMaster.splice(0, labelMaster.length)
                //adding label corresponds to the value
            for (let j = 1; j < dataMaster.length + 1; j++) {

                labelMaster.push(j.toString())
            }
            //power graph
            powerGraphMaster()
            let avgPower = 0
                //avg power
            for (let n = 0; n < dataMaster.length; n++) {
                avgPower = dataMaster[n] + avgPower
            }
            document.getElementById("avgPower").textContent = "total " + avgPower / dataMaster.length + " Watt"
        });
    }
});
//***************************************************************************** */
//***************************************************************************** */
//unit hour
document.getElementById("unitHour").addEventListener('click', function() {
    let uH = document.getElementById("unitHourSelect")
    let select = uH.value;
    let selectNumber = 0
    if (select == 1) {
        selectNumber = 1
        sendHttpRequest('GET', HTTP_ROOT + '/hourUnit/' + httpTred + '/' + selectNumber).then(responseData => {

            document.getElementById("unitSoket").textContent = responseData.value.toFixed(2) + " UNITS"

        });
    } else if (select == 2) {
        selectNumber = 5
        sendHttpRequest('GET', HTTP_ROOT + '/hourUnit/' + httpTred + '/' + selectNumber).then(responseData => {

            document.getElementById("unitSoket").textContent = responseData.value.toFixed(2) + " UNITS"
        });
    } else if (select == 3) {
        selectNumber = 12
        sendHttpRequest('GET', HTTP_ROOT + '/hourUnit/' + httpTred + '/' + selectNumber).then(responseData => {

            document.getElementById("unitSoket").textContent = responseData.value.toFixed(2) + " UNITS"
        });
    } else if (select == 4) {
        selectNumber = 15
        sendHttpRequest('GET', HTTP_ROOT + '/hourUnit/' + httpTred + '/' + selectNumber).then(responseData => {

            document.getElementById("unitSoket").textContent = responseData.value.toFixed(2) + " UNITS"
        });
    }
});

//***************************************************************************** */
//***************************************************************************** */
//unit day
document.getElementById("unitDay").addEventListener('click', function() {
    let uD = document.getElementById("unitDaySelect")
    let select = uD.value;
    let selectNumber = 0
    if (select == 1) {
        selectNumber = 1
        sendHttpRequest('GET', HTTP_ROOT + '/dayUnit/' + httpTred + '/' + selectNumber).then(responseData => {

            document.getElementById("unitSoket").textContent = responseData.value.toFixed(2) + " UNITS"

        });
    } else if (select == 2) {
        selectNumber = 3
        sendHttpRequest('GET', HTTP_ROOT + '/dayUnit/' + httpTred + '/' + selectNumber).then(responseData => {

            document.getElementById("unitSoket").textContent = responseData.value.toFixed(2) + " UNITS"
        });
    } else if (select == 3) {
        selectNumber = 7
        sendHttpRequest('GET', HTTP_ROOT + '/dayUnit/' + httpTred + '/' + selectNumber).then(responseData => {

            document.getElementById("unitSoket").textContent = responseData.value.toFixed(2) + " UNITS"
        });
    }
});

//***************************************************************************** */
//***************************************************************************** */
//unit month
document.getElementById("unitMonth").addEventListener('click', function() {
    let uM = document.getElementById("unitMonthSelect")
    let select = uM.value;
    let selectNumber = 0
    if (select == 1) {
        selectNumber = 1
        sendHttpRequest('GET', HTTP_ROOT + '/monthUnit/' + httpTred + '/' + selectNumber).then(responseData => {

            document.getElementById("unitSoket").textContent = responseData.value.toFixed(2) + " UNITS"

        });
    } else if (select == 2) {
        selectNumber = 3
        sendHttpRequest('GET', HTTP_ROOT + '/monthUnit/' + httpTred + '/' + selectNumber).then(responseData => {

            document.getElementById("unitSoket").textContent = responseData.value.toFixed(2) + " UNITS"
        });
    }
});
//***************************************************************************** */
//***************************************************************************** */
//bill hour
document.getElementById("billHour").addEventListener('click', function() {
    let bH = document.getElementById("billHourSelect")
    let select = bH.value;
    let selectNumber = 0
    if (select == 1) {
        selectNumber = 1
        sendHttpRequest('GET', HTTP_ROOT + '/hourBill/' + httpTred + '/' + selectNumber).then(responseData => {

            document.getElementById("billSoket").textContent = responseData.value.toFixed(2) + " INR"

        });
    } else if (select == 2) {
        selectNumber = 5
        sendHttpRequest('GET', HTTP_ROOT + '/hourBill/' + httpTred + '/' + selectNumber).then(responseData => {

            document.getElementById("billSoket").textContent = responseData.value.toFixed(2) + " INR"
        });
    } else if (select == 3) {
        selectNumber = 12
        sendHttpRequest('GET', HTTP_ROOT + '/hourBill/' + httpTred + '/' + selectNumber).then(responseData => {

            document.getElementById("billSoket").textContent = responseData.value.toFixed(2) + " INR"
        });
    } else if (select == 4) {
        selectNumber = 15
        sendHttpRequest('GET', HTTP_ROOT + '/hourBill/' + httpTred + '/' + selectNumber).then(responseData => {

            document.getElementById("billSoket").textContent = responseData.value.toFixed(2) + " INR"
        });
    }
});
//***************************************************************************** */
//***************************************************************************** */
//bill day
document.getElementById("billDay").addEventListener('click', function() {
    let bH = document.getElementById("billDaySelect")
    let select = bH.value;
    let selectNumber = 0
    if (select == 1) {
        selectNumber = 1
        sendHttpRequest('GET', HTTP_ROOT + '/dayBill/' + httpTred + '/' + selectNumber).then(responseData => {

            document.getElementById("billSoket").textContent = responseData.value.toFixed(2) + " INR"

        });
    } else if (select == 2) {
        selectNumber = 3
        sendHttpRequest('GET', HTTP_ROOT + '/dayBill/' + httpTred + '/' + selectNumber).then(responseData => {

            document.getElementById("billSoket").textContent = responseData.value.toFixed(2) + " INR"
        });
    } else if (select == 3) {
        selectNumber = 7
        sendHttpRequest('GET', HTTP_ROOT + '/dayBill/' + httpTred + '/' + selectNumber).then(responseData => {

            document.getElementById("billSoket").textContent = responseData.value.toFixed(2) + " INR"
        });
    }
});
//***************************************************************************** */
//***************************************************************************** */
//bill month
document.getElementById("billMonth").addEventListener('click', function() {
    let bH = document.getElementById("billMonthSelect")
    let select = bH.value;
    let selectNumber = 0
    if (select == 1) {
        selectNumber = 1
        sendHttpRequest('GET', HTTP_ROOT + '/monthBill/' + httpTred + '/' + selectNumber).then(responseData => {

            document.getElementById("billSoket").textContent = responseData.value.toFixed(2) + " INR"

        });
    } else if (select == 2) {
        selectNumber = 3
        sendHttpRequest('GET', HTTP_ROOT + '/monthBill/' + httpTred + '/' + selectNumber).then(responseData => {

            document.getElementById("billSoket").textContent = responseData.value.toFixed(2) + " INR"
        });
    }
});



//vi graph
document.getElementById("viTrgs").addEventListener('click', function() {
    let vIV = document.getElementById("viSelect")
    let select = vIV.value;
    let selectNumber = 0
    if (select == 1) {
        selectNumber = 15
        sendHttpRequest('GET', HTTP_ROOT + '/viTriger/' + httpTred + '/' + selectNumber).then(responseData => {

            //for deleting all element for new update
            viMaster.splice(0, viMaster.length)

            //get value of power from db
            let ar = JSON.parse(JSON.stringify(responseData))
            for (let i = 0; i < ar.length; i++) {

                viMaster.push(ar[i].voltage_value)
            }
            //remove all existing label from label 
            viLabelMaster.splice(0, viLabelMaster.length)
                //adding label corresponds to the value
            for (let j = 1; j < viMaster.length + 1; j++) {

                viLabelMaster.push(j.toString())
            }
            //power graph
            viGraphGenerator()

        });
    } else if (select == 2) {
        selectNumber = 15
        sendHttpRequest('GET', HTTP_ROOT + '/viTriger/' + httpTred + '/' + selectNumber).then(responseData => {

            //for deleting all element for new update
            viMaster.splice(0, viMaster.length)

            //get value of power from db
            let ar = JSON.parse(JSON.stringify(responseData))
            for (let i = 0; i < ar.length; i++) {

                viMaster.push(ar[i].current_value)
            }
            //remove all existing label from label 
            viLabelMaster.splice(0, viLabelMaster.length)
                //adding label corresponds to the value
            for (let j = 1; j < viMaster.length + 1; j++) {

                viLabelMaster.push(j.toString())
            }
            //vigraph
            viGraphGenerator()
        });
    }
});

//pf-graph togleaction
document.getElementById("ppTriger").addEventListener('click', function() {
    document.querySelector(".pp-div").style.display = 'block'

    //db action
    let selectNumber = 15
    sendHttpRequest('GET', HTTP_ROOT + '/viTriger/' + httpTred + '/' + selectNumber).then(responseData => {

        //for deleting all element for new update
        ppMaster.splice(0, ppMaster.length)

        //get value of power from db
        let ar = JSON.parse(JSON.stringify(responseData))
        for (let i = 0; i < ar.length; i++) {

            ppMaster.push(ar[i].power_factor_value)
        }
        //remove all existing label from label 
        ppLebelMaster.splice(0, ppLebelMaster.length)
            //adding label corresponds to the value
        for (let j = 1; j < ppMaster.length + 1; j++) {

            ppLebelMaster.push(j.toString())
        }
        //power graph
        ppGraphGenerator()

    });
});