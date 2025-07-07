import "./App.css";
import Nav from "./components/nav";
import Home from "./components/home";
import MovieList from "./components/movieList";
import Movie from "./components/movie";
import Favorites from "./components/favorites";
import Signup from "./components/signup";
import PrivateRoute from "./components/privateRoute";
import Review from "./components/review";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Toaster } from "sonner";

function App() {
  return (
    <Router>
      <div className="main">
        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            class: "!bg-white !text-gray-900 !border !border-gray-200",
            style: {
              fontSize: "1.25rem", // same as text-xl
            },
          }}
        />
        <Nav />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/auth" element={<Signup />} />
          <Route path="movie/:id" element={<Movie />}></Route>
          <Route path="movies/:type" element={<MovieList />}></Route>

          <Route
            path="/movie/:id/review"
            element={
              
                <Review />
              
            } 
          />


          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
        </Routes>
        <footer>
          <p>2025 Copyright &#169; Cine Prime</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
