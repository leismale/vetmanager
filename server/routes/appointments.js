const express = require("express");
const router = express.Router();
const Appointments = require("../models/Appointment");

router.post("/newAppointment", (req, res, next) => {
  const { date } = req.body;

  Appointments.find({ date }).then(appointments => {
    res.status(200).json(appointments);
    console.log(appointments);
  });
});

/* router.post("/bookAppointment", (req, res, next) => {
  let appointmentId = req.body.appointment;

  let appointmentInfo = {
    user: req.user._id,
    title: req.user.username
  };

  Appointments.findByIdAndUpdate(
    appointmentId,
    { $set: appointmentInfo },
    { new: true }
  ).then(res.status(200).json());
}); */


router.post("/bookAppointment", (req, res, next) => {
    const appointmentInfo = new Appointments({
        user: req.user._id,
        title: req.user.username,
        date: req.body.date,
        timeStart: req.body.timeStart,
        //timeEnd: req.body.timeEnd,
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
