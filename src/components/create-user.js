import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeStudentName = this.onChangeStudentName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      studentname: "",
    };
  }

  onChangeStudentName(e) {
    this.setState({
      studentname: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const student = {
      studentname: this.state.studentname,
    };

    console.log(student);

    axios
      .post("http://localhost:5000/users/add", student)
      .then((res) => console.log(res.data));

    this.setState({
      studentname: "",
    });
  }

  render() {
    return (
      <div>
        <h3>Create New Student </h3>
        <form className="form-group">
          <label>Studentname: </label>
          <input
            type="text"
            required
            className="form-control"
            value={this.state.studentname}
            onChange={this.onChangeStudentName}
          />
          <div className="form-group">
            <input
              type="submit"
              value="Create Student"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
