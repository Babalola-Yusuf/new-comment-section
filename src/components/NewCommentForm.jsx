import React, { useState } from 'react';

const NewCommentForm = ({ onSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-between items-start mt-4 gap-2 p-4 bg-white">
      <img src="images/avatars/image-juliusomo.png" alt="" className='w-10 h-10 rounded-full' />
      <textarea
        className="  p-2 mb-2 border rounded-md resize-none focus:border-blue-600 focus:outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a comment..."
        rows="3"
        cols="60"
      />
      <div className="flex justify-end">
        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
          Submit
        </button>
      </div>
    </form>
  );
};

export default NewCommentForm;
