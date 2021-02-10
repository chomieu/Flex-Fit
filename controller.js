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

// new session page
router.get("/newSession", (req, res) => {
  db.Exercise.find({}).lean().then(data => {
    res.render("partials/newSession", {exercises: data})
  })
})

// new exercise page
router.get("/newExercise", (req, res) => {
  res.render("partials/newExercise")
})

// session page
router.get("/session/:id", (req, res) => {
  db.Session.findbyId(req.params.id).then(data => {
    res.render("partials/viewSession", {session: data})
  })
})

// exercise page
router.get("/exercise/:id", (req, res) => {
  db.Exercise.findbyId(req.params.id).then(data => {
    res.render("partials/viewExercise", {exercise: data})
  })
})

// create new session
router.post("/api/sessions", (req, res) => {
  db.Session.create(req.body).then(data => {
    console.log(req.body)
    res.redirect("/")
  })
})

// create new exercise
router.post("/api/exercises", (req, res) => {
  db.Exercise.create(req.body).then(data => {
    res.redirect("/")
  })
})

// view sessions
router.get("/api/sessions", (req, res) => {
  db.Session.find({}).then(data => {
    res.json(data)
  })
})

// view exercises
router.get("/api/exercises", (req, res) => {
  db.Exercise.find({}).then(data => {
    res.json(data)
  })
})

module.exports = router