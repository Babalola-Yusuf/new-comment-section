import React, { useState, useEffect } from 'react';
import CommentList from './components/CommentList';
import NewCommentForm from './components/NewCommentForm';
import data from './data/data.json';

const App = () => {
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem('comments'));
    if (savedComments) {
      setComments(savedComments);
    } else {
      setComments(data.comments);
    }
    setCurrentUser(data.currentUser);
  }, []);

  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem('comments', JSON.stringify(comments));
    }
  }, [comments]);

  const handleVote = (id, value) => {
    const updateScore = (comments) => {
      return comments.map(comment => {
        if (comment.id === id) {
          return { ...comment, score: comment.score + value };
        }
        if (comment.replies) {
          return { ...comment, replies: updateScore(comment.replies) };
        }
        return comment;
      });
    };

    setComments(updateScore(comments));
  };

  const handleReply = (parentId, replyContent) => {
    const newReply = {
      id: Date.now(),
      content: replyContent,
      createdAt: new Date().toISOString(),
      score: 0,
      replyingTo: '',
      user: currentUser,
      replies: []
    };

    const addReply = (comments) => {
      return comments.map(comment => {
        if (comment.id === parentId) {
          newReply.replyingTo = comment.user.username;
          return { ...comment, replies: [...comment.replies, newReply] };
        }
        if (comment.replies) {
          const updatedReplies = addReply(comment.replies);
          if (updatedReplies !== comment.replies) {
            return { ...comment, replies: updatedReplies };
          }
        }
        return comment;
      });
    };

    setComments(addReply(comments));
  };

  const handleDelete = (id) => {
    const removeComment = (comments) => {
      return comments
        .map(comment => {
          if (comment.id === id) {
            return null;
          }
          if (comment.replies) {
            comment.replies = removeComment(comment.replies);
          }
          return comment;
        })
        .filter(comment => comment !== null);
    };

    setComments(removeComment(comments));
  };

  const handleEdit = (id, content) => {
    const editComment = (comments) => {
      return comments.map(comment => {
        if (comment.id === id) {
          return { ...comment, content };
        }
        if (comment.replies) {
          return { ...comment, replies: editComment(comment.replies) };
        }
        return comment;
      });
    };

    setComments(editComment(comments));
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
    <div className="container mx-auto p-4 lg:w-55% ">
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
      <NewCommentForm onSubmit={handleAddComment} />
      <button onClick={handleReset} className="mt-4 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600">
        Reset to Default Comments
      </button>
    </div>
  );
};

export default App;
