const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoiceSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    date: Date,
    price: String,
    treatment: { type: Schema.Types.ObjectId, ref: "Treatment" },
    content: String,
    vet: { type: Schema.Types.ObjectId, ref: "Staff" },
    pets: { type: Schema.Types.ObjectId, ref: "Pet" },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;