// Week 15 - Sequelize the Burger - HTML routes
var path = require("path");

module.exports = function(app){
	"use strict";
	app.get("/", function(request, result){
		result.sendFile(path.join(__dirname + "/../public/view.html"));
	});
};