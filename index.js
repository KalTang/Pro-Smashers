const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res) => {
    res.render('home');
});

app.set('view engine', 'ejs');

app.listen('8080', () => {
    console.log('Listening to PORT 8080');
});
