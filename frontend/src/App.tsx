import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Get from "./pages/Get";
import Post from "./pages/Post";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Get />}></Route>
        <Route path="/get" element={<Get />}></Route>
        <Route path="/post" element={<Post />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
