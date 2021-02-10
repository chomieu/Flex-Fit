const mongoose = require("mongoose")
const Schema = mongoose.Schema
const now = new Date()

const SessionSchema = new Schema({
  name: {
    type: Date,
    default: `${now.toLocaleString("en-US")}`
  },

  exercises: [{
    type: Schema.Types.ObjectId,
    ref: "Exercise"
  }]

})

const Session = mongoose.model("Session", SessionSchema);

module.exports = Session
