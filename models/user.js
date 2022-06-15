//////////////////////////////////////////////
// Import Dependencies
//////////////////////////////////////////////
const mongoose = require("../controllers/connection");

////////////////////////////////////////////////
// Define Model
////////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose

// make user schema
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    birthday: Date,
    teams: String, // this is for whether or not you're a coach or an athlete
    workouts: [{type: Schema.Types.ObjectId, ref: 'Workout'}]
})

// user model
const User = model('User', userSchema)


///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = {
    userSchema: userSchema,
    User: User
}