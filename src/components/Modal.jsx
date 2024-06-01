import React from 'react';

const Modal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-4 bg-white rounded-md shadow-lg">
        <h3 className="mb-4 text-lg font-semibold">Are you sure?</h3>
        <div className="flex justify-end">
          <button onClick={onCancel} className="px-4 py-2 mr-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
