const mongoose = require("mongoose");
const cities = require("./cities");
const {places, descriptors} = require("./seedHelpers");
const Campground = require("../models/campground");

    // Connect MongoDB via mongoose

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// Catch error
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

    // seedDB function to seed (fill) Database with dummy data

const sample = (array) => array[Math.floor(Math.random() * array.length)];
const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "6387c8a041f51a72cb0bb36f",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis quae aut quisquam amet laborum cumque magni quis enim repudiandae, expedita eius officiis commodi autem odit ullam corporis mollitia optio repellat",
            price,
            geometry: { 
                type: 'Point', 
                coordinates: [ cities[random1000].longitude, cities[random1000].latitude ] 
            },
            images: [
                {
                    url: "https://res.cloudinary.com/dubnbjlho/image/upload/v1670014490/YelpCamp/lhh41dcvgsyianpx8wth.jpg",
                    filename: "YelpCamp/lhh41dcvgsyianpx8wth"
                },
                {
                    url: 'https://res.cloudinary.com/dubnbjlho/image/upload/v1670014020/YelpCamp/tvzjntkqrq8bycltdlmq.jpg',
                    filename: 'YelpCamp/tvzjntkqrq8bycltdlmq',
                }
            ]
        });
        await camp.save();
    }
}

// Run seedDB, then close Database connection
seedDB().then(() => {
    mongoose.connection.close();
});