const mongoose = require('mongoose');
const Appointment = require('../models/Appointment');

mongoose.connect(`mongodb://localhost/vetmanager`);

const appointments = [
  {
    title: "",
    date: "2018-08-07T22:00:00.000Z",
    timeStart: "2018-08-07T22:00:00.000Z",
    timeEnd: "2018-08-08T22:15:00.000Z"
  },
  {
    title: "",
    date: "2018-08-07T22:00:00.000Z",
    timeStart: "2018-08-07T22:15:00.000Z",
    timeEnd: "2018-08-08T22:30:00.000Z"
  },
  {
    title: "",
    date: "2018-08-07T22:00:00.000Z",
    timeStart: "2018-08-07T22:30:00.000Z",
    timeEnd: "2018-08-08T22:45:00.000Z"
  },
  {
    title: "",
    date: "2018-08-07T22:00:00.000Z",
    timeStart: "2018-08-07T22:45:00.000Z",
    timeEnd: "2018-08-08T23:00:00.000Z"
  },
]

Appointment.create(appointments, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${appointments.length} appointments`)
});