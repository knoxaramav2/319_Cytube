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

app.get('/video', function(req, res) {
	  const path = 'assets/rick.mp4'
	  const stat = fs.statSync(path)
	  const fileSize = stat.size
	  const range = req.headers.range

	  if (range) {
	    const parts = range.replace(/bytes=/, "").split("-")
	    const start = parseInt(parts[0], 10)
	    const end = parts[1]
	      ? parseInt(parts[1], 10)
	      : fileSize-1

	    const chunksize = (end-start)+1
	    const file = fs.createReadStream(path, {start, end})
	    const head = {
	      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
	      'Accept-Ranges': 'bytes',
	      'Content-Length': chunksize,
	      'Content-Type': 'video/mp4',
	    }

	    res.writeHead(206, head)
	    file.pipe(res)
	  } else {
	    const head = {
	      'Content-Length': fileSize,
	      'Content-Type': 'video/mp4',
	    }
	    res.writeHead(200, head)
	    fs.createReadStream(path).pipe(res)
	  }
	});

app.get('/upload', function(req, res) {
	res.render("upload");
});

var server = app.listen(listen_port, function(){
	var host = server.address().address;
	var port = server.address().port;
	
	console.log("Server Start on port " + listen_port);
}); 