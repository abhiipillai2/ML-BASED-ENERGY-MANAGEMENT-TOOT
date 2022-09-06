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

//mob-menu
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
    //authatication login
const eMail = document.getElementById("eMail");
const password = document.getElementById("password");

document.querySelector("#register1").addEventListener('click', function() {
    event.preventDefault();
    //get details
    const email = eMail.value;
    const pass = password.value;
    const auth = firebase.auth();
    //register
    const promise = firebase.auth().signInWithEmailAndPassword(email, pass);
    console.log(promise);
    promise.catch(
        //(e) => (document.querySelector("#errorMenseger").innerHTML = e.message)
    );
})

//add real time lissner
firebase.auth().onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
        console.log(firebaseUser);
        window.location = "../dashBoard/1.html";
    } else {
        console.log("not logged in");
    }
});