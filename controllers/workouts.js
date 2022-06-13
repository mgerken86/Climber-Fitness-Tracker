const express = require('express')
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
workoutsRouter.get('/new', (req, res) => res.render('workouts/new.liquid'))


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
    const workout = req.body
    console.log(workout)
    Workout.create(workout)
    .then(workout => {
        res.redirect('/workouts')
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
    Athlete.findById(req.params.id)
    .then(workout => res.render('workouts/show.liquid', {workout}))
    .catch(error => console.log(error))
})




// export router to server.js
module.exports = workoutsRouter