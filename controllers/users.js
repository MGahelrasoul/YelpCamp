const User = require("../models/user");

// Register

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}
module.exports.register = async(req, res) => {
    try {
        
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash("success", "Welcome to YelpCamp!");
            res.redirect("/campgrounds");
        })
    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/register");
    }
}

// Login

module.exports.renderLogin = (req, res) => {
    res.render("users/login");
}
module.exports.login = (req, res) => {
    req.flash("success", "Welcome back!");
    const redirectUrl = req.session.returnTo || "/campgrounds";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

// Logout

module.exports.logout = (req, res, next) => {
    req.logout(function(err) {
        if(err){
            return next(err);
        }
    });
    req.flash("success", "Successfully Logged out");
    res.redirect("/campgrounds");
}
