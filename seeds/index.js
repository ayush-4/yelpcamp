const mongoose = require('mongoose');
const cities= require('./cities');
const {places,descriptors} = require('./seedHelper');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
  useNewUrlParser : true,
  //useCreateIndex : true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random()* array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for(let i =0;i<200;i++){
    const rand1000 = Math.floor(Math.random() * 1000);
    const pr = Math.floor(Math.random()*20) +10;
    const camp = new Campground({
      author : '62c013cd8153524089d4c6de',
      location : `${cities[rand1000].city}, ${cities[rand1000].state}`,
       title : `${sample(descriptors)} ${sample(places)}`,
       description : 
       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci nulla totam fuga provident maiores, aliquam sunt veniam beatae error incidunt doloribus, alias voluptatibus fugiat odit placeat quisquam harum distinctio molestiae!',
       price:pr,
        geometry: {
        type: "Point",
        coordinates: [
              cities[rand1000].longitude,
              cities[rand1000].latitude,
          ]
        },
       images : [
        {
          url: 'https://res.cloudinary.com/ayushhcloud/image/upload/v1657021483/YelpCamp/tjhivptliqmwalo0xgdc.png',
          filename: 'YelpCamp/tjhivptliqmwalo0xgdc'
        },
        {
          url: 'https://res.cloudinary.com/ayushhcloud/image/upload/v1657021487/YelpCamp/xdutjtbjftdgbcmqqpge.png',
          filename: 'YelpCamp/xdutjtbjftdgbcmqqpge'
        }
      ]
    })
    await camp.save();
  }
}
seedDB().then(()=>{
  mongoose.connection.close();
});