var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    User        = require("../models/user")

//Root Route
router.get("/", (req, res) => {
    res.redirect("/campgrounds");
});

// Show Register form
router.get("/register", (req, res) => {
    res.render("register");
});
// Handles registration logic
router.post("/register", (req, res) => { 
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

// Show Login form
router.get("/login", (req, res) => {
    res.render("login", {referer: req.headers.referer});
});
// Handles login logic
router.post("/login", passport.authenticate("local", {failureRedirect: "/login"}), (req, res) => {
    if(req.body.referer && (req.body.referer !== undefined && req.body.referer.slice(-6) !== "/login" && req.body.referer.slice(-6) !== "/register")) {
        res.redirect(req.body.referer);
    } else {
        res.redirect("/campgrounds");
    }
});

// Logout
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Successfully Logged Out");
    res.redirect("/campgrounds");
});

// Other routes
router.get("/*", (req, res) => {
    res.status(404).redirect("/campgrounds");
});

module.exports = router;