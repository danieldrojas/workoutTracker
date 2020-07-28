const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
        day: { type: Date, default: Date.now },
        exercises: [
            {
                type: {
                    type: String,
                    trim: true,
                    require: "Type of exercise is Required",
                },
                name: {
                    type: String,
                    trim: true,
                    require: "Name is Required",
                },
                duration: {
                    type: Number,
                },
                weight: {
                    type: Number,
                },
                reps: {
                    type: Number,
                },
                distance: {
                    type: Number,
                },
                sets: {
                    type: Number,
                },
            },
        ],
        totalDuration: {
            type: Number,
            default: 0,
        },
    },
);

const Workout = mongoose.model("Workout", workoutSchema)

module.exports = Workout;