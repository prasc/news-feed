import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import '../assets/Newsfeed.scss';
import CreatePostForm from '../components/CreatePostForm';
import Post from '../components/Post';
import type { PostType } from '../types';

const Newsfeed: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    setPosts(savedPosts);
  }, []);

  const addNewPost = (newPost: PostType) => {
    const updatedPosts = [newPost, ...posts]; // Use state posts, not prop posts
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const deletePost = (id: number) => {
    const updatedPosts = posts.filter((post) => post.id != id);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  return (
    <div>
      <Header />
      <div className="container newsfeed">
        <CreatePostForm onPostSubmit={addNewPost} />
        <div className="main-feed">
          {/* {posts.map(({ content, id, likes }) => (
            <Post key={id} id={id} content={content} likes={likes} />
          ))} */}
          {posts.map((post) => (
            <Post post={post} onDelete={deletePost} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Newsfeed;
