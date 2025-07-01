import { useEffect, useState } from "react";
import { useParams } from "react-router";
import React, { useContext } from "react";
import "../componentsStyles/movie.css";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';

function Movie() {

  const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
 });

  const { isLoggedIn } = useContext(AuthContext);
  const [isFavourite, setIsFavourite] = useState(false);

  const [currentMovieDetail, setMovie] = useState();
  const [currentMovieCredits, setCredits] = useState();
  const [currentMovieVideos, setVideos] = useState();
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getData();
    getCredits();
    getVideos();
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=0a14e28062847d0d8d59959339cfbc66`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data));
  };

  const getCredits = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=0a14e28062847d0d8d59959339cfbc66`
    )
      .then((res) => res.json())
      .then((data) =>
        setCredits(Object.fromEntries(Object.entries(data.cast).slice(0, 5)))
      );
  };

  //to iterate cast members object
  const numbers = [1, 2, 3, 4, 5];

  const getVideos = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=0a14e28062847d0d8d59959339cfbc66`
    )
      .then((res) => res.json())
      .then((data) => setVideos(data));
  };

  //initialize trailer url
  var trailer_url = "";

  //check if url data exists
  if (currentMovieVideos && currentMovieVideos.results) {
    let link = "https://www.youtube.com/embed/";
    let trailer_key = "";
    if (currentMovieVideos.results[currentMovieVideos.results.length - 2]) {
      trailer_key =
        currentMovieVideos.results[currentMovieVideos.results.length - 1].key;
    } else {
      trailer_key =
        currentMovieVideos.results[currentMovieVideos.results.length - 1].key;
    }
    trailer_url = link.concat(trailer_key);
    trailer_url = trailer_url.concat("?modestbranding=1&rel=0");
  }

  useEffect(() => {
    // Check if this movie is already in favourites (optional: only if user is logged in)
    const fetchFavourites = async () => {
      if (isLoggedIn) {
        try {
          const res = await API.get("/api/favorites/getFavorites", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setIsFavourite(
            res.data.some(
              (fav) => fav.id.toString() === currentMovieDetail.id.toString()
            )
          );
        } catch (err) {
          // handle error if needed
        }
      }
    };
    fetchFavourites();
  }, [isLoggedIn, currentMovieDetail]);

  const handleAddToFavourites = async () => {
    try {
      await API.post(
        "/api/favorites/addFavorite",
        {
          id: currentMovieDetail.id,
          title: currentMovieDetail.title,
          poster_path: currentMovieDetail.poster_path,
          overview: currentMovieDetail.overview,
          release_date: currentMovieDetail.release_date,
          vote_average: currentMovieDetail.vote_average,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Added To Watchlist!");
      setIsFavourite(true);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed To Add To Watchlist");
    }
  };

  const handleRemoveFromFavourites = async () => {
    try {
      await API.delete(
        `/api/favorites/removeFavorite/${currentMovieDetail.id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Removed From Watchlist!");
      setIsFavourite(false);
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Failed To Remove From Watchlist"
      );
    }
  };

  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          alt="movie_poster"
          className="movie__backdrop"
          src={`https://image.tmdb.org/t/p/original${
            currentMovieDetail ? currentMovieDetail.backdrop_path : ""
          }`}
        />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__detailLeftTop">
            <div className="movie__name">
              {currentMovieDetail ? currentMovieDetail.title : ""}
            </div>
            <div className="movie__rating">
              {currentMovieDetail
                ? parseFloat(currentMovieDetail.vote_average).toFixed(1)
                : ""}{" "}
              <i class="fa-regular fa-star-half-stroke"></i>
            </div>
            <div className="movie__runtime">
              {currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}
            </div>
            <div className="movie__releaseDate">
              {currentMovieDetail
                ? "Release date: " + currentMovieDetail.release_date
                : ""}
            </div>
            <div className="movie__genres">
              {currentMovieDetail && currentMovieDetail.genres
                ? currentMovieDetail.genres.map((genre) => (
                    <>
                      <span className="movie__genre" id={genre.id}>
                        {genre.name}
                      </span>
                    </>
                  ))
                : ""}
            </div>
            <div className="movie__links">
              {currentMovieDetail && currentMovieDetail.imdb_id && (
                <a
                  className="imdb__link"
                  href={
                    "https://www.imdb.com/title/" + currentMovieDetail.imdb_id
                  }
                  target="_blank"
                  style={{ textDecoration: "none" }}
                  rel="noreferrer"
                >
                  <button className="movie__homeButton movie__Button">
                    Check IMDb
                  </button>
                  {/* <p>
                    <span className="movie__homeButton movie__Button">
                      More Info
                    </span>
                  </p> */}
                </a>
              )}

              {isLoggedIn &&
                (isFavourite ? (
                  <button
                    className="fav__Button"
                    onClick={handleRemoveFromFavourites}
                  >
                    Remove From Watchlist
                  </button>
                ) : (
                  <button
                    className="fav__Button"
                    onClick={handleAddToFavourites}
                  >
                    Add To Watchlist
                  </button>
                ))}

                <button
                    className="fav__Button"
                    onClick={() => navigate(`/movie/${currentMovieDetail.id}/review`)}
                  >
                    Reviews
                  </button>




            </div>
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="synopsisText">Synopsis</div>
          <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
        </div>
      </div>

      <div className="cast__list">
        <h2 className="cast__title">CAST</h2>
        <div className="cast__cards">
          {numbers.map((number, index) => (
            <>
              <div className="cast">
                <img
                  alt="card"
                  className="cast__img"
                  src={`https://image.tmdb.org/t/p/original${
                    currentMovieCredits
                      ? currentMovieCredits[index].profile_path
                      : ""
                  }`}
                />
                <div className="cast__actor">
                  {currentMovieCredits
                    ? currentMovieCredits[index].original_name
                    : ""}
                </div>
                <div className="cast__character">
                  {currentMovieCredits
                    ? currentMovieCredits[index].character
                    : ""}
                </div>
              </div>
            </>
          ))}
        </div>
      </div>

      <div className="trailer">
        <h2 className="cast__title">MEDIA</h2>
        <iframe
          title="Trailer"
          width="900px"
          height="600px"
          src={trailer_url}
          frameborder="0"
          allow="fullscreen"
        >
          {" "}
        </iframe>
      </div>
    </div>
  );
}

export default Movie;
