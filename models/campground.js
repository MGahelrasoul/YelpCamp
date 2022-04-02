const mongoose = require("mongoose");
const Schema = mongoose.Schema;

    // define Database Object Schema for Campground

const CampgroundSchema = new Schema({
    title: String,
    price: String,
    description: String,
    location: String
});

// Export schema model for use
module.exports = mongoose.model("Campground", CampgroundSchema);