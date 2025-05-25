import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import Card from "../components/card";
import "../componentsStyles/movieList.css";

function MovieList() {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") || "";

  // Fetch movies based on type or search term
  useEffect(() => {
    if (searchTerm) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=0a14e28062847d0d8d59959339cfbc66&query=${encodeURIComponent(
          searchTerm
        )}`
      )
        .then((res) => res.json())
        .then((data) => setMovieList(data.results || []));
    } else {
      fetch(
        `https://api.themoviedb.org/3/movie/${
          type ? type : "now_playing"
        }?api_key=0a14e28062847d0d8d59959339cfbc66`
      )
        .then((res) => res.json())
        .then((data) => setMovieList(data.results));
    }
  }, [type, searchTerm]);

  // Handle search form submit
  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.elements.search.value;
    setSearchParams(value ? { q: value } : {});
  };

  return (
    <div className="movie__list">     
      <div className="list-header-row" >
        <h2 className="list__title">
          {(type ? type : "NOW PLAYING").toUpperCase()} MOVIES
        </h2>
        <form className="search-container" onSubmit={handleSearch}>
          <input
            className="search-input"
            type="text"
            name="search"
            placeholder="Search..."
            aria-label="Search"
            defaultValue={searchTerm}
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
      </div>    
      <div className="list__cards">
        {movieList.map((movie) => (
          <Card movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieList;