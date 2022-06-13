// //////////////////////////////////////////////
// // Import Dependencies
// //////////////////////////////////////////////
// const mongoose = require("../controllers/connection");

// ////////////////////////////////////////////////
// // Define Model
// ////////////////////////////////////////////////
// // pull schema and model from mongoose
// const { Schema, model } = mongoose

// // make user schema
// const teamSchema = new Schema({
//     name: { type: String, required: true, unique: true },
//     ageRange: { type: Number, required: true },
//     competitionDivision: { type: String, required: true },
//     athletes: [{type: Schema.Types.ObjectId}]
// })

// // user model
// const Team = model('Team', teamSchema)


// ///////////////////////////////////////////////////
// // Export Model
// ///////////////////////////////////////////////////
// module.exports = {
//     teamSchema: teamSchema,
//     Team: Team
// }