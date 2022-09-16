const mongoose = require('mongoose');
const express = require('express');
const bodyparser = require("body-parser");
var cors = require('cors');
port = 8080;


const app = express();
app.use(cors());
app.use(bodyparser.json());

mongoose.connect("mongodb://localhost:27017/database").then(() => console.log("connected"))
  .catch((err) => console.error(err))
var connection = mongoose.connection



// post request to add data to database
app.post('/api', (req, res) => {

  res.send(req.body)
  const collection = connection.db.collection("netflix");
  collection.insertOne(req.body);
  collection.find(req.body).toArray(function (err, data) {
    console.log(data); // it will print your collection data
  });

})


//delete requeest to remove an item from the database

app.delete("/user/:name", function (req, res) {

  var name = "" + req.params['name'];
  const collection = connection.db.collection("netflix");
  collection.deleteOne({ title: name }, function (err, result) {
    console.log(name);
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });

});


//get request to print all data from the database

app.get('/api', (req, res) => {
  const collection = connection.db.collection("netflix");
  collection.insertOne(req.body);
  collection.find().toArray(function (err, data) {

    console.log(data); // it will print your collection data
  });
  res.send("successful");
})



//get request to print all the data 
app.get('/api/:name', (req, res) => {
  var name = req.params['name'];
  const collection = connection.db.collection("netflix");
  collection.find({ title: name }).toArray(function (err, data) {

    console.log(data); // it will print your collection data
  });
  res.send("successful");
})




// connection.once('open', async function () {

//   const collection  = connection.db.collection("netflix");

//   // collection.insertOne({ name: '3-idiots' });
//   // collection.find({name:'3-idiots'}).toArray(function(err, data){
//   //     console.log(data); // it will print your collection data
//   // });
//   // collection.deleteOne({ name: '3-idiots'});

//   collection.find().toArray(function(err, data){
//     console.log(data); // it will print your collection data
// });

// });



//patch request to update the data in the database

app.patch("/api/:name", function (req, res) {

  var name = req.params['name'];
  const collection = connection.db.collection("netflix");
  console.log(req.body);
  var des = req.body.description;
  var tit = req.body.title;
  var imdb = req.body.imdb_score;

  collection.updateOne(
    { title: name }, {
    $set: {

      description: des,
      imdb_score: imdb
    }
  }

  );
  res.send(req.body);
});





app.listen(port, () => {
  console.log("running");
});














