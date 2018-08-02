const express = require("express");
const router = express.Router();
const Appointments = require("../models/Appointment");

router.get("/getAllAppointments", (req, res, next) => {
  Appointments.find().then(appointments => {
    // Appointments.find({}, {"title":1, "start":1, "_id": 0}).then(appointments => {
    return res.status(200).json(appointments);
  });
});

router.post("/newAppointment", (req, res, next) => {
  const { date } = req.body;

  Appointments.find({ date }).then(appointments => {
    return res.status(200).json(appointments);
  });
});

router.post("/bookAppointment", (req, res, next) => {
  console.log(req.body)
  const appointmentInfo = new Appointments({
    user: req.user._id,
    title: req.user.username,
    date: req.body.date,
    start: req.body.start,
    end: req.body.end,
    startTime: req.body.startTime,
  });

  appointmentInfo.save(err => {
    if (err) {
      return res.status(500).json(err);
    }
    if (appointmentInfo.errors) {
      return res.status(400).json(appointmentInfo);
    }

    return res.status(200).json(appointmentInfo);
  });
});

module.exports = router;
