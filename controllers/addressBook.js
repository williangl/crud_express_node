const express = require('express');

const router = express.Router();

const Address = require('../model/models');

router.post('/new', (req, res) => {
  name = req.body.name,
  email = req.body.email,
  phone = req.body.phone,
  place = req.body.place

  let newAddress = new Address({
    name: name,
    email: email,
    phone: phone,
    place: place,
  });

  newAddress.save().then((address) => {
    res.send(address);
  }).catch((err) => {
    console.log(err);
  });
});

router.get('/', (req, res) => {
  Address.find({}, (err, users) => {
    res.send(users);
  });
});

router.get('/:name', (req, res) => {
  Address.find({ name: req.params.name }, (err, user) => {
    res.send(user);
  });
});

router.post('/update/:id', (req, res) => {
  let address = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    place: req.body.place,
  };

  Address.updateOne({ _id: req.params.id }, address).then(() => {
    res.send(address);
  }).catch((err) => {
    console.log(err);
  });
});

router.delete('/delete/:id', (req, res) => {
  Address.deleteOne({ _id: req.params.id }).then(() => {
    res.send({ message: 'deleted' });
  }).catch((err) => {
    console.log(err);
  });
});

module.exports = router;
