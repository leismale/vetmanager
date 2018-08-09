const express = require("express");
const router = express.Router();
const Pet = require("../models/Pet");
const Customer = require("../models/Customer");

router.get("/getAllPets", (req, res, next) => {
  Pet.find()
  .populate("owner")
  .then(pets => {
    return res.status(200).json(pets);
  });
});

router.post("/newPet", (req, res, next) => {
  Customer.findOne({ username: req.body.owner }).then(customer => {
    const petInfo = new Pet({
      owner: customer._id,
      name: req.body.name,
      species: req.body.species,
      color: req.body.color,
      weight: req.body.weight,
      
    });
    petInfo.save((err, pet) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (petInfo.errors) {
        return res.status(400).json(petInfo);
      }
      customer.update({ $push: { pets: pet._id } }).then(pet => {
        res.status(200).json(petInfo);
      });
    });
  });
});

router.get("/getPet/:id", (req, res, next) => {
  petId = req.params.id;
  Pet.findById(petId).then(pet => {
    return res.status(200).json(pet);
  });
});

router.post("/getMyPets", (req, res, next) => {
  customerId = req.body._id;
  Customer.findById(customerId)
    .populate("pets")
    .exec((err, customer) => {
      return res.status(200).json(customer);
    });
});

router.post("/updatePet", (req, res, next) => {
  const name = req.body.name;
  let petInfo = {
    species: req.body.species,
    color: req.body.color,
    weight: req.body.weight
  };

  Pet.findOneAndUpdate({ name: name }, petInfo, { new: true })
    .then(pet => {
      res.status(200).json(pet);
    })
    .catch(e => {
      res.status(500).json({
        status: "error",
        error: e.message
      });
    });
});

module.exports = router;
