const express = require("express");
const router = express.Router();
const Pet = require("../models/Pet");

router.get("/getAllPets", (req, res, next) => {
  Pet.find().then(pets => {
    return res.status(200).json(pets);
  });
});

router.post("/newPet", (req, res, next) => {
  console.log(req.body)
  const petInfo = new Pet({
    user: req.body.username,
    name: req.body.name,
    surname:req.body.surname,
    email: req.body.email,
    petName: req.body.petName,
    species: req.body.species,
    color: req.body.color,
    weight: req.body.weight
});

  petInfo.save(err => {
    if (err) {
      console.log(err)
      return res.status(500).json(err);
    }
    if (petInfo.errors) {
      return res.status(400).json(petInfo);
    }

    return res.status(200).json(petInfo);
  });
});

module.exports = router;
