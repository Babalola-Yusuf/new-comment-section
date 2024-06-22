import React, { useState } from 'react';

const CommentForm = ({ initialValue = '', onSubmit, onCancel }) => {
  const [content, setContent] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col ">
      <textarea
        className="w-full p-2 mb-2 border rounded-md resize-none focus:border-blue-500 focus:outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="3"
      />
      <div className="flex justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 mr-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
