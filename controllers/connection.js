// Dependencies
require("dotenv").config(); // Load ENV Variables
const mongoose = require("mongoose");

// Global Configuration
const DATABASE_URL = process.env.DATABASE_URL

// Connect to Mongo
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;
// Connection Error/Success - optional but can be helpful
// Define callback functions for various events
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("open", () => console.log("mongo connected: ", DATABASE_URL));
db.on("close", () => console.log("mongo disconnected"));


    
////////////////////////////////////////////////////
// Export the Connection
////////////////////////////////////////////////////

module.exports = mongoose;