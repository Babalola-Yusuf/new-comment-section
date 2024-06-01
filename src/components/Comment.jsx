import React, { useState } from 'react';
import { timeSince } from '../utils/timeUtils';
import { FaReply, FaEdit, FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa';
import Reply from './Reply';
import CommentForm from './CommentForm';
import Modal from './Modal';

const Comment = ({ comment, currentUser, onVote, onReply, onDelete, onEdit }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-4 mb-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <img src={comment.user.image.png} alt={comment.user.username} className="w-10 h-10 rounded-full" />
          <div className="ml-4">
            <div className="flex items-center">
              <h4 className="font-semibold">{comment.user.username}</h4>
              <p className="ml-2 text-gray-600">{timeSince(new Date(comment.createdAt))}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <button onClick={() => setIsReplying(!isReplying)} className="flex items-center px-2 py-1 text-blue-500 rounded-md hover:bg-gray-100">
            <FaReply className="mr-1" /> Reply
          </button>
          {comment.user.username === currentUser.username && (
            <>
              <button onClick={() => setIsEditing(!isEditing)} className="flex items-center px-2 py-1 text-yellow-500 rounded-md hover:bg-gray-100">
                <FaEdit className="mr-1" /> Edit
              </button>
              <button onClick={() => setShowModal(true)} className="flex items-center px-2 py-1 text-red-500 rounded-md hover:bg-gray-100">
                <FaTrashAlt className="mr-1" /> Delete
              </button>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-start mt-2 md:space-x-4">
        <div className="md:order-2 flex-1">
          {isEditing ? (
            <CommentForm
              initialValue={comment.content}
              onSubmit={(content) => {
                onEdit(comment.id, content);
                setIsEditing(false);
              }}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <p className="mb-2">{comment.content}</p>
          )}
        </div>
        <div className="flex items-center justify-between mt-2 md:hidden">
          <button onClick={() => setIsReplying(!isReplying)} className="flex items-center px-2 py-1 text-blue-500 rounded-md hover:bg-gray-100">
            <FaReply className="mr-1" /> Reply
          </button>
          {comment.user.username === currentUser.username && (
            <div className="flex items-center">
              <button onClick={() => setIsEditing(!isEditing)} className="flex items-center px-2 py-1 mr-2 text-yellow-500 rounded-md hover:bg-gray-100">
                <FaEdit className="mr-1" /> Edit
              </button>
              <button onClick={() => setShowModal(true)} className="flex items-center px-2 py-1 text-red-500 rounded-md hover:bg-gray-100">
                <FaTrashAlt className="mr-1" /> Delete
              </button>
            </div>
          )}
        </div>
        <div className="flex md:order-1 items-center md:flex-col md:space-y-2 md:mr-4 mt-2 md:mt-0">
          <button onClick={() => onVote(comment.id, 1)} className="flex md:flex-col items-center px-2 py-1 text-gray-600 rounded-md hover:bg-gray-100">
            <FaPlus className="md:rotate-90" />
          </button>
          <span className="mx-2 md:mx-0 md:my-2">{comment.score}</span>
          <button onClick={() => onVote(comment.id, -1)} className="flex md:flex-col items-center px-2 py-1 text-gray-600 rounded-md hover:bg-gray-100">
            <FaMinus className="md:rotate-90" />
          </button>
        </div>
      </div>
      {isReplying && (
        <CommentForm
          onSubmit={(content) => {
            onReply(comment.id, content);
            setIsReplying(false);
          }}
          onCancel={() => setIsReplying(false)}
        />
      )}
      <div className="ml-8 mt-4">
        {comment.replies.map(reply => (
          <Reply
            key={reply.id}
            reply={reply}
            currentUser={currentUser}
            onVote={onVote}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
      {showModal && (
        <Modal
          onConfirm={() => {
            onDelete(comment.id);
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Comment;
