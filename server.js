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



app.put("/api/workouts/:id", (req, res) => {
    console.log(req)
    db.Workout.update(
        {
            _id: req.params.id
        },
        {
            $push: {
                exercise: req.body
            }
        }).then(function (dbUpdated) {
            res.json(dbUpdated)
                
        }).catch(function (err) {
            res.json(err)
        });
        
    
});








app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
});
