import { useState } from "react";
import { api } from "../api/api";
import { Container, Form, Button, Alert } from "react-bootstrap";

export default function LoginPage({ onLogin }) {
  const [studentNumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      const res = await api.post("/auth/login", { studentNumber, password });
      onLogin(res.data.user);
    } catch (error) {
      setErr(error?.response?.data?.message || "Login failed");
    }
  }

  return (
    <Container style={{ maxWidth: 420, marginTop: 60 }}>
      <h3>Login</h3>
      {err && <Alert variant="danger">{err}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Student Number</Form.Label>
          <Form.Control value={studentNumber} onChange={(e) => setStudentNumber(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
}