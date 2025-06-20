const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth'); // JWT middleware

// Get favorites
router.get('/getFavorites', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.favorites);
});

// Add to favorites
router.post('/addFavorite', auth, async (req, res) => {
  const { id, title, poster_path, overview, release_date, vote_average } = req.body;

  const user = await User.findById(req.user.id);

  const alreadyAdded = user.favorites.some(fav => fav.id.toString() === id.toString());
  if (alreadyAdded) return res.status(400).json({ error: 'Already in Favorites' });

  user.favorites.push({ id, title, poster_path, overview, release_date, vote_average});
  await user.save();

  res.json({ message: 'Added to favorites' });
});

router.delete('/removeFavorite/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.favorites = user.favorites.filter(fav => fav.id.toString() !== req.params.id.toString());
    await user.save();
    res.json({ message: 'Removed from favourites' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove from favourites' });
  }
});

module.exports = router;