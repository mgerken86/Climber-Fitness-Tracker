////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const {User} = require("../models/user");
const bcrypt = require("bcryptjs");


/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

// The Signup Routes (Get => form, post => submit form)
router.get('/createUser', (req, res) => {
    res.render("users/createUser.liquid");
});

// New User
router.post('/createUser', async (req, res) => {
    req.body.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
    )
    User.create(req.body)
    .then(user => {
        res.redirect('/users/login')
    })
    .catch(error => {
        console.log(error)
        res.json({ error })
    })
});

// The login Routes (Get => form, post => submit form)
router.get('/login', (req, res) => {
    res.render("users/login.liquid");
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username })
      .then(async (user) => {
          console.log(user)
        // check if user exists
        if (user) {
          // compare password
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            // store some properties in the session object
            req.session.username = username;
            req.session.loggedIn = true;
            res.redirect(`/users/${user._id}`);
          } else {
            // error if password doesn't match
            res.json({ error: "Sorry, that password is incorrect" });
          }
        } else {
          // send error if user doesn't exist
          res.json({ error: "Sorry, that user doesn't exist" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  });
  

router.get('/logout', (req, res) => {
    // destroy session and redirect to main page
    req.session.destroy((err) => {
      res.redirect("/login");
    });
  });

router.get(':/id', (req, res) => {
  User.findById(req.params.id)
  .populate('workouts')
  .then(user => res.render('users/home.liquid', {user}))
})
  

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;