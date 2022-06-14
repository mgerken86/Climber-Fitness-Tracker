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
    gym: String, // this is for whether or not you're a coach or an athlete
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