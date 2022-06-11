const express = require('express')
const Athlete = require('../models/athlete')

// CREATE ROUTE

const router = express.Router()


// ROUTES

// index route 
router.get('/', (req, res) =>{
    //find all the athletes
    Athlete.find({})
    .then(athletes => {
        res.render('athletes/index.liquid', {athletes})
    })
    .catch(error => console.log(error))
})

// new route
router.get('/new', (req, res) => res.render('athletes/new.liquid'))


// delete route
router.delete('/:id', (req, res) => {
    Athlete.findByIdAndDelete(req.params.id)
    .then(athlete => res.redirect('/athletes'))
    .catch(error => console.log(error))
})

//update route
router.put('/:id', (req, res) => {
    const id = req.params.id
    Athlete.findByIdAndUpdate(id, req.body, {new: true})
    .then(athlete => res.redirect(`/athletes/${id}`))
    .catch(error => console.log(error))
})

// create route
router.post('/', (req, res) => {
    const athlete = req.body
    Athlete.create(athlete)
    .then(athlete => {
        res.redirect('/athlete')
    })
    .catch(error => console.log(error)) 
})

// edit route
router.get('/:id/edit', (req, res) => {
    Athlete.findById(req.params.id)
    .then(product => res.render('athletes/edit.liquid', {athlete}))
    .catch(error => console.log(error))
})

// show route
router.get('/:id', (req, res) => {
    Athlete.findById(req.params.id)
    .then(athlete => res.render('athletes/show.liquid', {athlete}))
    .catch(error => console.log(error))
})




// export router to server.js
module.exports = router