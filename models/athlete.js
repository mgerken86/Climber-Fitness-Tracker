const mongoose = require('../controllers/connection')
const {userSchema} = require('./user')

// MODELS
const { Schema, model } = mongoose

//athlete schema
const athletesSchema = new Schema({
    userDetails: userSchema,
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    birthday: Date,
    img: String,
    workouts: [{type: Schema.Types.ObjectId, ref: 'Workout'}]
})

// athlete model
const Athlete = model('Athlete', athletesSchema)


module.exports = Athlete