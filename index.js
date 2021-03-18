var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport')
const cookieParser = require("cookie-parser");
app.use(bodyParser.json({
    limit: "500mb",
    extended: true
}))
app.use(bodyParser.urlencoded({
    limit: "500mb",
    extended: true,
    parameterLimit: 5000000
}))
const {fork} = require('child_process')
const expressSession = require('express-session')
var morgan = require('morgan');
var CronJob = require('cron').CronJob;
app.set('trust proxy', 1)
//ENV
require('dotenv').config({
    path: __dirname + '/.env'
});
var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_TOKEN);

app.use(express.json());
app.use(expressSession({
    secret: process.env.REFRESH_TOKEN_SECRET, // session secret
    resave: true,
    saveUninitialized: true,
    cookie: { 
        domain: process.env.FRONT_END_URL,
        secure: true
    }
}));
app.use(cors({
    credentials: true,
    origin: process.env.FRONT_END_URL
}));
app.use(cookieParser());

                
process.env['DB_NAME'] = "root";
process.env['DB_USER'] = "";
process.env['DB_PASS'] = "";

const mysql = require('mysql2');

var DBCON = require('./db_config');
DBCON.query("select 1 as c", function(err, result){
    if(err)
    {
        console.log(err)
    }
    else{
        console.log(result, "Line 57")
    }
})


app.get('/', function (req, res) {
    var api_name = process.env.API_NAME
    console.log(api_name + ' API Working')

    // client.messages.create({
    //     from: 'whatsapp:+14155238886',
    //     body: "This is Hari's New project! Hurray!",
    //     to: 'whatsapp:+917871381534'
    // }).then(message => {
    //     console.log(message)
        res.send({
            code : '200',
            message : "API Working"});
    // }).catch(err => console.log(err));

})

app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev')); // log every request to the console

const middlewares = require('./middlewares/middlewares')

app.use(middlewares.common);
app.use(middlewares.authenticateJWT);



// var knex = require('./models/db_config')

//   knex('user_mas')
//   .count({ c : 'id' })
//   .then(users =>{
//       console.log(users[0].c);
//   })

const user = require('./routes/user.routes');

app.use('/user', user);

const masters = require('./routes/masters.routes');

app.use('/masters', masters);


const reports_designer = require('./routes/reports_designer.routes');

app.use('/reports_designer', reports_designer);


const reports_viewer = require('./routes/reports_viewer.routes');

app.use('/reports_viewer', reports_viewer);


var checkPaymentPendingJob = new CronJob('50 06 11 * * *', function () {
    // console.log('You will see this message was runned on Midnight of ' + getStandardDate(new Date()));
    var api_name = process.env.API_NAME
    console.log(api_name + ' API Working')
    
    const forked = fork(process.cwd() + '/child-processes/payment_notifications.process.js');
    forked.send({})

    forked.on('message', (msg) => {
        console.log(`Payment Notification Job Started $ ${ new Date()} `);
    });
}, null, true, 'Asia/Kolkata');
checkPaymentPendingJob.start();

var server = app.listen(process.env.PORT || "4000", function () {
    //    var host = process.env.host
    var port = process.env.PORT || "4000"

    console.log("App listening at ", port)
})