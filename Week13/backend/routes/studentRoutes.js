const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// GET /api/students
router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    let query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    const students = await Student.find(query);
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Error: " + err.message });
  }
});

// GET /api/students/:id
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Not found student" });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: "Error: " + err.message });
  }
});

// POST /api/students
router.post("/", async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// PUT /api/students/:id
router.put("/:id", async (req, res) => {
  try {
    const updatedStu = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedStu) {
      return res.status(404).json({ error: "Not found student" });
    }
    res.json(updatedStu);
  } catch (err) {
    res.status(400).json({ error: "Error: " + err.message });
  }
});

// DELETE /api/students/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Not found student" });
    }
    res.json({ message: "Student deleted successfully", id: deleted._id });
  } catch (err) {
    res.status(500).json({ error: "Error: " + err.message });
  }
});

module.exports = router;
