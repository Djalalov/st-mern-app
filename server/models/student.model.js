const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: true,
    },
    lastName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: true,
    },
    studentID: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },
    level: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    analysis: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const student = mongoose.model("student", studentSchema);
module.exports = student;
