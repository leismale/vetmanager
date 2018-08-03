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
  console.log(req.body);
  const appointmentInfo = new Appointments({
    user: req.user._id,
    title: req.user.username,
    date: req.body.date,
    start: req.body.start,
    end: req.body.end,
    startTime: req.body.startTime
  });

  appointmentInfo.save((err, appointment) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (appointmentInfo.errors) {
      return res.status(400).json(appointmentInfo);
    }

    appointment
      .update({
        url: `http://localhost:4200/appointmentdetails/${appointmentInfo._id}`
      })
      .then(appointment => res.status(200).json(appointment));
  });
});

router.get("/getDetails/:id", (req, res, next) => {
  appointmentId = req.params.id;
  Appointments.findById(appointmentId)
    .populate({
      path: "user",
      populate: {
        path: "pets"
      }
    })
    .then(appointment => {
      console.log(appointment);
      return res.status(200).json(appointment);
    });
});

router.post("/updateAppointment", (req, res, next) => {
  console.log(req.body);
  const appointmentId = req.body.appointmentId;
  let appointmentInfo = {
    title: req.body.title,
    start: req.body.start,
    end: req.body.end
  };

  Appointments.findByIdAndUpdate(appointmentId, appointmentInfo, { new: true })
    .then(appointment => {
      console.log(appointment);
      res.status(200).json(appointment);
    })
    .catch(e => {
      res.status(500).json({
        status: "error",
        error: e.message
      });
    });
});

router.post("/closeAppointment", (req, res, next) => {
  console.log(req.body);
  console.log("hola")
  const appointmentId = req.body.appointmentId;
  let appointmentInfo = {
    // weight: req.body.weight,
    content: req.body.content,
    closed: true
  };

  Appointments.findByIdAndUpdate(appointmentId, appointmentInfo, { new: true })
    .then(appointment => {
      console.log(appointment);
      res.status(200).json(appointment);
    })
    .catch(e => {
      res.status(500).json({
        status: "error",
        error: e.message
      });
    });
});

module.exports = router;
