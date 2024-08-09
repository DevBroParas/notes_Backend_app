const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  fs.readdir(`./Files`, function (err, Files) {
    res.render("index", { files: Files });
  });
});

app.post("/create", function (req, res) {
  fs.writeFile(
    `./Files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    function (err) {
      res.redirect("/");
    }
  );
});

app.listen(3000, function () {
  console.log("Running on port 3000");
});
