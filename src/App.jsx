import React, { useState, useEffect } from 'react';
import CommentList from './components/CommentList';
import NewCommentForm from './components/NewCommentForm';
import data from './data/data.json';

const App = () => {
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  // Initialize state from localStorage or default data
  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem('comments'));
    if (savedComments) {
      setComments(savedComments);
    } else {
      setComments(data.comments);
    }
    setCurrentUser(data.currentUser);
  }, []);

  // Update localStorage whenever comments change
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem('comments', JSON.stringify(comments));
    }
  }, [comments]);

  const handleVote = (id, value) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === id) {
        return { ...comment, score: comment.score + value };
      }
      if (comment.replies) {
        const updatedReplies = comment.replies.map(reply => {
          if (reply.id === id) {
            return { ...reply, score: reply.score + value };
          }
          return reply;
        });
        return { ...comment, replies: updatedReplies };
      }
      return comment;
    });
    setComments(updatedComments);
  };


  const handleReply = (id, content) => {
    const newReply = {
      id: Date.now(),
      content,
      createdAt: new Date().toISOString(),
      score: 0,
      replyingTo: comments.find(comment => comment.id === id)?.user.username,
      user: currentUser
    };
    const updatedComments = comments.map(comment => {
      if (comment.id === id) {
        return { ...comment, replies: [...comment.replies, newReply] };
      }
      if (comment.replies) {
        const updatedReplies = comment.replies.map(reply => {
          if (reply.id === id) {
            return { ...reply, replies: [...reply.replies, newReply] };
          }
          return reply;
        });
        return { ...comment, replies: updatedReplies };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleDelete = (id) => {
    const updatedComments = comments.filter(comment => comment.id !== id);
    const updatedCommentsWithReplies = updatedComments.map(comment => {
      const updatedReplies = comment.replies.filter(reply => reply.id !== id);
      return { ...comment, replies: updatedReplies };
    });
    setComments(updatedCommentsWithReplies);
  };

  const handleEdit = (id, content) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === id) {
        return { ...comment, content };
      }
      if (comment.replies) {
        const updatedReplies = comment.replies.map(reply => {
          if (reply.id === id) {
            return { ...reply, content };
          }
          return reply;
        });
        return { ...comment, replies: updatedReplies };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleAddComment = (content) => {
    const newComment = {
      id: Date.now(),
      content,
      createdAt: new Date().toISOString(),
      score: 0,
      user: currentUser,
      replies: []
    };
    setComments([...comments, newComment]);
  };

  const handleReset = () => {
    setComments(data.comments);
    localStorage.removeItem('comments');
  };

  return (
    <div className="container mx-auto p-4">
      {comments.length > 0 && (
        <CommentList
          comments={comments}
          currentUser={currentUser}
          onVote={handleVote}
          onReply={handleReply}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
      <NewCommentForm onSubmit={handleAddComment}  />
      {<button onClick={handleReset} className="mt-4 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600">
        Reset to Default Comments
      </button> }
    </div>
  );
};

export default App;
