const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Customer = require("../models/Customer");

const petSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "Customer" },
    name: { type: String, required: true },
    species: String,
    breed: String,
    age: String,
    color: String,
    weight: Number,
    chip: String,
    // vaccination: String,
    // nextVaccination: {
    //   date: Date,
    //   name: String
    // },
    // treatment: { type: Schema.Types.ObjectId, ref: "Treatment" },
    profilePic: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlGEWpd_nau9_JeQF4Ar9usXBJGosKVEAMfnP6KtTT-ANsPLRupQ"
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Pet = mongoose.model("Pet", petSchema);
module.exports = Pet;
