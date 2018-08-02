const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Staff = require("../models/Staff");

router.get("/getAllStaff", (req, res, next) => {
  Staff.find().then(staff => {
    return res.status(200).json(staff);
  });
});

router.post("/newstaff", (req, res, next) => {
  const { username, password, name, surname, email } = req.body;
  console.log(req.body)
  // Check for empty user/password/name/surname/email
  if (!username || !password || !name || !surname || !email) {
    next(new Error("You must provide valid credentials"));
  }

  // Check if user exists in DB
  Staff.findOne({ username })
    .then(foundUser => {
      if (foundUser) throw new Error("Username already exists");

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      return new Staff({
        username,
        password: hashPass,
        name,
        surname,
        email
      }).save();
    })
    .then(user => res.json(user)) // Answer JSON
    .catch(e => next(e));
});
/* 
router.get("/getStaff/:id", (req, res, next) => {
  staffId = req.params.id;
  Staff.findById(staffId).then(staff => {
    return res.status(200).json(staff);
  });
});

router.post("/updateStaff", (req, res, next) => {
  console.log(req.body);
  const username = req.body.username;
  let staffInfo = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email
  };

  Staff.findOneAndUpdate({ username: username }, staffInfo, { new: true })
    .then(user => {
      console.log(user);
      res.status(200).json(user);
    })
    .catch(e => {
      res.status(500).json({
        status: "error",
        error: e.message
      });
    });
});
 */
module.exports = router;
