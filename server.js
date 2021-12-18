const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

//connect to mongodb
mongoose.connect(
  'mongodb+srv://kazu:kazu0721@cluster0.ieiut.mongodb.net/crud-mern-app?retryWrites=true&w=majority'
);
//data schema
const itemSchema = {
  title: String,
  description: String,
};

//data model
const Item = mongoose.model('Item', itemSchema);

//read route
app.get('/items', (req, res) => {
  Item.find()
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      res.status(400).json('Error:' + err);
    });
});

//create route

app.get('/newitem', (req, res) => {
  const newItem = new Item({
    title: req.body.title,
    description: req.body.description,
  });

  newItem
    .save()
    .then((item) => {
      console.log(item);
    })
    .catch((err) => {
      res.status(400).json('Error: + err');
    });
});

//delete route

//update route

app.listen(3000, () => {
  console.log('Express is running');
});
