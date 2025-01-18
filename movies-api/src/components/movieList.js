import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Card from "../components/card";
import "../componentsStyles/movieList.css";

function MovieList() {

  const [movieList, setMovieList] = useState([]);

  //to check parameter :type after /movies in the path
  const { type } = useParams();

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        type ? type : "now_playing"
      }?api_key=0a14e28062847d0d8d59959339cfbc66`
    )
      .then((res) => res.json())
      .then((data) => setMovieList(data.results));
  };

//   useEffect(() => {
//     getData();
//   }, []);

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <div className="movie__list">
      <h2 className="list__title">{(type ? type : "NOW PLAYING").toUpperCase()} MOVIES</h2>
      <div className="list__cards">
        {movieList.map((movie) => (
          <Card movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
