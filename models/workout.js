const mongoose = require('../controllers/connection')

// MODELS
const { Schema, model } = mongoose

//workout schema
const workoutSchema = new Schema({
    // athlete: {type: Schema.Types.ObjectId, ref: 'Athlete', required: true},
    createdAt: {type: Date, default: Date.now},
    maxFinger: {type: Number, required: true},
    maxPullup: {type: Number, required: true},
    core: {type: Number, required: true},
    endurance: {type: Number, required: true},
})

// workout model
const Workout = model('Workout', workoutSchema)

module.exports = Workout