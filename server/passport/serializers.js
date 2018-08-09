const Customer = require("../models/Customer");
const Staff = require("../models/Staff");
const passport = require("passport");

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cbo) => {
  Customer.findById(id)
    .then(user => {
      if (user) {
        cbo(null, user);
      } else {
        Staff.findById(id)
          .then(user => cbo(null, user))
          .catch(err => cb(err));
      }
    })
    .catch(err => cb(err));
});
