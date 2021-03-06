const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const db = require("./models")

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// view routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/stats.html"));
});
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

// api routes
app.get("/api/workouts", (_, res) => {
    db.Workout.find({}).then(function (dbWorkout) {
        res.json(dbWorkout);
    }).catch(function (error) {
        res.json(error)
    });
});
app.post("/api/workouts", ({ body }, res) => {
    console.log("this is new workout:", body)
    db.Workout.create(body).then(function (dbWorkout) {
        res.json(dbWorkout);
    }).catch(function (error) {
        res.json(error)
    });
});

app.put("/api/workouts/:id", (req, res) => {
    console.log("this is the id: ", req.params.id)
    db.Workout.findByIdAndUpdate(
        {
            _id: req.params.id
        },
        {
            $push: {
                exercises: req.body
            },
            $inc: { totalDuration: req.body.duration },
        },
        { new: true }
    ).then(function (dbUpdated) {
        res.json(dbUpdated)

    }).catch(function (err) {
        res.json(err)
    });
});

//retrieve data for stats 
app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({}).then(function (dbWorkout) {
        res.json(dbWorkout);
    }).catch(function (error) {
        res.json(error)
    });
});















app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
});
