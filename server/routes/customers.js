const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

router.get("/getAllCustomers", (req, res, next) => {
  Customer.find().then(customer => {
    return res.status(200).json(customer);
  });
});

router.get("/getCustomer/:id", (req, res, next) => {
  customerId = req.params.id
  console.log(customerId)
  Customer.findById(customerId).then(customer => {
    return res.status(200).json(customer);
  });
});


module.exports = router;
