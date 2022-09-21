const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const regestations = require('./controller/dashboard');
const adding = require('./controller/add');

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

app.get('/dashboarduser',regestations.selectuser);

app.get('/reg',adding.regs);

app.post('/save',adding.saves);

app.get('/dashboarduser/edit/:userId',regestations.edit);

app.post('/dashboarduser/update',regestations.update);
 
app.get('/dashboarduser/delete/:userId',regestations.deletes);

// Server Listening
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});