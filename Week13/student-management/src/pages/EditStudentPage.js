import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/students";

const EditStudentPage = () => {
  const { id } = useParams(); // get id
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stuClass, setStuClass] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // get information current student
  useEffect(() => {
    axios
      .get(`${API_URL}/${id}`)
      .then((res) => {
        setName(res.data.name);
        setAge(res.data.age);
        setStuClass(res.data.class);
        setLoading(false);
      })
      .catch((err) => {
        setError("No student found or connection error.");
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedStu = { name, age: Number(age), class: stuClass };

    axios
      .put(`${API_URL}/${id}`, updatedStu)
      .then((res) => {
        alert(`Update student ${res.data.name} successfully!`);
        navigate("/"); // return home
      })
      .catch((err) =>
        console.error(
          "Error: ",
          err.response ? err.response.data.error : err.message
        )
      );
  };

  if (loading)
    return <div className="loading-state">Đang tải thông tin...</div>;
  if (error) return <div className="error-state">{error}</div>;

  return (
    <div className="card edit-form">
      <h3>✏️ Chỉnh sửa Học sinh: {name}</h3>
      <form onSubmit={handleUpdate}>
        <label>
          Họ tên:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Tuổi:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            min="1"
          />
        </label>
        <label>
          Lớp:
          <input
            type="text"
            value={stuClass}
            onChange={(e) => setStuClass(e.target.value)}
            required
          />
        </label>
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Cập nhật
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn-secondary"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStudentPage;
