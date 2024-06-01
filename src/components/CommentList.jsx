import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments, currentUser, onVote, onReply, onDelete, onEdit }) => {
  return (
    <div>
      {comments.sort((a, b) => b.score - a.score).map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
          currentUser={currentUser}
          onVote={onVote}
          onReply={onReply}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default CommentList;
