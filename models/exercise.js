const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ExerciseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  todo: Boolean,
  weight: Number,
  sets: Number,
  reps: Number,
  duration: Number,
  distance: Number
});

const Exercise = mongoose.model("Exercise", ExerciseSchema)

module.exports = Exercise
