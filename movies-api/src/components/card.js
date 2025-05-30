import { useEffect, useState } from "react";
import "../componentsStyles/card.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router";

function Card({ movie }) {

  const [isLoading, setisLoading] = useState(true)  

  useEffect(() => {
    setTimeout(() => {
        setisLoading(false)
    }, 1500)
  }, [])

  return (

    isLoading
    ?
    <div className="cards">
        <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
        </SkeletonTheme>
    </div>
    :
    <Link to={`/movie/${movie.id}`} style={{textDecoration:"none", color:"white"}}>
        <div className="cards">
            <img alt="card" className="cards__img" src={`https://image.tmdb.org/t/p/original${movie?movie.poster_path:""}`} />
            <div className="cards__overlay">
                <div className="card__title">{movie?movie.title:""}</div>
                    <div className="card__runtime">
                        {movie?movie.release_date:""}
                        <span className="card__rating">{movie?parseFloat(movie.vote_average).toFixed(1):""}<i class="fa-regular fa-star-half-stroke"></i></span>
                    </div>
                 <div className="card__description">{movie ? movie.overview.slice(0,118)+"..." : ""}</div>
            </div>
        </div>
    </Link>
        

  )
}

export default Card;
