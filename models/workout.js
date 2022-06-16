const mongoose = require('../controllers/connection')
const moment = require('moment')

// MODELS
const { Schema, model } = mongoose

//workout schema
const workoutSchema = new Schema({
    athlete: {type: Schema.Types.ObjectId, ref: 'Athlete'},
    date: {type: String, default: moment(new Date()).format("MM/DD/YYYY")},
    maxFinger: {type: Number, required: true},
    maxPullup: {type: Number, required: true},
    core: {type: Number, required: true},
    endurance: {type: Number, required: true},
    totalScore: Number,
    climbingGrade: String
})

// workout model
const Workout = model('Workout', workoutSchema)

module.exports = Workout