const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const newTodos = ["buy beer", "buy lottery", "buy beer"];
const newWorkTodos = [];

const app = express();


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("list", { listTitle: date.getDate(), newListItems: newTodos });
});

app.post("/", function(req, res) {
  let newTodo = req.body.newtodo;
  if (req.body.list === "Work List") {
    newWorkTodos.push(newTodo);
    res.redirect("/work");
  } else {
    newTodos.push(newTodo);
    res.redirect("/");
  }
  console.log(req.body);
});

app.get("/work", function(req, res) {
  res.render("list", { listTitle: "Work List", newListItems: newWorkTodos });
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function() {
  console.log("server is running");
});
