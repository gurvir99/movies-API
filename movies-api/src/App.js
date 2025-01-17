import "./App.css";
import Nav from './components/nav';
import Home from './components/home';
import About from './components/about';
import Projects from './components/projects';
import {BrowserRouter as Router, Routes, Route} from "react-router";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
