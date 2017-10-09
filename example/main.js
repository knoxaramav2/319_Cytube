var http = require('http');
var url = require('url');
var fs = require('fs');
var events = require('events');

var dt = require('./testmodule');

console.log("Server Start");

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

/*
	res.writeHead(200, {'Content-Type': 'text/html'});
	
	var arg = url.parse(req.url, true).query;
	
	var txt = arg.year + " " + arg.month;
	
	//res.write('Datetime is ' + dt.myDateTime() + '\r\n');
	res.write(txt);
	res.end();
*/ 