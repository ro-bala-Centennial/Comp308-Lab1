import { useEffect, useState } from "react";
import { api } from "../api/api";
import { Container, Button, Form, Table, Alert } from "react-bootstrap";

export default function StudentDashboard({ user, onLogout }) {
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [newSection, setNewSection] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function refresh() {
    setErr(""); setMsg("");
    const my = await api.get("/api/enroll/my-courses");
    setCourses(my.data.courses);

    const all = await api.get("/api/courses");
    setAllCourses(all.data.courses);
  }

  useEffect(() => { refresh(); }, []);

  async function addCourse() {
    setErr(""); setMsg("");
    try {
      await api.post("/api/enroll/add", { courseId });
      setMsg("Enrolled!");
      refresh();
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed");
    }
  }

  async function updateSection() {
    setErr(""); setMsg("");
    try {
      await api.put("/api/enroll/update", { courseId, newSection });
      setMsg("Section updated!");
      refresh();
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed");
    }
  }

  async function dropCourse(id) {
    setErr(""); setMsg("");
    try {
      await api.post("/api/enroll/drop", { courseId: id });
      setMsg("Dropped!");
      refresh();
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed");
    }
  }

  return (
    <Container style={{ marginTop: 40 }}>
      <h3>Student Dashboard</h3>
      <div className="mb-3">Logged in as: <b>{user.studentNumber}</b></div>

      {msg && <Alert variant="success">{msg}</Alert>}
      {err && <Alert variant="danger">{err}</Alert>}

      <Button variant="secondary" className="mb-4" onClick={onLogout}>Logout</Button>

      <h5>Add / Update / Drop Course</h5>

      <Form.Select className="mb-2" value={courseId} onChange={(e) => setCourseId(e.target.value)}>
        <option value="">Select a course...</option>
        {allCourses.map((c) => (
          <option key={c._id} value={c._id}>
            {c.code} - {c.name} (Section {c.section})
          </option>
        ))}
      </Form.Select>

      <div className="d-flex gap-2 mb-3">
        <Button onClick={addCourse} disabled={!courseId}>Add Course</Button>

        <Form.Control
          placeholder="New Section (ex: 002)"
          value={newSection}
          onChange={(e) => setNewSection(e.target.value)}
          style={{ maxWidth: 220 }}
        />
        <Button onClick={updateSection} disabled={!courseId || !newSection}>Update Section</Button>
      </div>

      <h5>My Courses</h5>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Code</th><th>Name</th><th>Section</th><th>Semester</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c._id}>
              <td>{c.code}</td>
              <td>{c.name}</td>
              <td>{c.section}</td>
              <td>{c.semester}</td>
              <td><Button variant="danger" size="sm" onClick={() => dropCourse(c._id)}>Drop</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}