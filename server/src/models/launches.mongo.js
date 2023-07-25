const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
    mission: {
        type: String,
        required: true
    },
    rocket: {
        type: String,
        required: true
    },
    launchDate: {
        type: Date,
        required: true
    },
    target: {
        type: String,
    },
    flightNumber: {
        type: Number,
        required: true
    },
    customers: {
        type: [ String ],
        required: false
    },
    upcoming: {
        type: Boolean,
        required: true,
    },
    success: {
        type: Boolean,
        required: true,
        default: true,
    },
})
// Connects launchesSchema with the "launches" collection, un schema tiene que ser un sustantivo singular
module.exports = mongoose.model('Launch', launchesSchema)