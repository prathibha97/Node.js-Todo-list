// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
  name: "Welcome to your todo list!",
});

const item2 = new Item({
  name: "Hit the + button to add a new item!",
});

const item3 = new Item({
  name: "<-- Hit this to delete an item!",
});

const defaultItem = [item1, item2, item3];

app.get("/", (req, res) => {
  Item.find({}, function (err, item) {
    if (item.length === 0) {
      Item.insertMany(defaultItem, function (err) {
        if (err) {
          console.error(err);
        } else {
          console.log("Added items to the list!");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", { listTitle: "Today", newListItems: item });
    }
  });
});

app.post("/", function (req, res) {

  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName,
  });

  item.save();
  res.redirect("/");
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "work  List", newListItems: workItems });
});

app.listen(port, function () {
  console.log("Listening on port " + port);
});
