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

//install nodemon through command prompt
//this will update the server when a file is changed
//so you don't have to manually do it every time

//can also run installPackages.cmd included after installing
//node.js

cmd: npm install -g nodemon
cmd: npm install express --save
cmd: nodemon server_file_.js
cmd: npm install body-parser --save
cmd: npm install cookie-parser --save
cmd: npm install multer --save
cmd: npm install ejs --save
cmd: npm install ng-file-upload --save

RESOURCES

ANGULAR
https://www.w3schools.com/angular/angular_intro.asp

NODE
https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
https://www.w3schools.com/nodejs/nodejs_uploadfiles.asp
https://medium.com/@daspinola/video-stream-with-node-js-and-html5-320b3191a6b6