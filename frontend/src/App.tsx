import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import SidebarLayout from "./components/SidebarLayout";
import Dashboard from "./pages/Dashboard";
import Journal from "./pages/Journal";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect } from "react";
import Cookies from "js-cookie";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const cookies = Cookies.get("token");

    if (
      !cookies &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
    ) {
      navigate("/login");
      // Redirect to the dashboard if cookies exists
    } else if (
      cookies &&
      (location.pathname === "/login" || location.pathname === "/register")
    ) {
      navigate("/");
    }
  }, [navigate, location]);

  return (
    <Routes>
      <Route element={<SidebarLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/journal" element={<Journal />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
