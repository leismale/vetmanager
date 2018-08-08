const Customer = require("../models/Customer");
const Staff = require("../models/Staff");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy((username, password, next) => {
    Customer.findOne({ $or: [{ username: username }, { email: username }] }) //Check if there is a customer with the username or email provided
      .then(user => {
        console.log(user + " local customer");
        if (!user) {
          Staff.findOne({ username }) //Staff login
            .then(user => {
              console.log(user + " local staff");
              if (!user) {
                throw new Error("Incorrect Username");
              }
              if (!bcrypt.compareSync(password, user.password)) {
                throw new Error("Incorrect Password");
              } else {
                console.log("---------------------------------------")
                return next(null, user);
              }
            })
            .catch(e => {
              console.log("ERROR")
              next(null, false, {
                message: e.message
              });
            });
        } else {
          if (!bcrypt.compareSync(password, user.password)) {
            throw new Error("Incorrect Password");
          } else {
            return next(null, user);
          }
        }
        console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
      })
      .catch(e => {
        next(null, false, {
          message: e.message
        });
      });
  })
);
