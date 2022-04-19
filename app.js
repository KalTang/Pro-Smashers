const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const BadmintonCourt = require('./models/BadmintonCourt');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const catchAsync = require('./utils/catchAsync');

mongoose.connect('mongodb://localhost:27017/BadmintonBaddies');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Database connected');
});

app.engine('ejs', engine);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
});

// Shows all badminton courts
app.get('/badmintoncourts', async (req, res) => {
    const badmintoncourts = await BadmintonCourt.find({});
    res.render('badmintonCourts/index', { badmintoncourts });
});

// Shows the add form page
app.get('/badmintoncourts/add', async (req, res) => {
    res.render('badmintonCourts/add');
});

// Adds a badminton court to database
app.post(
    '/badmintoncourts',
    catchAsync(async (req, res, next) => {
        const badmintoncourt = new BadmintonCourt(req.body.badmintoncourt);
        await badmintoncourt.save();
        res.redirect(`badmintoncourts/${badmintoncourt._id}`);
    })
);

// show a badminton court
app.get('/badmintoncourts/:id', async (req, res) => {
    const badmintoncourt = await BadmintonCourt.findById(req.params.id);
    res.render('badmintonCourts/show', { badmintoncourt });
});

// Takes you to the edit form for the
app.get('/badmintoncourts/:id/edit', async (req, res) => {
    const badmintoncourt = await BadmintonCourt.findById(req.params.id);
    res.render('badmintoncourts/edit', { badmintoncourt });
});

// updates a badminton court
app.put('/badmintoncourts/:id', async (req, res) => {
    const { id } = req.params;
    const badmintoncourt = await BadmintonCourt.findByIdAndUpdate(id, {
        ...req.body.badmintoncourt,
    });
    res.redirect(`/badmintoncourts/${badmintoncourt._id}`);
});

// Deletes a badminton court
app.delete('/badmintoncourts/:id/', async (req, res) => {
    const { id } = req.params;
    await BadmintonCourt.findByIdAndDelete(id);
    res.redirect('/badmintoncourts');
});

// Default error
app.use((err, req, res, next) => {
    res.send('Something went wrong');
});

app.listen('8080', () => {
    console.log('Listening to PORT 8080');
});
