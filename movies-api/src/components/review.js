import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import "../componentsStyles/review.css";
import { FaStarHalfAlt } from "react-icons/fa";
import { toast } from "sonner";

function Reviews() {
  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const { id: movieId } = useParams(); // Get movieId from URL
  const { isLoggedIn } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [posterPath, setPosterPath] = useState("");
  const [movieTitle, setMovieTitle] = useState("");

  // Get logged in user's id and name from token
  let userId = null;
  //   let userName = null;
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userId = payload.id;
      //   userName = payload.name;
    }
  } catch (e) {}

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await API.get(`/api/tmdb/movie/${movieId}`);
        setPosterPath(res.data.backdrop_path);
        setMovieTitle(res.data.title);
      } catch (err) {
        setPosterPath("");
        setMovieTitle("Unknown Movie");
        console.error("Failed to fetch movie details:", err);
      }
    };
    fetchMovie();
  }, [movieId, API]);

  // Fetch all reviews for this movie
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await API.get(`/api/reviews/getReviews/movie/${movieId}`);
        setReviews(res.data);
      } catch (err) {
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [movieId, API]);

  // Add or update review
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (editingReviewId) {
        // Update review
        await API.put(
          `/api/reviews/updateReviews/${editingReviewId}`,
          { text: reviewText, rating: reviewRating },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Review Updated!");
      } else {
        // Add new review
        await API.post(
          "/api/reviews/addReviews",
          { movieId, text: reviewText, rating: reviewRating },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Review Added!");
      }
      setReviewText("");
      setReviewRating(5);
      setEditingReviewId(null);
      // Refresh reviews
      const res = await API.get(`/api/reviews/getReviews/movie/${movieId}`);
      setReviews(res.data);
    } catch (err) {
      //show error
      toast.error(
        err.response?.data?.error ||
          "Failed To Add/Update Review. Please try again."
      );
    }
  };

  // Edit review
  const handleEdit = (review) => {
    setEditingReviewId(review._id);
    setReviewText(review.text);
    setReviewRating(review.rating);
  };

  // Delete review
  const handleDelete = async (reviewId) => {
    const token = localStorage.getItem("token");
    try {
      await API.delete(`/api/reviews/deleteReviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(reviews.filter((r) => r._id !== reviewId));
      if (editingReviewId === reviewId) {
        setEditingReviewId(null);
        setReviewText("");
        setReviewRating(5);
      }
      toast.success("Review Deleted!");
    } catch (err) {
      toast.error(
        err.response?.data?.error ||
          "Failed To Delete Review. Please try again."
      );
    }
  };

  if (loading) return <div className="subheadings">Loading reviews...</div>;

  return (
    <div className="reviews-container">
      {posterPath && (
        <div className="movie__intro">
          <img
            alt="movie_poster"
            className="movie__backdrop"
            src={`https://image.tmdb.org/t/p/original${
              posterPath ? posterPath : ""
            }`}
          />
        </div>
      )}

      <h3 style={{ backgroundColor: "transparent", color: "#ffb347" }}>
        {movieTitle ? movieTitle : ""}
      </h3>
      {reviews.length === 0 ? (
        <p className="subheadings">No reviews yet...</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="review-card">
            <strong style={{ backgroundColor: "transparent" }}>
              {review.username}{" "}
              <FaStarHalfAlt
                style={{
                  backgroundColor: "transparent",
                  color: "#ffb347",
                  margin: "0 2px",
                  verticalAlign: "top",
                }}
              />
              {review.rating}/5
            </strong>{" "}
            {review.text}
            {userId === review.userId && (
              <span className="crud_icons">
                <FaEdit
                  className="review-action-icon"
                  title="Edit"
                  style={{
                    cursor: "pointer",
                    marginRight: 8,
                    background: "transparent",
                  }}
                  onClick={() => handleEdit(review)}
                />
                <FaTrash
                  className="review-action-icon"
                  title="Delete"
                  style={{ cursor: "pointer", backgroundColor: "transparent" }}
                  onClick={() => handleDelete(review._id)}
                />
              </span>
            )}
          </div>
        ))
      )}

      {isLoggedIn && (
        <>
          {/* <div style={{ color: "#ffb347", marginBottom: "0.5rem" }}>
            Logged in as: <strong>{userName}</strong>
          </div> */}
          <form className="review-form" onSubmit={handleSubmit}>
            <h4 style={{ backgroundColor: "transparent" }}>
              {editingReviewId ? "Edit Your Review" : "Add a Review"}
            </h4>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
              placeholder="Write your review..."
              rows={3}
            />
            <div className="rating-div">
              <label className="rating-label">
                Rating:{" "}
                <select
                  value={reviewRating}
                  onChange={(e) => setReviewRating(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <button type="submit" className="review-submit-btn">
              {editingReviewId ? "Update Review" : "Add Review"}
            </button>
            {editingReviewId && (
              <button
                type="button"
                className="review-cancel-btn"
                onClick={() => {
                  setEditingReviewId(null);
                  setReviewText("");
                  setReviewRating(5);
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </>
      )}
      {!isLoggedIn && (
        <p className="subheadings">Please log in to add a review.</p>
      )}
    </div>
  );
}

export default Reviews;
