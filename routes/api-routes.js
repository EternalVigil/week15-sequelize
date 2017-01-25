// Week 15 - Sequelize the Burger - API Routes
var db = require("../models");

module.exports = function (app) {
	"use strict";

	app.get("/api/sburger", function (request, result) {
		db.sBurger.findAll({}).then(function (data) {
			console.log("Retrieved all burgers from database.");
			result.json(data);
		});
	});

	app.post("/api/sburger", function (request, result) {
		db.sBurger.create({
			burgerName: request.body.burgerName,
			consumed: request.body.consumed
		}).then(function (data) {
			result.json(data);
		});
	});

	app.put("/api/sburger/:id", function (request, result) {
		db.sBurger.update({
			text: request.body.burgerName,
			consumed: request.body.consumed,
			consumedBy: request.body.consumedBy
		}).then(function (data) {
			result.json(data);
		});
	});

	app.delete("/api/sburger/:id", function (request, result) {
		db.sBurger.destroy({
			where: {
				id: request.params.id
			}
		}).then(function (data) {
			result.json(data);
		});
	});
};
