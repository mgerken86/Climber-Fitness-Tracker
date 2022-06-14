const express = require('express')
const Athlete = require('../models/athlete')
const Workout = require('../models/workout')

// CREATE ROUTE

const workoutsRouter = express.Router()


// ROUTES

// index route 
workoutsRouter.get('/', (req, res) =>{
    //find all the athletes
    Workout.find({})
    .then(workouts => {
        res.render('workouts/index.liquid', {workouts})
    })
    .catch(error => console.log(error))
})

// new route
workoutsRouter.get('/:id/new', (req, res) => {
    Athlete.findById(req.params.id)
    .then(athlete => res.render('workouts/new.liquid', {athlete}))
    .catch(error => console.log(error))
})


// delete route
workoutsRouter.delete('/:id', (req, res) => {
    Workout.findByIdAndDelete(req.params.id)
    .then(workout => res.redirect('/workouts'))
    .catch(error => console.log(error))
})

//update route
workoutsRouter.put('/:id', (req, res) => {
    const id = req.params.id
    Workout.findByIdAndUpdate(id, req.body, {new: true})
    .then(workout => res.redirect(`/workouts/${id}`))
    .catch(error => console.log(error))
})

// create route
workoutsRouter.post('/', (req, res) => {
    console.log
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
    .then(workout => res.render('workouts/edit.liquid', {workout}))
    .catch(error => console.log(error))
})

// show route
workoutsRouter.get('/:id', (req, res) => {
    Workout.findById(req.params.id)
    .then(workout => res.render('workouts/show.liquid', {workout}))
    .catch(error => console.log(error))
})




// export router to server.js
module.exports = workoutsRouter