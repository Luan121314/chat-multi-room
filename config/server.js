var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValiadtor = require('express-validator');
// var socket = require('socket.io');

var app = express();

app.set('view engine','ejs');
app.set('views', './app/views');

app.use(express.static('./app/public'));

app.use(bodyParser.urlencoded({extended: true}));

app.use(expressValiadtor());

consign().
include('app/routes')
.then('app/models')
.then('app/controller')
.into(app);

module.exports = app;