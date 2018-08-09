const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

router.get("/getAllCustomers", (req, res, next) => {
  Customer.find().then(customer => {
    return res.status(200).json(customer);
  });
});

router.get("/getCustomer/:id", (req, res, next) => {
  customerId = req.params.id;
  Customer.findById(customerId)
  .populate({
    path: "pets",
    populate: {
      path: "name"
    }
  })
  .then(customer => {
    return res.status(200).json(customer);
  });
});

router.post("/updateCustomer", (req, res, next) => {
  const username = req.body.username;
  let customerInfo = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email
  };

  Customer.findOneAndUpdate({ username: username }, customerInfo, { new: true })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(e => {
      res.status(500).json({
        status: "error",
        error: e.message
      });
    });
});

module.exports = router;
