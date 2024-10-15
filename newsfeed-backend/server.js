const express = require('express');
const mongoose = require('mongoose');
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

// Middleware
app.use(express.json());

// Routers
const postsRoute = require('./routes/posts');
app.use('/api', postsRoute);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
