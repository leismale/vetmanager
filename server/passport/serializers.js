const Customer = require('../models/Customer');
const passport = require('passport');

passport.serializeUser((user, cb) => {
    cb(null, user._id);
});

passport.deserializeUser((id, cbo) => {
    Customer.findById(id, (err, user) => {
        if (err) {
            return cb(err);
        }
        cbo(null, user);
    });
});
