const mongoose = require("mongoose");
const Schema = mongoose.Schema;

    // define Database Object Schema for Review

const reviewSchema = new Schema({
    body: String,
    rating: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

// Export schema model for use
module.exports = mongoose.model("Review", reviewSchema);