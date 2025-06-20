const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const favoriteSchema = new mongoose.Schema({
  id: {type: String, unique: true},       // movie ID from the external API (like TMDB)
  title: String,    // movie title
  poster_path: String, // optional: movie poster path
  overview: String, // optional: movie overview
  release_date: String, // optional: movie release date
  vote_average: Number, // optional: movie rating
}, { _id: false }); // disable MongoDB’s default _id for subdocs


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [favoriteSchema]  // <-- embedded favorites array
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare password
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);