const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

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

//api routes
app.get("api/workouts", (req, res) => {
    db.Workout.find({}).then(function (dbWorkouts) {
        res.json(dbWorkouts);
    });
});
app.get("/api/images", function (req, res) {
    db.Image.find({}).then(function (dbImages) {
        res.json(dbImages);
    });
});



app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
});
