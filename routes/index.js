var express = require("express");
var router = express.Router();
var passport = require("passport"); 
var User = require("../models/user");
var Campground_1 = require("../models/campground");

//route app server function
router.get("/", function(req, res){
	res.render("landing");
});


//show the register form
router.get("/register", function(req, res){
	res.render("register", {page: "register"});
});

//handle sign up logic
router.post("/register", function(req, res){
	var newUser = new User({
			username: req.body,username, 
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			avatar: req.body.avatar
		});
	
	if(req.body.adminCode === "sercetcode") {
		newUser.isAdmin = true;
	}
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to YelpCamp " + user.username);
			res.redirect("/campgrounds");
		});
	});
});

//show login form
router.get("/login", function(req, res){
	res.render("login", {page: "login"});
});

//handing login locic
router.post("/login", passport.authenticate("local", 
		{
			successRedirect: "/campgrounds",
			failureRedirect: "/login"
		}), function(req, res){
	      req.flash("success", "Welcome to YelpCamp " + user.username);
	});

//logout logic route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged you out!");
	res.redirect("/campgrounds");
});

//USER PROFILES
router.get("/users/:id", function(req,res){
	User.findById(req.params.id, function(err, foundUser) {
		if(err) {
			req.flash("error", "Something went wrong.");
			res.redirect("/");
		}
		res.render("users/show", {user: foundUser});	
	});
});


module.exports = router;