var util = require('util');
var mst = require('mustache');
var http = require('http');
var url = require('url');
var fs = require('fs');
var events = require('events');
var path = require('path');
var ejs = require('ejs');
var multipart = require('connect-multiparty');
//var multer = require('multer');
var bodyParser = require('body-parser');

//local requires
var utility = require('./util');

//setup route objects
const express = require('express');
const app = express();

//var upload = multer({storage: storage});
//var multiPartMiddleware = multipart();

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

app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "http://localhost");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
/*
var storage = multer.diskStorage({ //multers disk storage settings
	destination: function (req, file, cb) {
		cb(null, './public/uploads/videos/')
	},
	filename: function (req, file, cb) {
		var datetimestamp = Date.now();
		cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
	}
});

*/

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
	  const path = 'public/videos/'+req.params.id+'.mp4'
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

//app.post('/file/upload', upload.single('photo'));


/*
var upload = multer({ //multer settings
				storage: storage
			}).single('file');

app.post('/file/upload', function(req, res) {
	console.log('upload');
	upload(req,res,function(err){
		if(err){
			 console.log('err');
			 res.json({error_code:1,err_desc:err});
			 return;
		}
		 res.json({error_code:0,err_desc:null});
	})
});*/



app.post('/file/upload', function(req, res, next) {
	console.log(req.body);
	console.log(req['filename']);
	
	let videoPath = "./public/videos/";
	//let username = req.body['username'];
	//let fileinfo = req.files.file;
	//let filename = fileinfo['originalFilename'];
	let localFileName = videoPath + utility.createVideoName("x.mp4");
	let body = "";
	
	//console.log(localFileName);
	
	req.on('data', function(data) {
		console.log('DATA');
		body += data;
		next();
	});
	
	req.on('end', function(){
		next();
		console.log("asdasdasd");
		fs.appendFile(localFileName, body, function(){
			console.log('success');
			res.end('SUCCESS');
		});
		
		//res.end('a');
	});

	res.end('Video uploaded successfully');
});


var server = app.listen(listen_port, function(){
	var host = server.address().address;
	var port = server.address().port;
	
	console.log("Server Start on port " + listen_port);
}); 