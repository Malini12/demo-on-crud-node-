const express = require("express");
const cors = require("cors");
const app = express();
const bodyparser = require("body-parser");
const mongodb = require("mongodb");
const mongoclient = mongodb.MongoClient;
const url = "mongodb://localhost:27017";

app.use(cors());
app.use(bodyparser.json());

app.post("/save", function(req, res) {
  mongoclient.connect(url, function(err, client) {
    if (err) throw err;
    var db = client.db("pracDB");
    console.log(req.body.name);
    db.collection("sample").insertOne(req.body, function(err, data) {
      if (err) throw error;

      console.log(data);

      res.json({ message: "success" });
    });
    client.close();
  });
  console.log(req.body);
});

app.get("/display", function(req, res) {
  mongoclient.connect(url, function(err, client) {
    if (err) throw err;

    var db = client.db("pracDB");

    var database = db
      .collection("sample")
      .find()
      .toArray();
    database.then(function(data) {
      console.log(data);
      res.json(data);
    });
    client.close();
  });
  console.log(req.body);
});

app.get("/modify", function(req, res) {
  mongoclient.connect(url, function(err, client) {
    if (err) throw err;
    var db = client.db("pracDB");
    db.collection("sample")
      .updateOne(
        {
          name: "mal"
        },
        {
          $set: { name: "aaa" }
        }
      )
      .then(result => {
        console.log(result);
        res.json(result);
      })
      .catch(err => {
        console.log(err);
      });
    client.close();
  });
  console.log(req.body);
});

app.get("/remove", function(req, res) {
  mongoclient.connect(url, function(err, client) {
    if (err) throw err;
    var db = client.db("pracDB");
    console.log(req.body.name);
    db.collection("sample").insertOne(req.body, function(err, data) {
      if (err) throw error;

      console.log(data);

      res.json({ message: "success" });
    });
    client.close();
  });
  console.log(req.body);
});
app.listen(3000);
