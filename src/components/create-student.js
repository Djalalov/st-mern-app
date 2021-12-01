import React, { useState } from "react";
import axios from "axios";

export default function CreateStudent(props) {
  const [studentname, setStudentname] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const student = { studentname };

    axios
      .post("http://localhost:5000/students/add", student)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    console.log(student);

    setStudentname("");
  };

  const onChangeStudentName = (e) => {
    setStudentname(e.target.value);
  };

  return (
    <div>
      <h3>Create New Student </h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="studentname">Studentname: </label>
          <input
            type="text"
            required
            className="form-control"
            value={studentname}
            onChange={onChangeStudentName}
          />
        </div>
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
