const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Customer = require("../models/Customer");
const passport = require("passport");

const login = (req, user) => {
  return new Promise((resolve, reject) => {
    req.login(user, err => {
      if (err) {
        reject(new Error("Something went wrong"));
      } else {
        resolve(user);
      }
    });
  });
};

// SIGNUP
router.post("/signup", (req, res, next) => {
  const { username, password, name, surname, email } = req.body;

  // Check for empty user/password/name/surname/email
  if (!username || !password || !name || !surname || !email) {
    next(new Error("You must provide valid credentials"));
  }

  // Check if user exists in DB
  Customer.findOne({ username })
    .then(foundUser => {
      if (foundUser) throw new Error("Username already exists");

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      return new Customer({
        username,
        password: hashPass,
        name,
        surname,
        email
      }).save();
    })
    .then(savedUser => login(req, savedUser)) // Login the user using passport
    .then(user => res.json({ status: "signup & login successfully", user })) // Answer JSON
    .catch(e => next(e));
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    // Check for errors
    if (err) next(new Error("Something went wrong"));
    if (!theUser) next(failureDetails);

    // Return user and logged in
    login(req, theUser).then(user => res.status(200).json(req.user));
  })(req, res, next);
});

router.get("/currentuser", (req, res, next) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    next(new Error("Not logged in"));
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "logged out" });
});

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

router.post("/changeSettings", (req, res, next) => {
  const { usernameId, password, name, surname, email } = req.body;

  Customer.findByIdAndUpdate(
    usernameId,
    { usernameId, password, name, surname, email },
    { new: true }
  )
    .then(user => {
      res.status(200).json(user);
    })
    .catch(e => {
      res.status(500).json({
        status: "error",
        error: e.message
      });
    });
});

module.exports = router;
