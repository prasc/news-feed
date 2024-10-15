import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../assets/Newsfeed.scss';
import CreatePostForm from '../components/CreatePostForm';
import Post from '../components/Post';
import type { PostType } from '../types';

const Newsfeed: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [user, setUser] = useState(null); // store the authenticated user

  const navigate = useNavigate(); // for redirecting

  // Function to check authentication status
  const checkAuthStatus = async () => {
    try {
      const response = await fetch('http://localhost:5001/auth/status', {
        credentials: 'include', // Important for sending cookies
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // If not authenticated, redirect to login page
        navigate('/login');
      } else {
        const data = await response.json();
        setUser(data.user); // Save user data if authenticated
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      navigate('/login'); // Redirect if error occurs
    }
  };

  const fetchPosts = async (page: number) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/posts?page=${page}&limit=10`,
        { credentials: 'include' } // Include credentials (cookies)
      );
      const data = await response.json();

      if (data.posts) {
        setPosts(data.posts);
        setTotalPages(data.totalPages);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    }
  };

  // Fetch posts from the API
  useEffect(() => {
    checkAuthStatus(); // First check if the user is authenticated
    fetchPosts(page); // Fetch posts after checking authentication
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
    console.log('Next page:', page); // Verify page increment
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  // Add a new post and send it to the API
  const addNewPost = async (newPost: Omit<PostType, '_id' | 'createdAt'>) => {
    try {
      console.log('Sending new post:', newPost); // Log the data
      const response = await fetch('http://localhost:5001/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const savedPost = await response.json();
      setPosts([savedPost, ...posts]); // Add the newly created post to the list
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  // Delete a post from the API
  const deletePost = async (_id: string) => {
    if (!_id) {
      console.error('Post ID is undefined or invalid');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/api/posts/${_id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedPosts = posts.filter((post) => post._id !== _id);
        setPosts(updatedPosts);
      } else {
        console.log('Failed to delete Post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container newsfeed">
        {user ? (
          <>
            <CreatePostForm onPostSubmit={addNewPost} />
            <div className="main-feed">
              {posts.map((post) => (
                <Post key={post._id} post={post} onDelete={deletePost} />
              ))}
              <button onClick={handlePreviousPage} disabled={page === 1}>
                Previous
              </button>
              <button onClick={handleNextPage} disabled={page === totalPages}>
                Next
              </button>
            </div>
          </>
        ) : (
          <p>Loading...</p> // Placeholder while checking auth
        )}
      </div>
    </div>
  );
};

export default Newsfeed;
