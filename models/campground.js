const mongoose = require("mongoose");
const Schema = mongoose.Schema;

    // define Database Object Schema for Campground

const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String
});

// Export schema model for use
module.exports = mongoose.model("Campground", CampgroundSchema);