const express = require("express");
const Student = require("../models/student.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allStudents = await Student.find();
    res.status(200).json(allStudents);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/add", async (req, res) => {
  const student = req.body;

  const newStudent = new Student(student);

  try {
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const student = Student.findById(req.params.id);
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const student = Student.findByIdAndDelete(req.params.id);
    res.status(200).json(student + "Student deleted successfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("update/:id", async (req, res) => {
  try {
    const student = Student.findByIdAndUpdate(req.params.id);
    student.firstName = req.body.firstName;
    student.lastName = req.body.lastName;
    student.studentID = Number(req.body.studentID);
    student.level = req.body.level;
    student.analysis = req.body.analysis;
    student.date = Date(req.body.date);

    student.save();
    res.status(200).json(student + "Student updated successfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
