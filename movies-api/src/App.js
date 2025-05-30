import "./App.css";
import Nav from "./components/nav";
import Home from "./components/home";
import MovieList from "./components/movieList";
import Search from "./components/search";
import Movie from "./components/movie";
import { BrowserRouter as Router, Routes, Route } from "react-router";

function App() {
  return (
    <Router>
      <div className="main">
        <Nav />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="movie/:id" element={<Movie />}></Route>
          <Route path="movies/:type" element={<MovieList />}></Route>
          <Route path="search" element={<Search />}></Route>
        </Routes>
        <footer>
          <p>2025 Copyright &#169; Cine Prime</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
