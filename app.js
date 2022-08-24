// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Buy food", "Cook food", "Eat food"];
let workItems = [];

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

app.get("/", (req, res) => {
  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  let day = today.toLocaleDateString("en-us", options);

  res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
  let item = req.body.newItem;

  if (req.body.list === "work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "work  List", newListItems: workItems });
});

// app.post('/work', function(req, res) {

//   let item = req.body.newItem;
//   res.redirect('/work');
// });

app.listen(port, function () {
  console.log("Listening on port " + port);
});
