var express = require("express");
var router = express.Router();
var Country = require("../models/country");

// get a list of countries rom the db

router.get("/countries", (req, res) => {
  Country.find({}).then(function(countries) {
    res.send(countries);
    console.log(countries);
  });
});

// add a new country to the db

router.post("/countries", (req, res) => {
  console.log(req.body);
  const country = new Country(req.body);
  Country.create(country).then(function(country) {
    res.send(country);
  });
});

module.exports = router;