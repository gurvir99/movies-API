const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: './config/.env' });

const userRoutes = require('./routes/user');
const favoritesRoutes = require('./routes/favourites');
const reviewRoutes = require('./routes/review'); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/reviews', reviewRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(async () => {
  console.log('MongoDB connected');

  console.log('Connected to database: ' + mongoose.connection.name); // e.g., "CinePrimeApp"

  // Get the CinePrimeApp database explicitly
  const db = mongoose.connection.client.db('CinePrimeApp');

  // List and log all collection names
  const collections = await db.listCollections().toArray();
  console.log('\n Collections in CinePrimeApp:');
  for (const col of collections) {
    console.log(`- ${col.name}`);
    const docs = await db.collection(col.name).find({}).toArray();
    console.log(`  Documents in ${col.name}:`, docs);
  }


  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});