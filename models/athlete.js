const mongoose = require('./connection')

// MODELS
const { Schema, model } = mongoose

//athlete schema
const athletesSchema = new Schema({
    firstName: { type: String, required: true},
    birthday: Date,
    img: String,
    workouts: [{type: Schema.Types.ObjectId, ref: 'Workout'}]
})

// athlete model
const Athlete = model('Athlete', athletesSchema)

module.exports = Athlete