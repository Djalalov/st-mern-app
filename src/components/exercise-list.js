import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.studentname}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link
        className="btn btn-warning btn-sm bg-gradient text-white rounded-2"
        to={"/edit/" + props.exercise._id}
      >
        <FaEdit />
      </Link>
      <button
        className="btn btn-danger btn-sm bg-gradient text-white rounded-2 mx-2"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        <BsTrash />
      </button>
    </td>
  </tr>
);

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = { exercises: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises/")
      .then((response) => {
        this.setState({ exercises: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteExercise(id) {
    axios.delete("http://localhost:5000/exercises/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  }

  exerciseList() {
    return this.state.exercises.map((currentexercise) => {
      return (
        <Exercise
          exercise={currentexercise}
          deleteExercise={this.deleteExercise}
          key={currentexercise._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3 className="pb-3 pt-3">Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Studentname</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
