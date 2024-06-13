import React from 'react';
import Reply from './Reply';

const ReplyList = ({ currentUser, onVote, onReply, onDelete, onEdit, replies }) => {
  return (
    <div className="ml-10">
      {replies && (
        // Sort the replies only if the replies prop is defined
        replies.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map(reply => (
          <Reply
            key={reply.id}
            reply={reply}
            currentUser={currentUser}
            onVote={onVote}
            onReply={onReply}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
};

export default ReplyList;
