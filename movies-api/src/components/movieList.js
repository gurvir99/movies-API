import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import Card from "../components/card";
import axios from "axios";
import "../componentsStyles/movieList.css";

function MovieList() {
  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") || "";

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     try {
  //       if (searchTerm) {
  //         const res = await fetch(
  //           `/api/tmdb/search?query=${encodeURIComponent(searchTerm)}`
  //         );
  //         const data = await res.json();
  //         setMovieList(data.results || []);
  //       } else {
  //         const movieType = type || "now_playing";
  //         const res = await fetch(`/api/tmdb/type/${movieType}`);
  //         const data = await res.json();
  //         setMovieList(data.results || []);
  //       }
  //     } catch (err) {
  //       console.error("Error fetching movie data:", err);
  //       setMovieList([]);
  //     }
  //   };

  //   fetchMovies();
  // }, [type, searchTerm]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (searchTerm) {
          const res = await API.get(`/api/tmdb/search`, {
            params: { query: searchTerm },
          });
          setMovieList(res.data.results || []);
        } else {
          const movieType = type || "now_playing";
          const res = await API.get(`/api/tmdb/type/${movieType}`);
          setMovieList(res.data.results || []);
        }
      } catch (err) {
        console.error("Error fetching movie data:", err);
        setMovieList([]);
      }
    };

    fetchMovies();
  }, [type, searchTerm, API]);

  // Log the movieList parameter data
  console.log("movieList:", movieList);

  // Handle search form submit
  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.elements.search.value;
    setSearchParams(value ? { q: value } : {});
  };

  return (
    <div className="movie__list">
      <div className="list-header-row">
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
