import React, { useState } from 'react';
import { PostType } from '../types';

interface PostProps {
  post: PostType;
  onDelete: (_id: string) => void; // Use _id instead of id
}

const Post: React.FC<PostProps> = ({ post, onDelete }) => {
  const { _id, content, createdAt = '', likes } = post;
  console.log('id', _id);
  const [currentLikes, setCurrentLikes] = useState<number>(likes || 0);

  const handleLike = () => {
    setCurrentLikes(currentLikes + 1);
  };

  return (
    <div className="post" key={_id}>
      <p>{content}</p>
      <small>{new Date(createdAt).toLocaleDateString()}</small>{' '}
      {/* Optional: Format createdAt */}
      <button onClick={handleLike}>Like ({currentLikes})</button>
      <button onClick={() => onDelete(_id)}>Delete Post</button>
    </div>
  );
};

export default Post;
