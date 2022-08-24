// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Buy food", "Cook food", "Eat food"];

app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

app.get("/", (req, res) => {
  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  let day = today.toLocaleDateString('en-us', options);

  res.render("list", { kindOfDay: day , newListItems: items});
});


app.post('/', function(req, res) {

let item = req.body.newItem;

items.push(item);
console.log(item);
res.redirect('/');
});

app.listen(port, function () {
  console.log("Listening on port " + port);
});
