// Express app
const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
const exphbs = require("express-handlebars")
app.engine("handlebars", exphbs({defaultLayout: "main"}))
app.set("view engine", "handlebars")

// Database
const logger = require("morgan");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", { useNewUrlParser: true });

// Routes
const routes = require("./controller.js")
app.use(routes)

// Server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});