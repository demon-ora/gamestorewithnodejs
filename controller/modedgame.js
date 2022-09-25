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

exports.moded = (req, res) =>{
    let sql = "SELECT * FROM games where cate=1 && gametype='action'";
    let sqli = "SELECT * FROM games where cate=1 && gametype='adventure'";
    let sqlii = "SELECT * FROM games where cate=1 && gametype='puzzel'";
    let sqliii = "SELECT * FROM games where cate=1 && gametype='arcade'";
    let sqliiii = "SELECT * FROM games where cate=1 && gametype='sport'";
    let query = connection.query(sql,(err, rows) => {
        let queryy = connection.query(sqli,(err, rowss) => {
            let queryyy = connection.query(sqlii,(err, rowsss) => {
                let queryyyy = connection.query(sqliii,(err, rowssss) => {
                    let queryyyyy = connection.query(sqliiii,(err, rowsssss) => {
        if(err) throw err;
        res.render('modedgame', {
            title : 'game',
            games : rows,
            gamess : rowss,
            gamesss:rowsss,
            gamessss: rowssss,
            gamesssss : rowsssss
        });
    });
});
});
    });
    });
}

exports.normal = (req, res) =>{
    let sql = "SELECT * FROM games where cate=0 && gametype='action'";
    let sqli = "SELECT * FROM games where cate=0 && gametype='adventure'";
    let sqlii = "SELECT * FROM games where cate=0 && gametype='puzzel'";
    let sqliii = "SELECT * FROM games where cate=0 && gametype='arcade'";
    let sqliiii = "SELECT * FROM games where cate=0 && gametype='sport'";
    let query = connection.query(sql,(err, rows) => {
        let queryy = connection.query(sqli,(err, rowss) => {
            let queryyy = connection.query(sqlii,(err, rowsss) => {
                let queryyyy = connection.query(sqliii,(err, rowssss) => {
                    let queryyyyy = connection.query(sqliiii,(err, rowsssss) => {
        if(err) throw err;
        res.render('modedgame', {
            title : 'normalgame',
            games : rows,
            gamess : rowss,
            gamesss:rowsss,
            gamessss: rowssss,
            gamesssss : rowsssss
        });
    });
});
});
    });
    });
}