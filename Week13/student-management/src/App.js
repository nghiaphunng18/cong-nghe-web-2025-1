import React from "react";
import StudentListPage from "./pages/StudentListPage";
import EditStudentPage from "./pages/EditStudentPage";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header>
        <h2>Ứng Dụng Quản Lý Học Sinh</h2>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<StudentListPage />} />
          <Route path="/edit/:id" element={<EditStudentPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
