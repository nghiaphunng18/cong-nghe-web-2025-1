// src/pages/StudentListPage.js
import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddStudentForm from "../components/AddStudentForm";

const API_URL = "http://localhost:5000/api/students";

const StudentListPage = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchStudents = useCallback(() => {
    setLoading(true);
    axios
      .get(`${API_URL}?name=${searchTerm}`)
      .then((response) => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error: ", error);
        setLoading(false);
      });
  }, [searchTerm]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleDelete = (id, name) => {
    if (!window.confirm(`Are you sure you want to delete student ${name}?`))
      return;

    axios
      .delete(`${API_URL}/${id}`)
      .then((res) => {
        console.log(res.data.message);
        // update state
        setStudents((prevList) => prevList.filter((s) => s._id !== id));
      })
      .catch((err) => console.error("Lỗi khi xóa:", err));
  };

  const sortedStudents = useMemo(() => {
    const list = [...students];

    list.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (nameA < nameB) return sortAsc ? -1 : 1;
      if (nameA > nameB) return sortAsc ? 1 : -1;
      return 0;
    });
    return list;
  }, [students, sortAsc]);

  return (
    <>
      <AddStudentForm
        onStudentAdded={(newStu) => setStudents((prev) => [...prev, newStu])}
      />

      <div className="card list-controls">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button
          onClick={() => setSortAsc((prev) => !prev)}
          className="btn-secondary"
        >
          {sortAsc ? "Sắp xếp Tên A → Z" : "Sắp xếp Tên Z → A"}
        </button>
      </div>

      <div className="card student-list">
        <h3>Danh sách học sinh</h3>
        {loading && <p>Đang tải dữ liệu...</p>}
        {!loading && students.length === 0 ? (
          <p>Chưa có học sinh nào trong cơ sở dữ liệu.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Họ tên</th>
                <th>Tuổi</th>
                <th>Lớp</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {sortedStudents.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.class}</td>
                  <td>
                    <Link
                      to={`/edit/${student._id}`}
                      className="btn-action edit"
                    >
                      Sửa
                    </Link>
                    <button
                      onClick={() => handleDelete(student._id, student.name)}
                      className="btn-action delete"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default StudentListPage;
