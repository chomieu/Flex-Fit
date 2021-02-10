const express = require("express")
const router = express.Router()
const db = require("./models")

// main page
router.get("/", (req, res) => {
  db.Session.find({})
  .populate("exercises")
  .then(data => {
    res.render("index", {all: data})
  })
})

// session page
router.get("/session/:id", (req, res) => {
  db.Session.findbyId(req.params.id).then(data => {
    res.render("viewsession", {session: data})
  })
})

// exercise page
router.get("/exercise/:id", (req, res) => {
  db.Exercise.findbyId(req.params.id).then(data => {
    res.render("viewexercise", {exercise: data})
  })
})

// new session
router.post("/api/sessions", (req, res) => {
  db.Session.create(req.body).then(data => {
    res.redirect("/")
  })
})

// new exercise
router.post("/api/exercises", (req, res) => {
  db.Exercise.create(req.body).then(data => {
    res.redirect("/")
  })
})
