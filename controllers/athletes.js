const express = require('express');
const Athlete = require('../models/athlete')
const Workout = require('../models/workout')
const {User} = require('../models/user');


// const user = User.findOne({username: req.session.username})
// User.findOne({username: req.session.username})
// .then(user => {
//      const currentUser = user
// })


//  ROUTER

const athletesRouter = express.Router()

// Authorization Middleware
athletesRouter.use((req, res, next) => {
    console.log(req.session)
    if (req.session.loggedIn) {
        next()
    } else {
        res.redirect("/users/login");
    }
});



// ROUTES

// index route 
// athletesRouter.get('/', (req, res) =>{
//     //find all the athletes
//     Athlete.find({})
//     .then(athletes => {
//         res.render('athletes/index.liquid', {athletes})
//     })
//     .catch(error => console.log(error))
// })

athletesRouter.get('/', (req, res) => {
    User.find({ username: req.session.username })
        .then(user => {
            console.log(user)
            Athlete.find({})
                .then(athletes => {
                    res.render('athletes/index.liquid', { athletes, user: user[0] })
                })
        })
        //find all the athletes

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

// update route
athletesRouter.put('/:id', (req, res) => {
    const athleteId = req.params.id
    // const workoutId = req.body._id
    // console.log(req.body._id)
    // Athlete.findByIdAndUpdate(athleteId, {$push: {workouts: workoutId}}, {new: true})
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

// create route for adding workouts
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
    Athlete.findById(req.params.id)
        .then(athlete => res.render('athletes/edit.liquid', { athlete }))
        .catch(error => console.log(error))
})

// // add workout route
// athletesRouter.get('/:id/addWorkout', (req, res) => {
//     Athlete.findById(req.params.id)
//     .then(athlete => res.render('workouts/new.liquid', {athlete}))
//     .catch(error => console.log(error))
// })

// show route
athletesRouter.get('/:id', (req, res) => {
    Athlete.findById(req.params.id)
        .populate('workouts')
        .then(athlete => res.render('athletes/show.liquid', { athlete }))
        .catch(error => console.log(error))
})

//


// export router to server.js
module.exports = athletesRouter