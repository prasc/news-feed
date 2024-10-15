const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5001;

// MongoDB connection
mongoose
  .connect('mongodb://127.0.0.1:27017/newsfeed', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Enable CORS
app.use(cors());

// Middleware
app.use(express.json());

// Routers
const postsRoute = require('./routes/posts');
app.use('/api', postsRoute);

// Root route to handle '/'
app.get('/', (req, res) => {
  res.send('Welcome to the Newsfeed API!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
