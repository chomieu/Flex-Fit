const mongoose = require("mongoose")
const Schema = mongoose.Schema
const now = new Date()
const options = {weekday: 'short', month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true}

const SessionSchema = new Schema({
  name: {
    type: Date,
    default: `${now.toLocaleString("en-US", options)}`
  },

  exercises: [{
    type: Schema.Types.ObjectId,
    ref: "Exercise"
  }]

})

const Session = mongoose.model("Session", SessionSchema);

module.exports = Session
