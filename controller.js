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
    }).catch(err => {if (err) throw err})
})

// new session page
router.get("/newSession", (req, res) => {
  db.Exercise.find({}).limit(8).lean().then(data => {
    let show = true
    data.length < 8 ? show = true : show = false
    res.render("partials/newSession", { exercises: data, has8: show })
  }).catch(err => {if (err) throw err})
})

// new exercise page
router.get("/newExercise", (req, res) => {
  db.Exercise.find({}).limit(8).lean().then(data => {
    res.render("partials/newExercise", { exercises: data })
  }).catch(err => {if (err) throw err})
})

// view session
router.get("/update/session/:id", (req, res) => {
  db.Session.findOne({ _id: req.params.id }).then(dataSession => {
    db.Exercise.find({}).limit(8).lean().then(dataExercise => {
      let show = true
      dataExercise.length < 8 ? show = true : show = false
      dataExercise.map(item => dataSession.exercises.indexOf(item._id) === -1 ? item.match = false : item.match = true)
      let oldInfo = localISOString(dataSession.name).slice(0, -3)
      res.render("partials/newSession", { exercises: dataExercise, has8: show, update: oldInfo, _id: req.params.id })
    }).catch(err => {if (err) throw err})
  })
})

// update session
router.post("/update/session/:id", (req, res) => {
  let update = {}
  !req.body.exercises ? update = { name: req.body.name, exercises: [] } : update = req.body
  db.Session.findByIdAndUpdate({ _id: req.params.id }, update).then(data => {
    res.redirect("/")
  }).catch(err => {if (err) throw err})
})

// view exercise
router.get("/update/exercise/:id", (req, res) => {
  db.Exercise.findOne({ _id: req.params.id }).then(dataOne => {
    db.Exercise.find({}).limit(8).lean().then(dataAll => {
      res.render("partials/newExercise", { exercises: dataAll, update: dataOne })
    }).catch(err => {if (err) throw err})
  })
})

// update exercise
router.post("/update/exercise/:id", (req, res) => {
  db.Exercise.findByIdAndUpdate({ _id: req.params.id }, req.body).then(data => {
    res.redirect("/newExercise")
  }).catch(err => {if (err) throw err})
})

// create new session
router.post("/api/session", (req, res) => {
  if (!req.body.name) req.body.name = now
  db.Session.create(req.body).then(data => {
    res.redirect("/")
  }).catch(err => {if (err) throw err})
})

// create new exercise
router.post("/api/exercise", (req, res) => {
  db.Exercise.create(req.body).then(data => {
    res.redirect("/newExercise")
  }).catch(err => {if (err) throw err})
})

// view sessions
router.get("/api/session", (req, res) => {
  db.Session.find({}).then(data => {
    res.json(data)
  }).catch(err => {if (err) throw err})
})

// view exercises
router.get("/api/exercise", (req, res) => {
  db.Exercise.find({}).then(data => {
    res.json(data)
  }).catch(err => {if (err) throw err})
})

// delete session
router.delete("/delete/session/:id", (req, res) => {
  db.Session.findByIdAndRemove({ _id: req.params.id }, (err, data) => {
    if (err) throw err
  })
})

// delete exercise
router.delete("/delete/exercise/:id", (req, res) => {
  db.Exercise.findByIdAndRemove({ _id: req.params.id }, (err, data) => {
    if (err) throw err
  })
})

function localISOString(date) {
  const offset = date.getTimezoneOffset() * 60 * 1000;
  const localMs = date.getTime() - offset;
  const localDate = new Date(localMs);
  const iso = localDate.toISOString();
  const localISO = iso.slice(0, 19);
  return localISO;
}

module.exports = router