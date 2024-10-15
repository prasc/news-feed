import React, { useState } from 'react';
import { PostType } from '../types';

interface PostProps {
  post: PostType;
  onDelete: (id: number) => void;
}

const Post: React.FC<PostProps> = ({ post, onDelete }) => {
  const { id, content, likes } = post;
  const [currentLikes, setCurrentLikes] = useState<number>(likes || 0);

  const handleLike = () => {
    setCurrentLikes(currentLikes + 1);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="post" key={id}>
      <p>{content}</p>
      <button onClick={handleLike}>Like ({currentLikes})</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Post;
