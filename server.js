// Week 15 - Sequelize the Burger Server
var express = require ("express");
var app = express();

var bodyParser = require ("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("./public"));

var db = require("./models");

var PORT = process.env.PORT || 3000;

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

db.sequelize.sync().then(function(){
	"use strict";
	app.listen(PORT, function(){
	console.log("Server is up and listening on port " + PORT);	
	});
});