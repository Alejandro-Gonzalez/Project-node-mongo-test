var express = require('express');
var http = require("http");
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var db = require('./db');
var api = require('./api/api');
var app = express();
var cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // support json encoded bodies

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/*CONFIG APIS*/
api.init(app)
/*CONFIG VIEWS*/
app.set('views', './views')
app.set('view engine', 'pug');
app.use(express.static('assets'));


app.get('*', (req, res) => {
  res.render('index');
})




db.connect('mongodb://localhost:27017/databaseApp', (err) => {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    var port = process.env.PORT || 8080;
    app.listen(port, ()=> {
      console.log('Listening on port 8080...')
    })
  }
})
