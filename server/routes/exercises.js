const express = require("express");
const Exercise = require("../models/exercise.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allExercises = await Exercise.find();
    res.status(200).json(allExercises);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/add", async (req, res) => {
  const studentName = req.body.studentName;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    studentName,
    description,
    duration,
    date,
  });

  try {
    await newExercise.save();
    res.status(201).json(newExercise + "Exercise added!");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const exercise = Exercise.findById(req.params.id);
    res.status(200).json(exercise);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const exercise = Exercise.findByIdAndDelete(req.params.id);
    res.status(200).json(exercise + "Exercise deleted successfully!");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("update/:id", async (req, res) => {
  try {
    const exercise = Exercise.findByIdAndUpdate(req.params.id);

    exercise.studentName = req.body.studentName;
    exercise.description = req.body.description;
    exercise.duration = Number(req.body.duration);
    exercise.date = Date.parse(req.body.date);

    exercise.save();

    res.status(200).json(exercise + "Exercise updated!");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
