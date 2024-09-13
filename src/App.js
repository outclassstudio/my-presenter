import Home from "./pages/home";
import Main from "./reveal/main";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Main />} path="/reveal" />
      </Routes>
    </Router>
  );
}
