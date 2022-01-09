import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

///////////////////////INITIALIZATION OF STATES ////////////////
const CreateStudent = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    studentID: 0,
    level: "",
    date: new Date(),
  });

  const [analysis, setAnalysis] = useState("");
  const { firstName, lastName, studentID, level, date } = values;

  ////////////////////LOADING FUNCTION STARTS/////////////////////

  const showLoading = () => {
    loading ? <div className="alert alert-info">Loading...</div> : "";
  };

  const showSuccess = () => {
    success ? (
      <div className="alert alert-success"> Student Successfully created. </div>
    ) : (
      ""
    );
  };

  const showFailed = () => {
    failed ? <div className="alert alert-danger">StudentLoading...</div> : "";
  };
  ///////////////MARKETING ANALYSIS STARTS//////////////////////////////

  ////////////////// SUBMITTING THE FORM //////////////////////////////////

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoading();
    const student = {
      firstName,
      lastName,
      studentID,
      analysis,
      level,
      date,
    };

    try {
      await axios.post("http://localhost:5000/students/add", student);
      console.log(student);
      showSuccess();
      window.location = "/create-student";

      /*   firstName("");
      lastName("");
      studentID(0);
      level("");
      date(null); */
    } catch (error) {
      console.log(error);
      showFailed();
    }
  };

  //////////////////////////// HANDLING CHANGES ///////////////////////////

  const handleChange = (data) => (e) => {
    setValues({ ...values, [data]: e.target.value });
  };

  const createForm = () => {
    return (
      <div>
        <h3>Create New Student </h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group pt-4">
            <label htmlFor="firstname">Firstname: </label>
            <input
              type="text"
              required
              className="form-control"
              value={values.firstName}
              onChange={handleChange("firstName")}
            />
          </div>
          <div className="form-group pt-4">
            <label htmlFor="lastname">Lastname: </label>
            <input
              type="text"
              required
              className="form-control"
              value={values.lastName}
              onChange={handleChange("lastName")}
            />
          </div>
          <div className="form-group pt-4">
            <label htmlFor="studentID"> Student ID: </label>
            <input
              type="number"
              required
              className="form-control"
              value={values.studentID}
              onChange={handleChange("studentID")}
            />
          </div>
          <div className="form-group pt-4">
            <label htmlFor="level">Level: </label>
            <input
              type="text"
              required
              className="form-control"
              value={values.level}
              onChange={handleChange("level")}
            />

            <div className="form-group pt-4">
              <label htmlFor="analysis">Analysis: </label>
              <select
                className="form-control ps-0"
                onChange={(e) => {
                  const selectedOption = e.target.value;
                  setAnalysis(selectedOption);
                }}
              >
                <option value="Telegram">Telegram</option>
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
                <option value="Banner">Banner</option>
                <option value="Friends">Friends</option>
              </select>

              <div className="form-group pt-4">
                <label htmlFor="date">Date: </label>
                <DatePicker
                  value={values.date}
                  selected={values.date}
                  onChange={handleChange("date")}
                />
              </div>
            </div>
          </div>
          <div className="form-group pt-4">
            <input
              type="submit"
              value="Create Student"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  };

  return <>{createForm()}</>;
};

export default CreateStudent;
