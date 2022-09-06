//preloader
let preloader = document.getElementById("loading")
window.addEventListener('load', function() {
    preloader.style.display = 'none';
});
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCQX9mx791ie-qv-1hGXH3MDGYyiL92X44",
    authDomain: "elektron-beta.firebaseapp.com",
    projectId: "elektron-beta",
    storageBucket: "elektron-beta.appspot.com",
    messagingSenderId: "957709694300",
    appId: "1:957709694300:web:53c4aa2fbe8cd3818dfd99",
    measurementId: "G-1X7VP782Q6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//master elektron server action
const sendHttpRequest = (method, url, data) => {

    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));

    //return responce handler
    xhr.onload = () => {
        data_res = JSON.parse(xhr.response)
    }

};

//mobile menu
let flag = false;
document.getElementById("mobNavics").addEventListener('click', function() {
    if (flag) {
        document.querySelector(".mob-nav").style.display = "none";
        flag = false;
    } else {
        document.querySelector(".mob-nav").style.display = "block";
        flag = true;
    }
})

//authatication-registration
const eMail = document.getElementById("eMail");
const password = document.getElementById("password");
//ek-db registration
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const industryName = document.getElementById("indname");

document.querySelector("#register1").addEventListener('click', function() {
    event.preventDefault();
    const email = eMail.value;
    const pass = password.value;
    const fName = firstName.value;
    const lName = lastName.value;
    const iName = industryName.value;
    const auth = firebase.auth();
    const promise = firebase.auth().createUserWithEmailAndPassword(email, pass);
    //sending post ekserver
    sendHttpRequest('POST', HTTP_ROOT + '/authReg', {
        //JSON FILE FOR PUSH
        dummy: 123,
        first_name: fName,
        last_name: lName,
        e_mail: email,
        idustry_name: iName

    });

});
//user status check
firebase.auth().onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
        console.log(firebaseUser);
        window.location = "dashBoard/1.html";
    } else {
        console.log("not logged in");
    }
});