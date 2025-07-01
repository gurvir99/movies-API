const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const auth = require('../middleware/auth'); // JWT middleware

// req.body = { movieId, text, rating }
router.post('/addReviews', auth, async (req, res) => {
  const { movieId, text, rating } = req.body;
  const newReview = new Review({
    movieId,
    userId: req.user.id,      
    username: req.user.name,
    text,
    rating,
  });
  await newReview.save();
  res.status(201).json(newReview);
});


router.put('/updateReviews/:id', auth, async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review || review.userId.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  review.text = req.body.text || review.text;
  review.rating = req.body.rating || review.rating;
  await review.save();
  res.json(review);
});


router.get('/getReviews/movie/:movieId', async (req, res) => {
  const reviews = await Review.find({ movieId: req.params.movieId }).sort({ createdAt: -1 });
  res.json(reviews);
});

router.delete('/deleteReviews/:id', auth, async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review || review.userId.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  await review.deleteOne();
  res.json({ message: 'Review deleted' });
});

module.exports = router;
