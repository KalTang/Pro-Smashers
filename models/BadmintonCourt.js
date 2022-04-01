const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BadmintonCourtSchema = new Schema({
    title: String,
    city: String,
    country: String,
    price: String,
});

module.exports = mongoose.model('BadmintonCourt', BadmintonCourtSchema);
