var mongoose        = require("mongoose");
var Campground      = require("./models/campground");
var Comment         = require("./models/comment");

// var data = [
//     {name: "Cloud's Rest",
//     image: "https://media.timeout.com/images/105658195/image.jpg",
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis quae aut quisquam amet laborum cumque magni quis enim repudiandae, expedita eius officiis commodi autem odit ullam corporis mollitia optio repellat? Cupiditate quis necessitatibus soluta est consequatur facilis hic fugit quibusdam quae natus unde atque voluptas culpa dolores, harum deleniti nostrum odit, labore adipisci veritatis voluptatem obcaecati sed. Quasi doloremque provident perferendis, asperiores exercitationem molestias? Deserunt ratione enim id ut architecto quae aut, officiis illo error eum provident soluta molestias corporis tempora vero. Inventore voluptate molestiae officia at libero quas aliquam odit veritatis. Consequatur fugiat ipsum voluptatibus sapiente. Aliquid, dolorum veniam?"
//     },
//     {name: "Tree Farm",
//     image: "https://www.rd.com/wp-content/uploads/2017/05/00_camping_Bucket-List-Worthy-American-Campsites_358158596_shuttero_FT.jpg",
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis quae aut quisquam amet laborum cumque magni quis enim repudiandae, expedita eius officiis commodi autem odit ullam corporis mollitia optio repellat? Cupiditate quis necessitatibus soluta est consequatur facilis hic fugit quibusdam quae natus unde atque voluptas culpa dolores, harum deleniti nostrum odit, labore adipisci veritatis voluptatem obcaecati sed. Quasi doloremque provident perferendis, asperiores exercitationem molestias? Deserunt ratione enim id ut architecto quae aut, officiis illo error eum provident soluta molestias corporis tempora vero. Inventore voluptate molestiae officia at libero quas aliquam odit veritatis. Consequatur fugiat ipsum voluptatibus sapiente. Aliquid, dolorum veniam?"
//     },
//     {name: "Didney Worl",
//     image: "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/900/360/75/dam/wdpro-assets/places-to-stay/campsites-at-fort-wilderness/campsites-at-fort-wilderness-resort-00-full.jpg?1592975994323",
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis quae aut quisquam amet laborum cumque magni quis enim repudiandae, expedita eius officiis commodi autem odit ullam corporis mollitia optio repellat? Cupiditate quis necessitatibus soluta est consequatur facilis hic fugit quibusdam quae natus unde atque voluptas culpa dolores, harum deleniti nostrum odit, labore adipisci veritatis voluptatem obcaecati sed. Quasi doloremque provident perferendis, asperiores exercitationem molestias? Deserunt ratione enim id ut architecto quae aut, officiis illo error eum provident soluta molestias corporis tempora vero. Inventore voluptate molestiae officia at libero quas aliquam odit veritatis. Consequatur fugiat ipsum voluptatibus sapiente. Aliquid, dolorum veniam?"
//     }
// ]

function seedDb(){
    //remove all campgrounds
    Campground.remove({}, (err)=>{
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, (err) => {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
            //add a few campgrounds
            data.forEach((seed) => {
                Campground.create(seed, (err, campground) => {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("added a campground");
                        //Create a comment
                        Comment.create({
                                text: "this place is great, but i wish there was internet",
                                author: "Homer"
                            }, (err, comment) =>{
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    });
}

module.exports = seedDb;