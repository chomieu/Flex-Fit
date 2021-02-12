const express = require("express")
const router = express.Router()
const db = require("./models")
const now = new Date
const options = { weekday: 'short', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }

// main page
router.get("/", (req, res) => {
  db.Session.find({}).sort([['name', -1]]).limit(28).populate("exercises").lean()
    .then(data => {
      data.map(x => x.name = x.name.toLocaleString("en-US", options).replace(",", ""))
      res.render("index", { sessions: data })
    })
})

// new session page
router.get("/newSession", (req, res) => {
  db.Exercise.find({}).limit(8).lean().then(data => {
    let show = true
    data.length < 8 ? show = true : show = false
    res.render("partials/newSession", { exercises: data, has8: show })
  })
})

// new exercise page
router.get("/newExercise", (req, res) => {
  db.Exercise.find({}).limit(8).lean().then(data => {
    res.render("partials/newExercise", { exercises: data })
  })
})

// // session page
// router.get("/session/:id", (req, res) => {
//   db.Session.findbyId(req.params.id).then(data => {
//     res.render("partials/viewSession", {session: data})
//   })
// })

// // exercise page
// router.get("/exercise/:id", (req, res) => {
//   db.Exercise.findbyId(req.params.id).then(data => {
//     res.render("partials/viewExercise", {exercise: data})
//   })
// })

// create new session
router.post("/api/sessions", (req, res) => {
  if (!req.body.name) req.body.name = now
  db.Session.create(req.body).then(data => {
    res.redirect("/")
  })
})

// create new exercise
router.post("/api/exercises", (req, res) => {
  db.Exercise.create(req.body).then(data => {
    res.redirect("/newExercise")
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

// // update todo
// router.put("/todo/:id", (req, res) => {
//   console.log(req.body)
//   const filter = { _id: req.params.id }
//   const update = { todo: req.body.todo }
//   db.Exercise.findByIdAndUpdate(filter, update).then(data => {
//     res.json(data)
//   })
// })

// delete session
router.delete("/delete/session/:id", (req, res) => {
  db.Session.findByIdAndRemove({_id: req.params.id}, (err, data) => {
    if (err) throw err
  })
})

// delete exercise
router.delete("/delete/exercise/:id", (req, res) => {
  db.Exercise.findByIdAndRemove({_id: req.params.id}, (err, data) => {
    if (err) throw err
  })
})

module.exports = router