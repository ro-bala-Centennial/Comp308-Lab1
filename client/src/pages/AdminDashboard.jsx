import { useEffect, useState } from "react";
import { api } from "../api/api";
import { Container, Button, Form, Table, Alert } from "react-bootstrap";

export default function AdminDashboard({ onLogout }) {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [courseStudents, setCourseStudents] = useState([]);

  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  // Student form
  const [form, setForm] = useState({
    studentNumber: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    phoneNumber: "",
    email: "",
    program: "",
    favoriteTopic: "",
    strongestSkill: "",
    isAdmin: false,
  });

  // Course form (NEW)
  const [courseForm, setCourseForm] = useState({
    code: "",
    name: "",
    section: "",
    semester: "",
  });

  async function refresh() {
    try {
      const st = await api.get("/api/students");
      setStudents(st.data.students);

      const cr = await api.get("/api/courses");
      setCourses(cr.data.courses);
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to load data");
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function addStudent(e) {
    e.preventDefault();
    setErr("");
    setMsg("");
    try {
      await api.post("/api/students", form);
      setMsg("Student created!");
      setForm({
        ...form,
        studentNumber: "",
        password: "",
        firstName: "",
        lastName: "",
      });
      refresh();
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Failed to create student");
    }
  }

  // Create Course (NEW)
  async function addCourse(e) {
    e.preventDefault();
    setErr("");
    setMsg("");
    try {
      await api.post("/api/courses", courseForm);
      setMsg("Course created!");
      setCourseForm({ code: "", name: "", section: "", semester: "" });
      refresh();
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Failed to create course");
    }
  }

  async function loadStudentsInCourse() {
    setErr("");
    setMsg("");
    try {
      const res = await api.get(`/api/courses/${courseId}/students`);
      setCourseStudents(res.data.students);
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to load students in course");
    }
  }

  return (
    <Container style={{ marginTop: 40 }}>
      <h3>Admin Dashboard</h3>

      {msg && <Alert variant="success">{msg}</Alert>}
      {err && <Alert variant="danger">{err}</Alert>}

      <Button variant="secondary" className="mb-4" onClick={onLogout}>
        Logout
      </Button>

      {/* ===================== Add Student ===================== */}
      <h5>Add Student</h5>
      <Form onSubmit={addStudent} className="mb-4">
        <div className="d-flex gap-2 mb-2">
          <Form.Control
            placeholder="Student Number"
            value={form.studentNumber}
            onChange={(e) => setForm({ ...form, studentNumber: e.target.value })}
          />
          <Form.Control
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <div className="d-flex gap-2 mb-2">
          <Form.Control
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
          <Form.Control
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
        </div>

        <div className="d-flex gap-2 mb-2">
          <Form.Control
            placeholder="Program"
            value={form.program}
            onChange={(e) => setForm({ ...form, program: e.target.value })}
          />
          <Form.Check
            type="checkbox"
            label="Is Admin"
            checked={form.isAdmin}
            onChange={(e) => setForm({ ...form, isAdmin: e.target.checked })}
          />
        </div>

        <Button type="submit">Create Student</Button>
      </Form>

      {/* ===================== Students List ===================== */}
      <h5>Students List</h5>
      <Table striped bordered className="mb-4">
        <thead>
          <tr>
            <th>Student #</th>
            <th>Name</th>
            <th>Program</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.studentNumber}</td>
              <td>
                {s.firstName} {s.lastName}
              </td>
              <td>{s.program}</td>
              <td>{String(s.isAdmin)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* ===================== Create Course (NEW) ===================== */}
      <h5>Create Course</h5>
      <Form onSubmit={addCourse} className="mb-4">
        <div className="d-flex gap-2 mb-2">
          <Form.Control
            placeholder="Course Code (ex: COMP308)"
            value={courseForm.code}
            onChange={(e) => setCourseForm({ ...courseForm, code: e.target.value })}
          />
          <Form.Control
            placeholder="Section (ex: 001)"
            value={courseForm.section}
            onChange={(e) => setCourseForm({ ...courseForm, section: e.target.value })}
          />
        </div>

        <div className="d-flex gap-2 mb-2">
          <Form.Control
            placeholder="Course Name (ex: Emerging Technologies)"
            value={courseForm.name}
            onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
          />
          <Form.Control
            placeholder="Semester (ex: Winter 2026)"
            value={courseForm.semester}
            onChange={(e) => setCourseForm({ ...courseForm, semester: e.target.value })}
          />
        </div>

        <Button type="submit">Create Course</Button>
      </Form>

      {/* ===================== Courses List ===================== */}
      <h5>Courses List</h5>
      <Table striped bordered className="mb-3">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Section</th>
            <th>Semester</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c._id}>
              <td>{c.code}</td>
              <td>{c.name}</td>
              <td>{c.section}</td>
              <td>{c.semester}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* ===================== Students in a Specific Course ===================== */}
      <h5>Students in a Specific Course</h5>
      <div className="d-flex gap-2 mb-2">
        <Form.Select value={courseId} onChange={(e) => setCourseId(e.target.value)}>
          <option value="">Select a course...</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.code} - {c.name} (Sec {c.section})
            </option>
          ))}
        </Form.Select>
        <Button onClick={loadStudentsInCourse} disabled={!courseId}>
          Load
        </Button>
      </div>

      <Table striped bordered>
        <thead>
          <tr>
            <th>Student #</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {courseStudents.map((s) => (
            <tr key={s._id}>
              <td>{s.studentNumber}</td>
              <td>
                {s.firstName} {s.lastName}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
