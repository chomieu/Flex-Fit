const mongoose = require("mongoose")
const Schema = mongoose.Schema
const now = new Date

const SessionSchema = new Schema({
  name: Date,
  exercises: [{
    type: Schema.Types.ObjectId,
    ref: "Exercise"
  }],
  todos: [{
    type: Schema.Types.ObjectId,
    ref: "Session"
  }]
})

const Session = mongoose.model("Session", SessionSchema);

module.exports = Session
