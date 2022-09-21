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

exports.selectuser = (req, res) => {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = "SELECT * FROM users";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('dashboarduser', {
            title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
            users : rows
        });
    });
}

exports.edit = (req, res) => {
    const userId = req.params.userId;
    let sql = `Select * from users where id = ${userId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('edituser', {
            title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
            user : result[0]
        });
    });
}

exports.update = (req, res) => {
    const userId = req.body.id;
    let sql = "Update users SET name='"+req.body.name+"',  email='"+req.body.email+"',  password='"+req.body.password+"' where id ="+userId;
    let query = connection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/dashboarduser');
    });
}

exports.deletes = (req, res) => {
    const userId = req.params.userId;
    let sql = `DELETE from users where id = ${userId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/dashboarduser');
    });
}