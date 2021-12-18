const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

//config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.post('/newitem', (req, res) => {
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

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  Item.findByIdAndDelete({ _id: id }, (req, res, err) => {
    if (!err) {
      console.log('item deleted');
    } else {
      console.log(err);
    }
  });
});

//update route

app.listen(3000, () => {
  console.log('Express is running');
});
