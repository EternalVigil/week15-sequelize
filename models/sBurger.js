// Week 15 - Sequelize the Burger - Burger Model
module.exports = function (sequelize, DataTypes){
	"use strict";
	var sBurger = sequelize.define("sBurger", {
		burgerName: DataTypes.STRING,
		consumed: DataTypes.BOOLEAN,
		consumedBy: DataTypes.STRING,
		createdDate: DataTypes.DATE
	});
	return sBurger;
};