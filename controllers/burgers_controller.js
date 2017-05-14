var express = require("express");
var router = express.Router();
// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Use method - for console log purpose
router.use(function(req, res, next){
  console.log('Routed using htmlRoutes.js @', Date.now());
  next();
});

router.get("/", function(req, res) {
	burger.selectAll(function(data) {
		var hbsObject = {
			burgers: data
		};
		console.log(hbsObject);
		res.render("index", hbsObject);
	});
});

router.post("/", function(req, res) {
	burger.insertOne(
		req.body.inputName,
		function() {
			burger.selectAll(function(data) {
				var hbsObject = {
					burgers: data
				};
				console.log(hbsObject);
				res.render("index", hbsObject);
			});
		}
	);
});

router.put("/:id", function(req, res){
	var id = req.params.id;
	var condition = "id = " + req.params.id;
	console.log(id);

	burger.updateOne(
		condition, 
		function(data) {
			var hbsObject = {
				burgers: data
			};
			console.log(hbsObject);
			res.render("index", hbsObject);
		}
	);
})

// Export routes for server.js to use.
module.exports = router;