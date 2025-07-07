const express = require("express");
const axios = require("axios");
const router = express.Router();

const TMDB_API_KEY = process.env.TMDB_API_KEY;

// GET /api/tmdb/movie/:id
router.get("/movie/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: { api_key: TMDB_API_KEY },
    });

    res.json(response.data);
  } catch (error) {
    console.error("TMDb Movie Fetch Error:", error.message);
    res.status(500).json({ error: "Failed to fetch movie data" });
  }
});

// GET /api/tmdb/movie/:id/credits
router.get("/movie/:id/credits", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
      params: { api_key: TMDB_API_KEY },
    });

    res.json(response.data);
  } catch (error) {
    console.error("TMDb Credits Fetch Error:", error.message);
    res.status(500).json({ error: "Failed to fetch credits" });
  }
});

// GET /api/tmdb/movie/:id/videos
router.get("/movie/:id/videos", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
      params: { api_key: TMDB_API_KEY },
    });

    res.json(response.data);
  } catch (error) {
    console.error("TMDb Videos Fetch Error:", error.message);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});


router.get("/search", async (req, res) => {
  const { query } = req.query;

  try {
    const response = await axios.get("https://api.themoviedb.org/3/search/movie", {
      params: {
        api_key: TMDB_API_KEY,
        query: query,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("TMDb Search Error:", error.message);
    res.status(500).json({ error: "Failed to search movies" });
  }
});

router.get("/type/:type", async (req, res) => {
  const { type } = req.params;

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${type}`, {
      params: { api_key: TMDB_API_KEY },
    });

    res.json(response.data);
  } catch (error) {
    console.error("TMDb Type Fetch Error:", error.message);
    res.status(500).json({ error: "Failed to fetch movie type" });
  }
});



module.exports = router;
