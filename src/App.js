import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Login from "./Components/Pages/Login";
import AboutUs from "./Components/Pages/AboutUs";
import Portal from "./Components/Pages/Portal";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/portal" element={<Portal />} />
    </Routes>
  );
}

export default App;
