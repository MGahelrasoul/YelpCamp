var Campground = require("../models/campground"),
    Comment = require("../models/comment")

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground) => {
            // Check if campground exists
            // Else check if user owns campground
                
            if(err || !foundCampground){                
                req.flash("error", "Sorry, that campground does not exist!");
                return res.redirect("/campgrounds");
            } else if(foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
    }else {
        req.flash("error", "You must be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err || !foundComment){    // Check if comment exists            
                req.flash("error", "Sorry, that comment does not exist!");
                return res.redirect("back");    //"/campgrounds/" + req.params.id);
            } else if(foundComment.author.id.equals(req.user._id)) { //Check if user owns comment
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("/campgrounds/" + req.params.id);
            }
        });
    }else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}
    
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}    
    
module.exports = middlewareObj;