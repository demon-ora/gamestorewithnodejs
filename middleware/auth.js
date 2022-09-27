const path = require('path');
const express = require('express');
const ejs = require('ejs');
var session = require('express-session');
const upload = require('express-fileupload');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }))

app.use(upload());
app.use(express.static(path.join(__dirname,"static")))
app.use(express.static(path.join(__dirname,'upload')))
 
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'projects'
});
 
connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database Connected!');
}); 

//set views file
app.set('views',path.join(__dirname,'views'));
 
//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

exports.auth = (req, res,next) => {
if(req.session.sname){
    next();
}else{
   res.redirect('/');
}
}

exports.authh = (req, res,next) => {
    if(req.session.ssname){
        next();
    }else{
       res.redirect('/');
    }
    }
