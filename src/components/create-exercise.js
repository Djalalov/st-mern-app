import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeStudentname = this.onChangeStudentname.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      studentname: "",
      description: "",
      duration: "",
      date: new Date(),
      students: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/students/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            students: response.data.map((student) => student.studentname),
            studentname: response.data[0].studentname,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeStudentname(e) {
    this.setState({
      studentname: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeDate(e) {
    this.setState({
      date: this.state.date,
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      studentname: this.state.studentname,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };
    console.log(exercise);

    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then((res) => console.log(res.data));
    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group pt-4 pb-4">
            <label>Studentname: </label>
            <select
              ref="studentInput"
              required
              className="form-control"
              value={this.state.studentname}
              onChange={this.onChangeStudentname}
            >
              {this.state.students.map(function (student) {
                return (
                  <option key={student} value={student}>
                    {student}{" "}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group pb-4">
            <label> Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group pb-4">
            <label>Duration (in minutes): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group pb-4">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
