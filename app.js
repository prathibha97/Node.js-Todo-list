// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = ["Buy food", "Cook food", "Eat food"];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

app.get("/", (req, res) => {
  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  var day = today.toLocaleDateString('en-us', options);

  res.render("list", { kindOfDay: day , newListItems: items});
});


app.post('/', function(req, res) {

var item = req.body.newItem;

items.push(item);
console.log(item);
res.redirect('/');
});

app.listen(port, function () {
  console.log("Listening on port " + port);
});
