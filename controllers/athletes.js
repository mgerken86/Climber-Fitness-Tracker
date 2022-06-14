const express = require('express')
const Athlete = require('../models/athlete')

// CREATE ROUTE

const athletesRouter = express.Router()


// ROUTES

// index route 
athletesRouter.get('/', (req, res) =>{
    //find all the athletes
    Athlete.find({})
    .then(athletes => {
        res.render('athletes/index.liquid', {athletes})
    })
    .catch(error => console.log(error))
})

// new route
athletesRouter.get('/new', (req, res) => res.render('athletes/new.liquid'))


// delete route
athletesRouter.delete('/:id', (req, res) => {
    Athlete.findByIdAndDelete(req.params.id)
    .then(athlete => res.redirect('/athletes'))
    .catch(error => console.log(error))
})

//update route
athletesRouter.put('/:id', (req, res) => {
    const id = req.params.id
    console.log(req.body)
    Athlete.findByIdAndUpdate(id, {$push: {workouts: req.body}}, {new: true})
    .then(athlete => {
        res.redirect(`/athletes/${id}`)
        console.log(athlete)
        console.log(athlete.workouts)
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


// edit route
athletesRouter.get('/:id/edit', (req, res) => {
    Athlete.findById(req.params.id)
    .then(athlete => res.render('athletes/edit.liquid', {athlete}))
    .catch(error => console.log(error))
})

// add workout route
athletesRouter.get('/:id/addWorkout', (req, res) => {
    Athlete.findById(req.params.id)
    .then(athlete => res.render('workouts/new.liquid', {athlete}))
    .catch(error => console.log(error))
})

// show route
athletesRouter.get('/:id', (req, res) => {
    Athlete.findById(req.params.id)
    .then(athlete => res.render('athletes/show.liquid', {athlete}))
    .catch(error => console.log(error))
})

//


// export router to server.js
module.exports = athletesRouter