/////////////////////////////////////////////
// Import Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const mongoose = require("./controllers/connection");
const path = require("path");
const athletesRouter = require("./controllers/athletes");
const workoutsRouter = require("./controllers/workouts");
const usersRouter = require('./controllers/users')

/////////////////////////////////////////////////
// Create Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
const app = require("liquid-express-views")(express(), {root: [path.resolve(__dirname, 'views/')]})


// MIDDLEWARE
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically

app.use('/athletes', athletesRouter)
app.use('/workouts', workoutsRouter)
app.use('/users', usersRouter)


// Listen Route
const PORT = 3000;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));