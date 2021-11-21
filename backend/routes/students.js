const router = require("express").Router();
let User = require("../models/student.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(student))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const studentname = req.body.studentname;

  const newStudent = new User({ studentname });

  newStudent
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
