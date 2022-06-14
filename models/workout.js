const mongoose = require('../controllers/connection')

// MODELS
const { Schema, model } = mongoose

//workout schema
const workoutSchema = new Schema({
    // athlete: {type: Schema.Types.ObjectId, ref: 'Athlete', required: true},
    createdAt: {type: Date, default: Date.now},
    maxFinger: Number,
    maxPullup: Number,
    core: Number,
    endurance: Number
})

// workout model
const Workout = model('Workout', workoutSchema)

module.exports = Workout