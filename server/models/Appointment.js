const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Customer = require("../models/Customer");


const appointmentSchema = new Schema(
  {
    title: String,
    user: { type: Schema.Types.ObjectId, ref: "Customer" },
    date: { type: Date, required: true },
    start: { type: String, required: true },
    end: { type: String },
    // price: String,
    closed: { type: Boolean, default: false },
    // invoice: String,
    content: { type: String },
    startTime: String,
    url: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
