const mongoose = require('mongoose');
const cities = require('./cities');
const campDetails = require('./campDetails');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const randomCampDetail = Math.floor(Math.random() * campDetails.campDetails.length);
        const camp = new Campground({
            author: '663720abd3d8f973432449ab',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: campDetails.campDetails[randomCampDetail].title,
            description: campDetails.campDetails[randomCampDetail].description,
            price: Math.floor(Math.random() * 20) + 10,
            images: campDetails.campDetails[randomCampDetail].images,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})