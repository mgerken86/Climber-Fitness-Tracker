const express = require('express')
const Athlete = require('../models/athlete')
const Workout = require('../models/workout')
const { User } = require('../models/user')
const axios = require('axios')

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

// the object that gets passed to the Liquid page with a climbing Reddit post
const redditObject = {}
// show route
workoutsRouter.get('/:id', (req, res) => {
    User.find({ username: req.session.username })
        .then(user => {
            Workout.findById(req.params.id)
                .populate('athlete')
                .then(workout => {
                    // leaving this other API commented out here just in case. I think the ClimbingPorn reddit search is better, but they're both good
                    // axios.get(`https://www.reddit.com/r/climbing/search.json?q=${workout.climbingGrade}`)
                    axios.get(`https://www.reddit.com/r/ClimbingPorn/search.json?q=${workout.climbingGrade}`)
                    .then(data => {
                        allRedditPosts = data.data.data.children
                        randomPost = allRedditPosts[Math.floor(Math.random() * allRedditPosts.length)]
                        redditObject.title = randomPost.data.title
                        redditObject.img = randomPost.data.thumbnail
                        res.render('workouts/show.liquid', { workout, user: user[0], redditObject })
                    })
                })
                .catch(error => console.log(error))
        .catch(error => console.log(error))
        })
})


// export router to server.js
module.exports = workoutsRouter

