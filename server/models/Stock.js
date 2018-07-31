const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const stockSchema = new Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    default: "drug",
    enum: ["drug", "office", "cleaning", "food", "other"]
  },
  quantity: { type: Number, required: true },
  pic: String,
  description: String,
  needReplenishment: Boolean,
  ordered: Boolean,
  minQuantity: Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;