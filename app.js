const express = require('express');
const app = express();
const usersRoutes = require('./routes/users');
const itemsRoutes = require('./routes/items');
const cors  = require('cors');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const db = require('./utils/database');
const passport = require('passport');
const crypto = require('crypto');
const mysql = require('mysql2');
const LocalStrategy = require('passport-local').Strategy;
const { resolveNaptr } = require('dns');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'bicycle_share',
  password: '123456',
  port: '3306'
});


const options = {
    key: fs.readFileSync('./cert/key.pem'),
    cert: fs.readFileSync('./cert/cert.pem')
}

const sessionStore = new MySQLStore({
  checkExpirationInterval: 900000,
  expiration: 30000
}, connection.promise());

const expireDate = new Date();
expireDate.setDate(expireDate.getDate() + 1);

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'My secret secret',
  store: sessionStore,
  cookie: { secure: false, httpOnly: false, expires: expireDate }
}));

app.use(bodyParser.urlencoded({extended: false }));

app.use(express.static('public'));

app.use(passport.initialize());
app.use(passport.session());
app.use(usersRoutes);
app.use(itemsRoutes);

app.get('/', (req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  if (req.user) {
    res.json({user: req.user})
  }
  else {
    res.json({user:undefined});
  }
});


passport.serializeUser(function(user, done) {
  console.log('serializedUser', user);
  done(null, {id: user.id, email: user.email, username: user.username, address: user.address});
});
passport.deserializeUser(function(user, done) {
  console.log('desiarilerUser', user);
  done(null, {id: user.id, email: user.email, username: user.username, address: user.address});
});


app.listen(4000);


https.createServer(options, app).listen(4040);



