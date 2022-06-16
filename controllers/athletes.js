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
            Athlete.find({coach: req.session.username})
                .populate('workouts')
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
    athlete.coach = req.session.username
    Athlete.create(athlete)
        .then(athlete => {
            res.redirect('/athletes')
        })
        .catch(error => console.log(error))
})

// create route for adding workouts to athlete
athletesRouter.post('/:id', (req, res) => {
    const athleteId = req.params.id
    const workout = req.body
    workout.athlete = athleteId
    workout.totalScore = Number(workout.maxFinger) + Number(workout.maxPullup) + Number(workout.core) + Number(workout.endurance)
    workout.climbingGrade = findClimbingGrade(workout.totalScore)
    Workout.create(workout)
        .then(workout => {
            return Athlete.findByIdAndUpdate(athleteId, { $push: { workouts: workout._id } }, { new: true })
        })
        .then(athlete => {
            res.redirect(`/athletes/${athleteId}`)
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


// the function to figure out the workout's equivalent climbing grade
function findClimbingGrade(score) {
    switch (score) {
        case 1:
            return "5.10a"
        case 2:
            return "5.10b"
        case 3:
            return "5.10c"
        case 4:
            return "5.10d"
        case 5:
            return "5.11a"
        case 6:
            return "5.11a"
        case 7:
            return "5.11b"
        case 8:
            return "5.11b"
        case 9:
            return "5.11c/d"
        case 10:
            return "5.11c/d"
        case 11:
            return "5.12a"
        case 12:
            return "5.12a"
        case 14:
            return "5.12b"
        case 15:
            return "5.12c"
        case 16:
            return "5.12c"
        case 17:
            return "5.12d"
        case 18:
            return "5.12d"
        case 19:
            return "5.13a"
        case 20:
            return "5.13a"
        case 21:
            return "5.13b"
        case 22:
            return "5.13b"
        case 23:
            return "5.13c"
        case 24:
            return "5.13c"
        case 25:
            return "5.13d"
        case 26:
            return "5.13d"
        case 27:
            return "5.14a"
        case 28:
            return "5.14a"
        case 29:
            return "5.14b"
        case 30:
            return "5.14b"
        case 31:
            return "5.14c"
        case 32:
            return "5.14c"
        case 33:
            return "5.14d"
        case 34:
            return "5.14d"
        case 35:
            return "5.15a"
        case 36:
            return "5.15a"
        case 37:
            return "5.15b"
        case 38:
            return "5.15b"
        case 39:
            return "5.15c"
        case 40:
            return "5.15d"

    }
}