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
    res.render("partials/newSession", { exercises: data })
  })
})

// new exercise page
router.get("/newExercise", (req, res) => {
  res.render("partials/newExercise")
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
  req.body.todo = true
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
router.delete("/delete/:id", (req, res) => {
  db.Session.findByIdAndRemove({_id: req.params.id}, (err, data) => {
    if (err) throw err
  })
})

// router.delete("/clearall", (req, res) => {
//   db.Exercise.remove({}, (err, data) => {
//     if (err) throw err
//   })
// })

module.exports = router