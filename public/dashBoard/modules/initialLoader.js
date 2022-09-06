//satus mangement
//
firebase.auth().onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
        let authData = JSON.stringify(firebaseUser.email);
        //for sending http id 
        localStorage.setItem("eMail", authData)
        id = localStorage.getItem("eMail");
        //HTTP request for current user details
        sendHttpRequest('GET', HTTP_ROOT + '/currentAuth/' + id).then(responseData => {

            userName = responseData[0].first_name + " " + responseData[0].last_name
            userNameUpdator()
        });
        //for master initiallisation of mai tools
        //for power table
        sendHttpRequest('GET', HTTP_ROOT + '/hourPower/' + httpTred + '/1').then(responseData => {

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
        //unit table
        sendHttpRequest('GET', HTTP_ROOT + '/hourUnit/' + httpTred + '/1').then(responseData => {

            document.getElementById("unitSoket").textContent = responseData.value.toFixed(2) + " UNITS"

        });
        //bill table
        sendHttpRequest('GET', HTTP_ROOT + '/hourBill/' + httpTred + '/1').then(responseData => {

            document.getElementById("billSoket").textContent = responseData.value.toFixed(2) + " INR"

        });
        //vi graph
        sendHttpRequest('GET', HTTP_ROOT + '/viTriger/' + httpTred + '/15').then(responseData => {

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
        //pp-curve
        sendHttpRequest('GET', HTTP_ROOT + '/viTriger/' + httpTred + '/15').then(responseData => {

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
    } else {
        console.log("not logged in");
        window.location = "../login/login.html";
    }
});
//usrname chnage
const userNameUpdator = () => {
    document.getElementById("userName").textContent = userName;
};