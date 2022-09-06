//accout popup-section
//disply-action
document.getElementById("userIc").addEventListener('click', function() {
    document.querySelector(".account-div").style.display = 'block'
});

//close-action
document.getElementById("close1").addEventListener('click', function() {
    document.querySelector(".account-div").style.display = 'none'
});

//logout-action
document.getElementById("signOut").addEventListener('click', function() {
    event.preventDefault();
    firebase.auth().signOut();
    localStorage.clear();
});


//hardware connection management
//normal togle action
document.getElementById("connectionManegement").addEventListener('click', function() {

    document.querySelector(".connect-div").style.display = 'block'

});

document.getElementById("close2").addEventListener('click', function() {

    document.querySelector(".connect-div").style.display = 'none'

});
//for db action of connecion managment
document.getElementById("connect").addEventListener('click', function() {
    const textArea = document.getElementById("hardWareId")
    const hwId = textArea.value
        //post rq to server
    sendHttpRequest('POST', HTTP_ROOT + '/hwRgFU', {
        //JSON FILE FOR PUSH
        dummy: 123,
        e_mail: localStorage.getItem("eMail"),
        hardware_id: hwId
    })
    let hwFlag = 1
    localStorage.setItem("hwflag", hwFlag)
    localStorage.setItem("hwId", hwId)
    document.querySelector(".connect-btn").style.display = 'none'
    document.querySelector(".inp").style.display = 'none'

    document.querySelector(".disconnect-btn").style.display = 'block'
    document.querySelector(".connect-div h2").style.display = 'block'
    document.querySelector(".connect-icon").style.color = ' #77b568'
});


//disconnection management
document.getElementById("disConnect").addEventListener('click', function() {
    //post rq to server
    sendHttpRequest('POST', HTTP_ROOT + '/hwRm', {
        //JSON FILE FOR PUSH
        e_mail: localStorage.getItem("eMail")
    })

    document.querySelector(".connect-btn").style.display = 'block'
    document.querySelector(".inp").style.display = 'block'

    document.querySelector(".disconnect-btn").style.display = 'none'
    document.querySelector(".connect-div h2").style.display = 'none'
    document.querySelector(".connect-icon").style.color = 'red'

    let hwFlag = 0
    localStorage.setItem("hwflag", hwFlag);
    localStorage.removeItem("hwId")

});
//for connection togle
if (localStorage.getItem("hwflag") == 1) {

    document.querySelector(".connect-btn").style.display = 'none'
    document.querySelector(".inp").style.display = 'none'

    document.querySelector(".disconnect-btn").style.display = 'block'
    document.querySelector(".connect-div h2").style.display = 'block'
    document.querySelector(".connect-icon").style.color = ' #77b568'
    console.log("if")

} else if (localStorage.getItem("hwflag") == 0) {
    document.querySelector(".connect-btn").style.display = 'block'
    document.querySelector(".inp").style.display = 'block'

    document.querySelector(".disconnect-btn").style.display = 'none'
    document.querySelector(".connect-div h2").style.display = 'none'
    document.querySelector(".connect-icon").style.color = 'red'
    console.log("worked-else")
}