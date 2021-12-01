import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar";
import ExerciseList from "./components/exercise-list";
import EditExercise from "./components/edit-exercise";
import CreateExercise from "./components/create-exercise";
import CreateStudent from "./components/create-student";

function App() {
  return (
    <div>
      <Navbar />
      <br />
      <Routes>
        <Route path="/" exact element={<ExerciseList />} />
        <Route path="/edit/:id" element={<EditExercise />} />
        <Route path="/create-exercise" element={<CreateExercise />} />
        <Route path="/create-student" element={<CreateStudent />} />
      </Routes>
    </div>
  );
}

export default App;
