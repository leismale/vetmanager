const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const treatmentSchema = new Schema(
  {
    pet: { type: Schema.Types.ObjectId, ref: "Pet" },
    drug: { type: Schema.Types.ObjectId, ref: "Stock" },
    duration: {
      duration: String,
      startDate: Date,
      endDate: Date,
      comments: String
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Treatment = mongoose.model("Treatment", treatmentSchema);
module.exports = Treatment;
