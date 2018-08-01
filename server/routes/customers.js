const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

router.get("/getAllCustomers", (req, res, next) => {
  Customer.find().then(customer => {
    return res.status(200).json(customer);
  });
});

module.exports = router;
