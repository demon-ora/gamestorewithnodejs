const path = require('path');
const express = require('express');
const ejs = require('ejs');
var session = require('express-session');
const upload = require('express-fileupload');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const regestations = require('./controller/dashboard');
const adding = require('./controller/add');
const homes = require('./controller/home');
const mod = require('./controller/modedgame');
const auths = require('./middleware/auth');


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

app.get('/dashboarduser',auths.authh,regestations.selectuser);

app.get('/reg',adding.regs);

app.post('/save',adding.saves);

app.get('/dashboarduser/edit/:userId',auths.authh,regestations.edit);

app.post('/dashboarduser/update',auths.authh,regestations.update);
 
app.get('/dashboarduser/delete/:userId',auths.authh,regestations.deletes);

app.get('/dashboardgame',auths.authh,regestations.showgame);

app.post('/dashboardgame/savegame',auths.authh, regestations.savegames);

app.get('/dashboardgame/edit/:gameId',auths.authh, regestations.editgame);

app.post('/dashboardgame/updategame',auths.authh, regestations.updategame);

app.get('/dashboardgame/delete/:gameId',auths.authh, regestations.deletesgames);

app.get('/home',auths.auth,homes.home);

app.get('/home/select/:gameId',auths.auth,homes.selects);

app.get('/modedgame',auths.auth,mod.moded);

app.get('/normalgame',auths.auth,mod.normal);

app.get('/',adding.logins);

app.post('/',adding.loginbaby);

app.get('/logout',adding.logouts);
// Server Listening
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});
