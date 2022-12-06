const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

    // define Database Object Schema for Campground

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual("thumbnail").get(function() {
    return this.url.replace("/upload", "/upload/w_200");
});

const opts = { toJSON: { virtuals: true } };
const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
            type: {
                type: String,
                enum: ["Point"],
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            }
        },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
}, opts);

CampgroundSchema.virtual("properties.popUpMarkup").get(function() {
    return `<div class="card">
                <a class="card-header nav-link mb-0" href="/campgrounds/${this._id}"><strong>${this.title}</strong></a>
                <div class="card-body pt-0">
                    <p class="card-text my-1">${this.location}</p>
                    <p class="card-text">${this.description.substring(0, 25)}...</p>
                </div>
            </div>`
});

CampgroundSchema.post("findOneAndDelete", async function (doc) {
    if(doc){
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

// Export schema model for use
module.exports = mongoose.model("Campground", CampgroundSchema);