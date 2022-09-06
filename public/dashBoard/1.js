//preloader
let preloader = document.getElementById("loading")
window.addEventListener('load', function() {
    preloader.style.display = 'none';
});
//firebase SDk
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
//local variabes
let id;
let userName;
let dataMaster = []
let labelMaster = []
let viMaster = []
let viLabelMaster = []
let ppMaster = []
let ppLebelMaster = []


//master HHTP treds
//very imp!
const httpTred = localStorage.getItem("hwId");
console.log(httpTred)
let width = screen.width;


//for mobile app menu
//master responsive 
if (width <= 600) {


    document.getElementById('mobNav').addEventListener('click', function() {

        document.querySelector(".nav-bar").style.display = "block";

    });
    document.getElementById('logo').addEventListener('click', function() {

        document.querySelector(".nav-bar").style.display = "none";

    });
}

//let e = document.getElementById("powerHourSelect")
//let numberr = e.options[e.selectedIndex].text;


//vi-graph togleaction
document.getElementById("viGraphTriger").addEventListener('click', function() {
    document.querySelector(".vi-div").style.display = 'block'
});
//vi-graph
//close action
document.getElementById("close3").addEventListener('click', function() {
    document.querySelector(".vi-div").style.display = 'none'
});

//power-factor
//close action
document.getElementById("close4").addEventListener('click', function() {
    document.querySelector(".pp-div").style.display = 'none'
    console.log('worked')
});