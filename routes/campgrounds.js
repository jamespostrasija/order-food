var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
var NodeGeocoder = require("node-geocoder");
var Review = require("../models/review");
 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);

//======================================================================

//INDEX - SHOWS ALL CAMPGROUNDS
//route app campground page

//======================================================================
router.get("/", function(req, res){
	//get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: allCampgrounds, page: "campgrounds"});
		}
	});
});

//=====================================================================

//CREATE - ADD NEW CAMGROUND to DATABASE
//posting new campground function

//=====================================================================

router.post("/", middleware.isLoggedIn, function(req, res){
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	//geocoding code starts/modified
	geocoder.geocode(req.body.location, function (err, data){
    if (err || !data.length) {
      req.flash("error", "Invalid address");
      return res.redirect("back");
    }
    var lat = data[0].latitude;
    var lng = data[0].longitude;
    var location = data[0].formattedAddress;
   //geocoding code added /ends
	var newCampgrounds = {name: name, price: price, image: image,
						  description: description, author: author, location: location, lat: lat,lng: lng};
	// Create a new campground and save to DB
	Campground.create(newCampgrounds, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			//redirect back to campgrounds page
			console.log(newlyCreated);
			res.redirect("/campgrounds");	
		}
	});
  });
});
		

//=====================================================================

//NEW - SHOW form to create new campground

//=====================================================================

router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");	
});

//SHOW - shows more info about one campground
router.get("/:id", function(req, res){
	//find the campground with provided ID/addred reviews populate function
	Campground.findById(req.params.id).populate("comments").populate("likes").populate({
		path: "reviews",
		options: {sort: {createdAt: -1}}
	}).exec(function(err, foundCampground){
		if(err || !foundCampground){
			req.flash("error", "Campground not Found!");
			res.redirect("back");
		} else {
			console.log(foundCampground);
			//render show template with that campground
			res.render("campgrounds/show", {campgrounds: foundCampground});
		}
	});
});

//=======================================================================

//EDIT CAMPGROUND ROUTE

//=======================================================================

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
		Campground.findById(req.params.id, function(err, foundCampground){
					res.render("campgrounds/edit", {campground: foundCampground});
		});
});

//========================================================================

//UPDATE CAMPGROUND ROUTE

//========================================================================
//router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	// find and update the correct campground
//	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
//		if(err){
//			res.redirect("/campgrounds");
//		}else {
//			// redirect somwhere (show page)
//			res.redirect("/campgrounds/" + req.params.id);
//		}
//	});
//});
//new code below google maps if bugs remove
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    req.body.campground.lat = data[0].latitude;
    req.body.campground.lng = data[0].longitude;
    req.body.campground.location = data[0].formattedAddress;

    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/campgrounds/" + campground._id);
        }
    });
  });
});


//========================================================================

//Campground Like Route

//========================================================================
// Campground Like Route Starts
router.post("/:id/like", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            console.log(err);
            return res.redirect("/campgrounds");
        }

        // check if req.user._id exists in foundCampground.likes
        var foundUserLike = foundCampground.likes.some(function (like) {
            return like.equals(req.user._id);
        });

        if (foundUserLike) {
            // user already liked, removing like
            foundCampground.likes.pull(req.user._id);
        } else {
            // adding the new user like
            foundCampground.likes.push(req.user._id);
        }

        foundCampground.save(function (err) {
            if (err) {
                console.log(err);
                return res.redirect("/campgrounds");
            }
            return res.redirect("/campgrounds/" + foundCampground._id);
        });
    });
});
// Like Route Ends

//========================================================================

//DESTROY CAMPGROUND ROUTE

//========================================================================
//new code if doesn't work remove add this back
//router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
//	Campground.findByIdAndRemove(req.params.id, function(err){
//		if(err){
//			res.redirect("/campgrounds");
//		}else {
//			res.redirect("/campgrounds");
//		}
//	});
//});
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            // deletes all comments associated with the campground
            Comment.remove({"_id": {$in: campground.comments}}, function (err) {
                if (err) {
                    console.log(err);
                    return res.redirect("/campgrounds");
                }
                // deletes all reviews associated with the campground
                Review.remove({"_id": {$in: campground.reviews}}, function (err) {
                    if (err) {
                        console.log(err);
                        return res.redirect("/campgrounds");
                    }
                    //  delete the campground
                    campground.remove();
                    req.flash("success", "Campground deleted successfully!");
                    res.redirect("/campgrounds");
                });
            });
        }
    });
});


//exports code for router exports
module.exports = router;