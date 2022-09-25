const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const upload = require('express-fileupload');
app.use(upload())


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


exports.home = (req, res) =>{
    let sql = "SELECT * FROM games where cate=0 order by id desc limit 3";
    let sqli = "SELECT * FROM games where cate=1 order by id desc limit 3";
    let query = connection.query(sql,(err, rowss) => {
        let queryy = connection.query(sqli,(err, rows) => {
        if(err) throw err;
        res.render('home', {
            title : 'game',
            games : rowss,
            gamess : rows
        });
    });
    });
}






