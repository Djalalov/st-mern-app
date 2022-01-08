import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateStudent = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    studentID: 0,
    level: "",
    date: new Date(),
  });
  const [loading, setLoading] = useState(false);

  const marketingData = [
    { id: 0, value: "Telegram" },
    { id: 1, value: "Instagram" },
    { id: 2, value: "Banner" },
    { id: 3, value: "Friend" },
    { id: 4, value: "WebSite" },
  ];

  const [analysis, setAnalysis] = useState([]);

  useEffect(() => {
    setAnalysis(marketingData);
  }, []);

  console.log(analysis);

  const onSubmit = async (e) => {
    e.preventDefault();
    showLoading();

    const { firstName, lastName, studentID, level, date } = values;

    const student = {
      firstName,
      lastName,
      studentID,
      level,
      analysis,
      date,
    };

    try {
      await axios.post("http://localhost:5000/students/add", student);

      console.log(student);

      firstName("");
      lastName("");
      studentID(0);
      level("");
      analysis("");
      date(null);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (data) => (e) => {
    setValues({ ...values, [data]: e.target.value });
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";

  const createForm = () => {
    return (
      <div>
        <h3>Create New Student </h3>
        <form onSubmit={onSubmit}>
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
              <select className="form-control">
                {analysis.map((info, index) => (
                  <option key={info.id}>{info.value}</option>
                ))}
              </select>

              <div className="form-group pt-4">
                <label htmlFor="date">Date: </label>
                <DatePicker
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

  return <React.Fragment>{createForm()}</React.Fragment>;
};

export default CreateStudent;
