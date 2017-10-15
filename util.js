
module.exports = {

getFileExtension: function (name){
	var eReg = /(?:\.([^.]+))?$/;
	return eReg.exec(name)[1];
},

createVideoName: function(original){
	var id = "";
	var allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 36; i++)
		id += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));

	id+='.';
	
	var ext = this.getFileExtension(original);

  return id.concat(ext);
}

}