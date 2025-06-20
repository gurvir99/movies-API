import "./App.css";
import Nav from "./components/nav";
import Home from "./components/home";
import MovieList from "./components/movieList";
import Movie from "./components/movie";
import Favorites from "./components/favorites";
import Signup from "./components/signup";
import PrivateRoute from './components/privateRoute';
import { BrowserRouter as Router, Routes, Route } from "react-router";

function App() {
  return (
    <Router>
      <div className="main">
        <Nav />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/auth" element={<Signup />} />
          <Route path="movie/:id" element={<Movie />}></Route>
          <Route path="movies/:type" element={<MovieList />}></Route>

          <Route path="/favorites" element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }/>

        </Routes>
        <footer>
          <p>2025 Copyright &#169; Cine Prime</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
