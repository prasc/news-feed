const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Create a new post
router.post('/posts', async (req, res) => {
  const { content, authorId } = req.body;

  if (!content) {
    return res.status(400).json({ message: 'Content is required' });
  }

  const newPost = new Post({
    content,
    authorId: authorId || null, // default to null if authorId is not provided
    id: Date.now(),
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    await post.deleteOne();
    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
