const mongoose = require('mongoose');

const PaisSchema = mongoose.Schema({
    _id: String,
    country: String,
    population: Number,
    continent: String,
    lifeExpectancy: Number,
    purchasingPower: Number
}, {_v: false});

module.exports = mongoose.model('Pais', PaisSchema);