var util = require('util');
var mst = require('mustache');
var http = require('http');
var url = require('url');
var fs = require('fs');
var events = require('events');
var path = require('path');
var ejs = require('ejs');
var multipart = require('connect-multiparty');
var bodyParser = require('body-parser');

//local requires
var utility = require('./util');

//setup route objects
const express = require('express');
const app = express();
var multiPartMiddleware = multipart();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//setup app permissions
app.use(express.static(path.join(__dirname + '/css')));
app.use(express.static(path.join(__dirname + '/scripts')));
app.use(express.static(path.join(__dirname + '/fonts')));
app.use(express.static(path.join(__dirname + '/views')));
app.use(express.static(path.join(__dirname + '/partials')));
app.use(express.static('public')); //i.e http://.../images/Tux.png

//app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');




//constants
var listen_port = 8080;

console.log(__dirname);

//setup routes
app.get('/', function(req, res){
	res.render("index");
}); 

app.get('/watch/:id', function(req, res){
	res.render("video", {videoId:req.params.id});
}); 

app.get('/video/:id', function(req, res) {
	  const path = 'assets/'+req.params.id+'.mp4'
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

app.post('/file/upload', multiPartMiddleware, function(req, res) {
	console.log(req.body);
	console.log(req.files);
	
	let videoPath = "./public/videos/";
	let username = req.body['username'];
	let fileinfo = req.files.file;
	let filename = fileinfo['originalFilename'];
	let localFileName = videoPath + utility.createVideoName(filename);
	let body = "";
	
	console.log(localFileName);
	
	req.on('data', function(data) {
		console.log('DATA');
		body += data;
	});
	
	req.on('end', function(){
		console.log("asdasdasd");
		fs.appendFile(localFileName, body, function(){
			res.end('SUCCESS');
		});
	});
	

	
	res.end('Video uploaded successfully');
});

var server = app.listen(listen_port, function(){
	var host = server.address().address;
	var port = server.address().port;
	
	console.log("Server Start on port " + listen_port);
}); 