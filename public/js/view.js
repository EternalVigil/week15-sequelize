// Week 15 - Sequelize the Burger - JS Functions
$(document).ready(function(){
	"use strict";
	
	var newBurger = $("input.new-burger");
	var burgerMenu = $(".burgerList");
	
	$(document).on("click", "eatBurger", eatBurger);
	$(document).on("click", "deleteFromMenu", deleteBurger);
	$(document).on("click", "editBurger", editBurger);
	$(document).on("click", "finishEdit", confirmEdit);
	$(document).on("click", "cancelEdit", cancelEdit);
	$(document).on("click", "createBurger", createBurger);
	
	var burgerMenuList;
	
	getBurgers();
	
	function getBurgers(){
		$.get("/api/sburger", function(data){
			console.log("data retrieved: " + data);
			burgerMenu = data;
			createRows();
		});
	}
	
	function createRows(){
		burgerMenu.empty();
		var rowsCreated = [];
		
		for (var i = 0; i < burgerMenuList.length; i++){
			rowsCreated.push(createNewRows(burgerMenu[i]));
		}
		burgerMenu.prepend(rowsCreated);
	}
	
	function createNewRows(burger){
		var newRow = $("<li>");
		newRow.addClass("list-menu-item list-burger");
		
		var newRowSpan = $("<span>");
		newRowSpan.text(burger.burgerName);
		
		newRow.append(newRowSpan);
		
		var burgerEditMenu = $("<input>");
		burgerEditMenu.attr("type", "text");
		burgerEditMenu.addClass("edit");
		burgerEditMenu.css("display", "none");
		newRow.append(burgerEditMenu);
		
		var deleteBtn = $("<button>");
		deleteBtn.addClass("btn-default btn btn-delete");
		deleteBtn.text("X");
		deleteBtn.data("id", burger.id);
		
		var eatBtn = $("<button>");
		eatBtn.addClass("btn-default eat-btn");
		eatBtn.text("EAT");
		
		newRow.append(deleteBtn);
		newRow.append(eatBtn);
		newRow.data("burger", burger);
		
		if (burger.consumed){
			newRowSpan.css("text-decoration", "line-through");
		}
		return newRow;
	}
	
	function createBurger(burger){
		burger.preventDefault();
		var Burger = {
		burgerName: newBurger.val().trim(),
			consumed: false
		};
		
		$.post("/api/sburger", Burger, function(){
			getBurgers();
		});
		newBurger.val("");
	}
	
	
	function editBurger(){
		var burgerToEdit = $(this).data("sburger");
		$(this).children().hide();
		$(this).children("newInput").val(burgerToEdit.burgerName);
		$(this).children("newInput").focus();
	}
	
	function confirmEdit(burger){
		var alteredBurger;
		
		if (burger.key === "Enter"){
			alteredBurger = {
				id: $(this).data("sBurger").id,
				burgerName: $(this).children("input").val().trim()
			};
			$(this).blur();
			updateBurgerStatus(alteredBurger);
		}
		
	}
	
	function cancelEdit(){
		var alteredBurger = $(this).data("sBurger");
		$(this).children().hide();
		$(this).children("newInput").val(alteredBurger.text());
		$(this).children("span").show();
		$(this).children("button").show();
	}
	
	function eatBurger(){
		var eatenBurger = $(this).parent().data("eatenBurger");
		eatenBurger.consumed = !eatenBurger.consumed;
		updateBurgerStatus(eatenBurger);
	}
	
	function updateBurgerStatus(burger){
		$.ajax({
			method: "PUT",
			url: "/api/sburger",
			data: burger
		}).done(function(){
			getBurgers();
		});
	}
	
	function deleteBurger(){
		var id = $("this").data("id");
		$.ajax({
			method: "DELETE",
			url: "/api/sburgers" + id
		}).done(function(){
			getBurgers();
		});
	}
	
});