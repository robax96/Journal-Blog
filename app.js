const express = require('express')
const upload = require('express-fileupload')

var fs = require('fs')
var morgan = require('morgan')

const app = express()
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var logs = fs.createWriteStream(('/home/M00796423Rober/public_html/coursework2/access.log'), { flag: 'a' })
app.use(morgan('combined', {stream: logs}))


//Constent file upload
app.use(upload())

//Configure session
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "Youcantspyme",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

//stores session variables on local side (client)
app.use(function(req, res, next) {
    res.locals.user = req.session.username;
    res.locals.userid = req.session.userid;
    res.locals.admin = req.session.admin;
    next();
  });

// cookie parser middleware
app.use(cookieParser());

//requires homepage routes
const homepage = require('./routes/home')

//allows to load pictures
app.use(express.static('public'))

//homepage for any visitor
app.use('/', homepage)



app.listen(8114) 