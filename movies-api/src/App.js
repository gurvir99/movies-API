import "./App.css";
import Nav from './components/nav';
import Home from './components/home';
import MovieList from "./components/movieList";
import {BrowserRouter as Router, Routes, Route} from "react-router";

function App() {
  return (
    <Router>
      <div className="main">
        <Nav />
        <Routes>
          <Route path="/" exact element={<Home />} />
          {/* <Route path="movie/:id" element={<Movie />}></Route> */}
          <Route path="movies/:type" element={<MovieList />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
