const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const BadmintonCourt = require('./models/BadmintonCourt');

mongoose.connect('mongodb://localhost:27017/BadmintonBaddies');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Database connected');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/badmintoncourts', async (req, res) => {
    const badmintoncourts = await BadmintonCourt.find({});
    res.render('badmintonCourts/index');
});

app.get('/badmintoncourts/add', async (req, res) => {
    res.render('badmintonCourts/add');
});

app.listen('8080', () => {
    console.log('Listening to PORT 8080');
});
