import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style.css";
import "./mediaqueries.css";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProjectDetail from "./components/ProjectDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Profile />
              <Projects />
              <About />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route path="/project/:projectId" element={<ProjectDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
