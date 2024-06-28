import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SidebarLayout from "./components/SidebarLayout";
import Dashboard from "./pages/Dashboard";
import Journal from "./pages/Journal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SidebarLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/journal" element={<Journal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
