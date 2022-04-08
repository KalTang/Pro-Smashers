const mongoose = require('mongoose');
const BadmintonCourt = require('../models/BadmintonCourt')
const courts = require('./courts')

mongoose.connect('mongodb://localhost:27017/BadmintonBaddies');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Database connected');
});

const seedDB = async = () => {
 await BadmintonCourt.deleteMany({})
 for(let i = 0; i < BadmintonCourt.length; i++){
     const newCourt = new BadmintonCourt(courts[i])
     await newCourt.save();
 }

}

seedDB().then(() => {
    console.log('Pro-Smashers app seeded successfully')
    mongoose.connection.close()
})