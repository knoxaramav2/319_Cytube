var http = require('http');
var url = require('url');
var fs = require('fs');
var events = require('events');
var path = require('path');

//setup route objects
const express = require('express');
const app = express();

//setup app permissions
app.use(express.static(path.join(__dirname + '/css')));
app.use(express.static('public')); //i.e http://.../images/Tux.png



//constants
var listen_port = 8080;

console.log(__dirname);

//setup routes
app.get('/', function(req, res){
	res.sendFile(__dirname+"/index.html");
});

var server = app.listen(listen_port, function(){
	var host = server.address().address;
	var port = server.address().port;
	
	console.log("Server Start on port " + listen_port);
});


function renderPage(){
	
}


//console.log("Server Start");
/*
http.createServer(function (req, res){
	
	var q = url.parse(req.url, true);
	
	
	
	var filename = "." + q.pathname;
	
	fs.readFile(filename, function(err, data){
		
		if (err) {
			res.writeHead(404, {'Content-Type': 'text/html'});
			return res.end("404 Not Found : " + filename);
		}
		
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		res.end();
	});
}).listen(8080);
*/