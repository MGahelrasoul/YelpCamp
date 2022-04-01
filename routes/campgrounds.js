var express     = require("express"),
    router      = express.Router(),
    middleware  = require("../middleware"),
    Campground  = require("../models/campground"),
    NodeGeocoder = require('node-geocoder');

var options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null
};

var geocoder = NodeGeocoder(options);

// INDEX - shows all the campgrounds
router.get("/", (req, res) => {
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all campgrounds from db
        Campground.find({$or: [{name: regex,}, {location: regex}, {"author.username":regex}]}, function(err, allCampgrounds) {
            if(err || !allCampgrounds) {
                console.log(err);
                return req.flash("error", "Something Went Wrong");
            } else if (allCampgrounds.length < 1) {
                req.flash("error", "No Campgrounds found");
                return res.redirect("back");
            } else {
                res.render("campgrounds/index", {campgrounds: allCampgrounds});
            }
        });

    } else {
        // Get all campgrounds from db
        Campground.find({}, function(err, allCampgrounds) {
            if(err || !allCampgrounds) {
                console.log(err);
                return req.flash("error", "Something Went Wrong");
            } else {
                res.render("campgrounds/index", {campgrounds: allCampgrounds});
            }
        });
    }
});

// CREATE - logic of making the campgrounds/redirecting
router.post("/", middleware.isLoggedIn, (req, res) => {
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    geocoder.geocode(req.body.location, (err, data) => {
        if (err || !data.length) {
            console.log(err);
            req.flash('error', 'Invalid address');
            return res.redirect('back');
        }
        var lat = data[0].latitude;
        var lng = data[0].longitude;
        var location = data[0].formattedAddress;
        var newCampground = {name: name, price: price, image: image, description: description, author: author, location: location, lat: lat, lng: lng};
        // Create a new campground and save to DB
        Campground.create(newCampground, function(err, newlyCreated) {
            if (err) {
                console.log(err);
                req.flash("error", "Something Went Wrong");
                return res.redirect("back");
            } else {
                //redirect back to campgrounds page
                res.redirect("/campgrounds");
            }
        });
    });
});

// NEW - shows the form to create new campgrounds
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

// SHOW - shows more info on the campground
router.get("/:id", (req, res) => {
    //find the campground with id
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if(err || !foundCampground) {    
            console.log(err);
            req.flash("error", "Sorry, that campground does not exist!");
            return res.redirect("/campgrounds");
        } else {
            //render template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//EDIT - shows the form to update a campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//UPDATE - logic to update the campground
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) =>{
    geocoder.geocode(req.body.location, (err, data) => {
        if (err || !data.length) {
            req.flash('error', 'Invalid address');
            return res.redirect('back');
        }
        req.body.campground.lat = data[0].latitude;
        req.body.campground.lng = data[0].longitude;
        req.body.campground.location = data[0].formattedAddress;
        Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
            if(err) {
                req.flash("error", "Something Went Wrong");
                res.redirect("/campgrounds");
            } else {
                req.flash("success", "Updated campground successfully!");
                res.redirect("/campgrounds/" + req.params.id);
            }
        });
    });
});

//DESTROY - remove an exisiting campground from the Database
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            req.flash("error", "Something Went Wrong");
            return res.redirect("/campgrounds");
        } else {
            req.flash("success", "Successfully deleted campground");
            res.redirect("/campgrounds");
        }
    });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;