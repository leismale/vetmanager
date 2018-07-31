const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const appointmentSchema = new Schema({
  title: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  vet: { type: Schema.Types.ObjectId, ref: "Staff" },
  date: { type: Date, required: true },
  timeStart: { type: String, required: true },
  timeEnd: { type: String, required: true },
  price: String,
  invoice: String,
  treatment: { type: Schema.Types.ObjectId, ref: "Treatment" },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;