const express = require("express");
const router = express.Router();
const Appointments = require("../models/Appointment");
const Customer = require("../models/Customer");
const Pet = require("../models/Pet");
const bcrypt = require("bcrypt");
const { sendMail } = require("../mail/sendMail");
const urlencode = require("urlencode");

router.post("/getAllAppointments", (req, res, next) => {
  console.log(req.body);
  Appointments.find({ closed: req.body.state }).then(appointments => {
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
  console.log(req.user);
  const appointmentInfo = new Appointments({
    user: req.user._id,
    title: req.user.username,
    date: req.body.date,
    start: req.body.start,
    end: req.body.end,
    startTime: req.body.startTime
  });

  appointmentInfo
    .save((err, appointment) => {
      Customer.findByIdAndUpdate(
        req.user._id,
        { $push: { appointment: appointment._id } },
        { new: true }
      )
        .then(customer => {
          // const hashConfirmation = bcrypt.hashSync(customer.username, 10);
          // let urlConfirmation = urlencode(hashConfirmation);
          let subject = "Confirm your appointment";
          let welcome = "Thank you for booking an appointment";
          let claim =
            "Please, use the button below to confirm your appointment.";
          let confirmationString = "Confirm";
          let email = customer.email;
          sendMail(
            email,
            subject,
            {
              // confirmationUrl: `${process.env.URL}auth/confirm/${urlConfirmation}`,
              welcome,
              claim,
              confirmationString
            },
            "appointment"
          ).then(() => {
            console.log("Email sent");
          });
        })
        .then(customer => {
          appointment
            .update({
              url: `https://vetmngr.herokuapp.com/appointmentdetails/${
                appointmentInfo._id
              }`
            })
            .then(appointment => res.status(200).json(appointment));
        });
    })
    .catch(e => {
      res.status(500).json({
        status: "error",
        error: e.message
      });
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

router.post("/getMyAppointments", (req, res, next) => {
  customerId = req.body._id;
  Customer.findById(customerId)
    .populate("appointment")
    .exec((err, customer) => {
      console.log(customer);
      return res.status(200).json(customer);
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
  const appointmentId = req.body.appointmentId;
  let appointmentInfo = {
    content: req.body.content,
    closed: true
  };

  let petInfo = {
    weight: req.body.weight
  };

  Appointments.findByIdAndUpdate(appointmentId, appointmentInfo, { new: true })
    .populate({
      path: "user",
      populate: {
        path: "pets"
      }
    })
    .then(appointment => {
      Pet.findByIdAndUpdate(appointment.user.pets[0]._id, petInfo, {
        new: true
      }).then(pet => {
        console.log(pet);
      });

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
