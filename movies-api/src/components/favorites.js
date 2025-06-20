import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Card from "../components/card";
import '../componentsStyles/favorites.css';

function Favorites() {
  const { isLoggedIn } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get("/api/favorites/getFavorites", {
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
  }, [isLoggedIn]);

  if (!isLoggedIn) return <div>Please log in to view your favorites.</div>;
  if (loading) return <div>Loading...</div>;


    return (
      <div style={{ color: 'white' }}>
        <div className="favorites-container">
          <h2 className="favorites-title">MY FAVORITES</h2>
          {favorites.length === 0 ? (
            <p className="empty_title">The movies you add to favourites will show up here.</p>
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
