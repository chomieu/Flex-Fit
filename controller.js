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

// view session
router.get("/update/session/:id", (req, res) => {
  db.Session.findOne({_id: req.params.id}).then(dataSession => {
    db.Exercise.find({}).limit(8).lean().then(dataExercise => {
      let show = true
      dataExercise.length < 8 ? show = true : show = false
      let oldInfo = localISOString(dataSession.name).slice(0, -3)
      res.render("partials/newSession", { exercises: dataExercise, has8: show, update: oldInfo, _id: req.params.id })
    })
  })
})

// update session
router.put("/update/session/:id", (req, res) => {
  console.log(req.body)
  db.Session.findByIdAndUpdate({_id: req.params.id}, req.body).then(data => {
    res.redirect("/newSession")
  })
})

// // update exercise
// router.get("/update/exercise/:id", (req, res) => {
//   db.Exercise.findbyId(req.params.id).then(data => {
//     res.render("partials/viewExercise", {exercise: data})
//   })
// })

// create new session
router.post("/api/session", (req, res) => {
  if (!req.body.name) req.body.name = now
  db.Session.create(req.body).then(data => {
    res.redirect("/")
  })
})

// create new exercise
router.post("/api/exercise", (req, res) => {
  db.Exercise.create(req.body).then(data => {
    res.redirect("/newExercise")
  })
})

// view sessions
router.get("/api/session", (req, res) => {
  db.Session.find({}).then(data => {
    res.json(data)
  })
})

// view exercises
router.get("/api/exercise", (req, res) => {
  db.Exercise.find({}).then(data => {
    res.json(data)
  })
})

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

function localISOString(date) {
  const offset = date.getTimezoneOffset() * 60 * 1000;
  const localMs =  date.getTime() - offset;
  const localDate = new Date(localMs);
  const iso = localDate.toISOString();
  const localISO = iso.slice(0, 19);
  return localISO;
}

module.exports = router