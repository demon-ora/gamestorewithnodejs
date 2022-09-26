const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

app.use(express.static(path.join(__dirname,"static")))

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

exports.regs = (req, res) => {
    res.render('reg', {
        title : 'regestation form'
    });
}

exports.saves = (req, res) => { 
    let data = {name: req.body.name, email: req.body.email, password: req.body.password};
    let sql = "INSERT INTO users SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/dashboarduser');
    });
}


exports.logins = (req, res) => {
    res.render('login', {
        title : 'login form'
    });
}

exports.loginbaby = (req, res) => {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = "SELECT * FROM users";
    let query = connection.query(sql, (err, rows) => {
        i=0;
        if(err) throw err;
        for(i=0;i<rows.length;i++){
        if(rows[i].name==req.body.name && rows[i].password==req.body.password){
            res.redirect('/home');
            break;}
        }
        
        if(req.body.name=="ora" && req.body.password=="oraora"){
            res.redirect('/dashboarduser');
        }
        else{
            res.render('login',{
                title : 'login form'
            });  
        }
 
    });
}