const mongoose = require("mongoose")

const workoutSchema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now()
    },
    exercises: Array

})

const workout = mongoose.model("workout", workoutSchema)

module.exports = workout