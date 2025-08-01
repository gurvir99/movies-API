import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Card from "../components/card";
import '../componentsStyles/favorites.css';

function Favorites() {

  const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  });

  const { isLoggedIn } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await API.get("/api/favorites/getFavorites", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setFavorites(res.data);
      } catch (err) {
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) fetchFavorites();
    else setLoading(false);
  }, [API, isLoggedIn]);

  if (!isLoggedIn) return <div>Please log in to view your watchlist.</div>;
  if (loading) return <div>Loading...</div>;


    return (
      <div style={{ color: 'white' }}>
        <div className="favorites-container">
          <h2 className="favorites-title">MY WATCHLIST</h2>
          {favorites.length === 0 ? (
            <p className="empty_title">The movies you add to your watchlist will show up here.</p>
          ) : (
            <div className="list__cards">
              {favorites.map((movie) => (
                <Card movie={movie} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
}

export default Favorites;
