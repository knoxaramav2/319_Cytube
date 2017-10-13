var util = require('util');
var mst = require('mustache');
var http = require('http');
var url = require('url');
var fs = require('fs');
var events = require('events');
var path = require('path');
var ejs = require('ejs');
//var pug = require('pug');

//setup route objects
const express = require('express');
const app = express();

//setup app permissions
app.use(express.static(path.join(__dirname + '/css')));
app.use(express.static(path.join(__dirname + '/scripts')));
app.use(express.static(path.join(__dirname + '/fonts')));
app.use(express.static(path.join(__dirname + '/views')));
app.use(express.static(path.join(__dirname + '/partials')));
app.use(express.static('public')); //i.e http://.../images/Tux.png

//app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//app.set('view engine', 'pug');

//const header = pug.compileFile('partials/template.pug');

//constants
var listen_port = 8080;

console.log(__dirname);

//setup routes
app.get('/', function(req, res){
	res.render("index");
}); 

var server = app.listen(listen_port, function(){
	var host = server.address().address;
	var port = server.address().port;
	
	console.log("Server Start on port " + listen_port);
}); 