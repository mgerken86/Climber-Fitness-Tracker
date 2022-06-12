const mongoose = require('../controllers/connection')

// MODELS
const { Schema, model } = mongoose

//athlete schema
const workoutSchema = new Schema({
    createdAt: {type: Date, default: Date.now},
    maxFinger: Number,
    maxPullup: Number,
    core: Number,
    endurance: Number,
    athlete: {type: Schema.Types.ObjectId, ref: 'Athlete', required: true}
})

// athlete model
const Workout = model('Workout', workoutSchema)

module.exports = Workout