import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import '../assets/Newsfeed.scss';
import CreatePostForm from '../components/CreatePostForm';
import Post from '../components/Post';
import type { PostType } from '../types';

const Newsfeed: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  // Fetch posts from the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // Add a new post and send it to the API
  const addNewPost = async (newPost: PostType) => {
    try {
      const response = await fetch('http://localhost:5001/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      const savedPost = await response.json();
      setPosts([savedPost, ...posts]); // Add the newly created post to the list
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  // Delete a post from the API
  const deletePost = async (id: number) => {
    try {
      await fetch(`http://localhost:5001/api/posts/${id}`, {
        method: 'DELETE',
      });
      const updatedPosts = posts.filter((post) => post.id !== id);
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container newsfeed">
        <CreatePostForm onPostSubmit={addNewPost} />
        <div className="main-feed">
          {posts.map((post) => (
            <Post post={post} onDelete={deletePost} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Newsfeed;
