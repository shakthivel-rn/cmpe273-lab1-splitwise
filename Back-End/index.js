var express = require('express');
app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');

app.set('view engine', 'ejs');

app.use(cors({origin: 'http://localhost:3000', credentials: true}));

app.use(session({
    secret              : 'cmpe273_splitwise',
    resave              : false,
    saveUninitialized   : false,
    duration            : 60 * 60 * 1000,
    activeDuration      :  5 * 60 * 1000
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

  var Users = [{
    username : "admin",
    password : "admin"
}]

app.post('/login', function(req, res){
    console.log('Inside Login Post Request');
    console.log('Req Body: ',req.body);
    var data = ""
    result = Users.filter((user) => {
        if(user.username === req.body.username && user.password === req.body.password) {
            res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = user;
            res.status(200);
            data = "Successfull Login";
            return user;
        }
        else {
            res.status(500);
            data = "Invalid Login";
        }
    })
    res.send(data);
})

app.post('/register', function(req, res){
    console.log('Inside Register Post Request');
    console.log('Req Body: ', req.body);
    userdata = {
        username : req.body.username,
        password : req.body.password
    }
    Users.push(userdata);
    res.send('Success');
})

var server = app.listen(3001, function() {
    console.log('Server listening on port 3001');
})