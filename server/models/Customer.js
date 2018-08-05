const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Pet = require("../models/Pet");


const customerSchema = new Schema(
  {
    role: { type: String, default: "customer" },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    profilePic: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlGEWpd_nau9_JeQF4Ar9usXBJGosKVEAMfnP6KtTT-ANsPLRupQ"
    },
    address: String,
    postcode: String,
    appointment: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
    // invoices: { type: Schema.Types.ObjectId, ref: "Invoice" },
    pets: [{ type: Schema.Types.ObjectId, ref: "Pet" }],
    confirmationCode: { type: String, default: false }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
