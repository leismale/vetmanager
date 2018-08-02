const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const appointmentSchema = new Schema({
  title: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, required: true },
  start: { type: String, required: true },
  end: { type: String },
  price: String,
  invoice: String,
  treatment: { type: Schema.Types.ObjectId, ref: "Treatment" },
  startTime: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;