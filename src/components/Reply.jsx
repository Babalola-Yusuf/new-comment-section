import React, { useState } from 'react';
import { timeSince } from '../utils/timeUtils';
import { FaReply, FaEdit, FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa';
import CommentForm from './CommentForm';
import Modal from './Modal';

const Reply = ({ reply, currentUser, onVote, onReply, onDelete, onEdit }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-4 mb-4 bg-gray-100 rounded-lg shadow-md">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <img src={reply.user.image.png} alt={reply.user.username} className="w-8 h-8 rounded-full" />
          <div className="ml-4">
            <div className="flex items-center">
              <h4 className="font-semibold">{reply.user.username}</h4>
              <p className="ml-2 text-gray-600">{timeSince(new Date(reply.createdAt))}</p>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <button onClick={() => setIsReplying(!isReplying)} className="flex items-center px-2 py-1 text-blue-500 rounded-md hover:bg-gray-100">
            <FaReply className="mr-1" /> Reply
          </button>
          {reply.user.username === currentUser.username && (
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
       
        <div className="flex-1 md:order-2">
          {isEditing ? (
            <CommentForm
              initialValue={reply.content}
              onSubmit={(content) => {
                onEdit(reply.id, content);
                setIsEditing(false);
              }}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <p className="mb-2"><span className="text-blue-500">@{reply.replyingTo}</span> {reply.content}</p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between mt-2 md:hidden">
        {reply.user.username === currentUser.username && (
          <div className="flex items-center space-x-2">
            <button onClick={() => setIsEditing(!isEditing)} className="flex items-center px-2 py-1 text-yellow-500 rounded-md hover:bg-gray-100">
              <FaEdit className="mr-1" /> Edit
            </button>
            <button onClick={() => setShowModal(true)} className="flex items-center px-2 py-1 text-red-500 rounded-md hover:bg-gray-100">
              <FaTrashAlt className="mr-1" /> Delete
            </button>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mt-2 md:hidden">
      <div className="flex items-center md:order-1 md:flex-col md:space-y-2 md:mr-4 mt-2 md:mt-0 bg-blue-200 rounded-md p-2 w-28 md:w-10">
          <button onClick={() => onVote(reply.id, 1)} className="flex items-center md:flex-col px-2 py-1 text-gray-600 rounded-md hover:bg-gray-100">
            <FaPlus className="md:rotate-90" />
          </button>
          <span className="mx-2 md:mx-0 md:my-2">{reply.score}</span>
          <button onClick={() => onVote(reply.id, -1)} className="flex items-center md:flex-col px-2 py-1 text-gray-600 rounded-md hover:bg-gray-100">
            <FaMinus className="md:rotate-90" />
          </button>
        </div>
        <button onClick={() => setIsReplying(!isReplying)} className="flex items-center px-2 py-1 text-blue-500 rounded-md hover:bg-gray-100">
          <FaReply className="mr-1" /> Reply
        </button>
      </div>
      {isReplying && (
        <CommentForm
          onSubmit={(content) => {
            onReply(reply.id, content);
            setIsReplying(false);
          }}
          onCancel={() => setIsReplying(false)}
        />
      )}
      {showModal && (
        <Modal
          onConfirm={() => {
            onDelete(reply.id);
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Reply;
