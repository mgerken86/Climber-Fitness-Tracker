const mongoose = require('../controllers/connection')
const Athlete = require('./athlete')
const Workout = require('./workout')
const { db } = require('./athlete')

mongoose.connection
.on('open', () => {
    const seedAthletes = [
        {
        firstName: "Mark",
        lastName: "Gerken",
        birthday: 03/27/1986,
        workouts: []
        },
        {
        firstName: "Bob",
        lastName: "Barker",
        birthday: 01/15/1935,
        workouts: []
        }
    ]
    Athlete.deleteMany({})
    .then(emptyCollection => {
        Athlete.create(seedAthletes)
        .then(athletes => {
            db.close()
            console.log(athletes)
        })
    })
    .catch(err => {
        console.log(err)
        db.close()
    })
})