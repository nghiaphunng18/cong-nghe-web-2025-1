import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/students";

const AddStudentForm = ({ onStudentAdded }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stuClass, setStuClass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newStu = {
      name,
      age: Number(age),
      class: stuClass,
    };

    axios
      .post(API_URL, newStu)
      .then((res) => {
        onStudentAdded(res.data);
        // Reset form
        setName("");
        setAge("");
        setStuClass("");
        alert(`Add student ${res.data.name} successfully!`);
      })
      .catch((err) =>
        console.error(
          "Error: ",
          err.response ? err.response.data.error : err.message
        )
      );
  };

  return (
    <div className="card add-form">
      <h3>Thêm học sinh mới</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Họ tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Tuổi"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          min="1"
        />
        <input
          type="text"
          placeholder="Lớp"
          value={stuClass}
          onChange={(e) => setStuClass(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary">
          Thêm học sinh
        </button>
      </form>
    </div>
  );
};

export default AddStudentForm;
