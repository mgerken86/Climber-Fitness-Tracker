/////////////////////////////////////////////
// Import Dependencies
/////////////////////////////////////////////
require("dotenv").config() 
const express = require("express"); 
const morgan = require("morgan"); 
const methodOverride = require("method-override")
const path = require("path")
const athletesRouter = require("./controllers/athletes")
const workoutsRouter = require("./controllers/workouts")
const userRouter = require('./controllers/users')
const session = require('express-session')
const MongoStore = require('connect-mongo')

/////////////////////////////////////////////////
// Create Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
const app = require("liquid-express-views")(express(), {root: [path.resolve(__dirname, 'views/')]})

// MIDDLEWARE
app.use(morgan('tiny'))
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public")); // serve files from public statically
// middleware to use Session
// middleware to setup session
app.use(session({
      secret: process.env.SECRET,
      store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
      saveUninitialized: true,
      resave: false,
    })
  );

// Use the routers from controllers directory
app.use('/athletes', athletesRouter)
app.use('/workouts', workoutsRouter)
app.use('/users', userRouter)

// log-in / sign-up page
app.use('/', (req, res) => res.render('users/login.liquid'))


// Listen Route
const PORT = 3000;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));