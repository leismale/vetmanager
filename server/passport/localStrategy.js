const Customer = require("../models/Customer");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy((username, password, next) => {
    const email = username;
    Customer.findOne({ username }).then(user => {  //Check if there is a user with the username provided
      if (!user) {
        Customer.findOne({ email }) //If it doesnt find the username, it checks if there is a user with the email provided
          .then(user => {
            if (!user) throw new Error("Incorrect Username");
            if (!bcrypt.compareSync(password, user.password))
              throw new Error("Incorrect Password");
            return next(null, user);
          })
          .catch(e => {
            next(null, false, {
              message: e.message
            });
          });
      } else {
        return next(null, user);
      }
    });
  })
);
