const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const userAdapter = require('./Modules/authAdapter')
const credentialAdaper = require('./Modules/credentialAdapter')
const hardwarePuash = require('./Modules/hardwarePush')
const hardwareAdapter = require('./Modules/hardwareAdapter')
const dataProcessor = require('./Modules/dataProcessor')
const logger = require('./Modules/logMaster')
const dotenv = require('dotenv').config({ path: './class/sql.env' })
const app = express()
const port = process.env.PORT || 5000 //must for production environmentnpm install dotenv --save

//must use body parser for decoding the params from the url
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())


//front-end pusher
//index-sat-files
app.use(express.static('public'))
app.use('/public', express.static(__dirname + 'public/index.css'))
app.use('/public', express.static(__dirname + 'public/grid-index.css'))
app.use('/public', express.static(__dirname + 'public/index.js'))

//dash-board-sat-fils
app.use('/dashBoard', express.static(__dirname + 'public/dashBoard/1.html'))
app.use('/dashBoard', express.static(__dirname + 'public/dashBoard/1.css'))
app.use('/dashBoard', express.static(__dirname + 'public/dashBoard/grid.css'))
app.use('/dashBoard', express.static(__dirname + 'public/dashBoard/1.js'))

//img-sat-files
app.use('/img', express.static(__dirname + 'public/img/logo-web.png'))
app.use('/img', express.static(__dirname + 'public/img/logo2.png'))
app.use('/img', express.static(__dirname + 'public/img/logo3.png'))
app.use('/img', express.static(__dirname + 'public/img/favcon.png'))

//login-sat-files
app.use('/login', express.static(__dirname + 'public/login/login.html'))
app.use('/login', express.static(__dirname + 'public/login/login.css'))
app.use('/login', express.static(__dirname + 'public/login/grid-login.css'))
app.use('/login', express.static(__dirname + 'public/login/login.js'))

//js config file
app.use('/bin', express.static(__dirname + 'public/bin/config.js'))

//general routes
app.get('', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')

});

//BL Adapters
//using AuthAdapter
app.use(userAdapter);

//using credential adapter
app.use(credentialAdaper);

//using vip push
app.use(hardwarePuash);

//using hardware adapter
app.use(hardwareAdapter);

//using dataprossor
app.use(dataProcessor);

app.listen(port, () => logger.info("Started sucessfully"));
