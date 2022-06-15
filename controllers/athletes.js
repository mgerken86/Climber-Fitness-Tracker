const express = require('express');
const Athlete = require('../models/athlete')
const Workout = require('../models/workout')
const { User } = require('../models/user')


//  ROUTER
const athletesRouter = express.Router()

// Authorization Middleware
athletesRouter.use((req, res, next) => {
    if (req.session.loggedIn) {
        next()
    } else {
        res.redirect("/users/login");
    }
});


// ***** ROUTES ***** 

// index route
athletesRouter.get('/', (req, res) => {
    User.find({ username: req.session.username })
        .then(user => {
            Athlete.find({})
                .then(athletes => {
                    res.render('athletes/index.liquid', { athletes, user: user[0] })
                })
                .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
})

// new route
athletesRouter.get('/new', (req, res) => {
    User.find({ username: req.session.username })
        .then(user => res.render('athletes/new.liquid', { user: user[0] }))
        .catch(error => console.log(error))
})


// delete route
athletesRouter.delete('/:id', (req, res) => {
    Athlete.findByIdAndDelete(req.params.id)
        .then(athlete => res.redirect('/athletes'))
        .catch(error => console.log(error))
})

// update route
athletesRouter.put('/:id', (req, res) => {
    const athleteId = req.params.id
    Athlete.findByIdAndUpdate(athleteId, req.body, { new: true })
        .then(athlete => {
            res.redirect(`/athletes/${athleteId}`)
        })
        .catch(error => console.log(error))
})

// create route
athletesRouter.post('/', (req, res) => {
    const athlete = req.body
    Athlete.create(athlete)
        .then(athlete => {
            res.redirect('/athletes')
        })
        .catch(error => console.log(error))
})

// create route for adding workouts to athlete
athletesRouter.post('/:id', (req, res) => {
    const athleteId = req.params.id
    req.body.athlete = athleteId
    console.log(req.body)
    Workout.create(req.body)
        .then(workout => {
            return Athlete.findByIdAndUpdate(athleteId, { $push: { workouts: workout._id } }, { new: true })
        })
        .then(athlete => {
            res.redirect('/workouts')
        })
        .catch(error => console.log(error))
})

// edit route
athletesRouter.get('/:id/edit', (req, res) => {
    User.find({ username: req.session.username })
        .then(user => {
            Athlete.findById(req.params.id)
                .then(athlete => res.render('athletes/edit.liquid', { athlete, user: user[0] }))
                .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
})

// Show route
athletesRouter.get('/:id', (req, res) => {
    User.find({ username: req.session.username })
        .then(user => {
            Athlete.findById(req.params.id)
                .populate('workouts')
                .then(athlete => res.render('athletes/show.liquid', { athlete, user: user[0] }))
                .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
})


// export router to server.js
module.exports = athletesRouter