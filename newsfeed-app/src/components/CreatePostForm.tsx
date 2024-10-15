import React, { useState } from 'react';
import '../assets/CreatePostForm.scss';

type CreatePostFormProps = {
  onPostSubmit: (post: { content: string }) => void;
};

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onPostSubmit }) => {
  const [postContent, setPostContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (postContent.trim() === '') {
      setError("Post can't be empty come onnnn");
      return;
    }

    setError(null); // Basically clear error state if we made it here
    onPostSubmit({ content: postContent });
    setPostContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="create-post-form">
      {error && <p className="error">{error}</p>}
      <textarea
        placeholder="I wanna know what's on your mind"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        rows={4}
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default CreatePostForm;
