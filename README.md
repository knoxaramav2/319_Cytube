# 319_Cytube

Video sharing platform for cs 319

Uses Angular.js, Node.js


*****GIT

//get repo
git pull https://github.com/knoxaramav2/319_Cytube.git

//push changes
git add *
git commit -m "commit message"
git push

//undo local and get server version
git add .
git commit
git reset --hard
git pull



*****SETUP
install node.js from https://nodejs.org/en/download/


//install nodemon through windows command prompt
//this will update the server when a file is changed
//so you don't have to manually do it every time


//Run these in windows command prompt or run installPackages.cmd
	npm install -g nodemon
	npm install express --save
	npm install body-parser --save
	npm install cookie-parser --save
	npm install multer --save
	npm install mustache --save
	npm install ejs --save
	npm install ng-file-upload --save
	npm install connect-multiparty --save
	npm install jquery --save


//After everything is installed, start the server by typing
	nodemon site.js

//Type "rs" to restart
//Hit Ctrl+c then y to stop the server

//The website url is localhost:8080


RESOURCES

ANGULAR
https://www.w3schools.com/angular/angular_intro.asp

NODE
https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
https://www.w3schools.com/nodejs/nodejs_uploadfiles.asp
https://medium.com/@daspinola/video-stream-with-node-js-and-html5-320b3191a6b6

jQuery
https://www.npmjs.com/package/jquery-comments