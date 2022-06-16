const express = require('express')
const Athlete = require('../models/athlete')
const Workout = require('../models/workout')
const { User } = require('../models/user')

// CREATE ROUTE

const workoutsRouter = express.Router()

// Authorization Middleware
workoutsRouter.use((req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect("/users/login");
    }
});


// ROUTES

// index route 
workoutsRouter.get('/', (req, res) => {
    User.find({ username: req.session.username })
        .then(user => {
            //find the top 10 highest workouts recorded
            Workout.find({})
                .sort({totalScore: -1})
                .limit(10)
                .populate('athlete')
                .then(workouts => {
                    res.render('workouts/index.liquid', { workouts, user: user[0] })
                })
                .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
})

// new route
workoutsRouter.get('/:id/new', (req, res) => {
    User.find({ username: req.session.username })
        .then(user => {
            Athlete.findById(req.params.id)
                .then(athlete => res.render('workouts/new.liquid', { athlete, user: user[0] }))
                .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
})


// delete route
workoutsRouter.delete('/:id', (req, res) => {
        Workout.findByIdAndDelete(req.params.id)
        //delete the workout and redirect back to that athlete's show page
        .then(workout => res.redirect(`/athletes/${workout.athlete._id}`))
        .catch(error => console.log(error))
    })


//update route
workoutsRouter.put('/:id', (req, res) => {
    const id = req.params.id
    Workout.findByIdAndUpdate(id, req.body, { new: true })
        .then(workout => res.redirect(`/workouts/${id}`))
        .catch(error => console.log(error))
})

// create route
workoutsRouter.post('/', (req, res) => {
    const workout = req.body
    Workout.create(workout)
        .then(workout => {
            res.redirect('/workouts')
            console.log(workout)
        })
        .catch(error => console.log(error))
})

// edit route
workoutsRouter.get('/:id/edit', (req, res) => {
    Workout.findById(req.params.id)
        .then(workout => res.render('workouts/edit.liquid', { workout, user: user[0] }))
        .catch(error => console.log(error))
})

// show route
workoutsRouter.get('/:id', (req, res) => {
    User.find({ username: req.session.username })
        .then(user => {
            Workout.findById(req.params.id)
                .populate('athlete')
                .then(workout => res.render('workouts/show.liquid', { workout, user: user[0] }))
                .catch(error => console.log(error))
        .catch(error => console.log(error))
        })
})



// export router to server.js
module.exports = workoutsRouter