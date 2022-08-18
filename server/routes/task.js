const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
recordRoutes.route("/task").get(function (req, res) {
  let db_connect = dbo.getDb("tpat");
  db_connect
    .collection("tasks")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
recordRoutes.route("/task/:id").get(function (req, res) {
  let db_connect = dbo.getDb("tpat");
  // console.log(req.params.id);
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("tasks").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

recordRoutes.route("/task/category/math").get(function (req, res) {
  let db_connect = dbo.getDb();

  let myquery = { category: "math" };
  db_connect
    .collection("tasks")
    .find(myquery)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

recordRoutes.route("/task/category/english").get(function (req, res) {
  let db_connect = dbo.getDb();

  let myquery = { category: "english" };
  db_connect
    .collection("tasks")
    .find(myquery)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

recordRoutes.route("/task/category/tutorial").get(function (req, res) {
  let db_connect = dbo.getDb();

  let myquery = { category: "tutorial" };
  db_connect
    .collection("tasks")
    .find(myquery)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

recordRoutes.route("/task/status/in-progress").get(function (req, res) {
  let db_connect = dbo.getDb();

  let myquery = { status: "in-progress" };
  db_connect
    .collection("tasks")
    .find(myquery)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

recordRoutes.route("/task/status/complete").get(function (req, res) {
  let db_connect = dbo.getDb();

  let myquery = { status: "complete" };
  db_connect
    .collection("tasks")
    .find(myquery)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

recordRoutes.route("/task/status/scored").get(function (req, res) {
  let db_connect = dbo.getDb();

  let myquery = { status: "scored" };
  db_connect
    .collection("tasks")
    .find(myquery)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new record.
recordRoutes.route("/task/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    // name: req.body.name,
    // position: req.body.position,
    // level: req.body.level,
    category: req.body.category,
    title: req.body.title,
    description: req.body.description,
    time: req.body.time,
    imgURL: req.body.imgURL,
    video: req.body.video,
    id: req.body.id,
    status: req.body.status,
  };
  db_connect.collection("tasks").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a task by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      category: req.body.category,
      title: req.body.title,
      description: req.body.description,
      time: req.body.time,
      imgURL: req.body.imgURL,
      video: req.body.video,
      id: req.body.id,
      status: req.body.status,
    },
  };
  db_connect
    .collection("tasks")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("tasks").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = recordRoutes;
