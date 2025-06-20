//import { useEffect, useState } from "react";
import "../componentsStyles/home.css";
import MovieList from "./movieList";

function Home() {
  // const [nowPlayingMovies, setnowPlayingMovies] = useState([]);

  // useEffect(() => {
  //   fetch(
  //     "https://api.themoviedb.org/3/movie/now_playing?api_key=0a14e28062847d0d8d59959339cfbc66"
  //   )
  //     .then((res) => res.json())
  //     // .then(data => console.log(data))
  //     // .then(data => console.log(data.results))
  //     .then((data) => setnowPlayingMovies(data.results));
  // }, []);

  return (
    <div className="home">
      <MovieList />
    </div>
  );
}

export default Home;

