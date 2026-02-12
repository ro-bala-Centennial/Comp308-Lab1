import { useEffect, useState } from "react";
import { api } from "./api/api";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  const [user, setUser] = useState(null);

  async function loadMe() {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    } catch {
      setUser(null);
    }
  }

  useEffect(() => { loadMe(); }, []);

  async function logout() {
    await api.post("/auth/logout");
    setUser(null);
  }

  if (!user) return <LoginPage onLogin={(u) => setUser(u)} />;

  if (user.isAdmin) return <AdminDashboard onLogout={logout} />;

  return <StudentDashboard user={user} onLogout={logout} />;
}