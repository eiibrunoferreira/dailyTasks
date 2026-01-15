// src/modals/DeleteModal.jsx
import React from 'react';

export default function DeleteModal({
  selectedTask,
  taskColumn,
  deleteTask,
  setShowDeleteModal,
  setShowDetailsModal,
}) {
  if (!selectedTask) return null;

  const handleDelete = () => {
    deleteTask(taskColumn, selectedTask.id);
    setShowDeleteModal(false);
    setShowDetailsModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
      <div className="bg-amber-700 border-white relative border-b-3 items-center justify-center gap-3 flex flex-col rounded-lg p-6 mx-6.5 w-full max-w-sm shadow-lg max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setShowDeleteModal(false)}
          className='cursor-pointer absolute text-xl right-5.5 top-2 bg-amber-700 text-white rounded px-1.5 py-0.5'>x</button>
        <h1 className='w-fit bg-white text-amber-700 rounded px-1.5 py-0.5 font-bold'>ATENÇÃO!</h1>
        <div>
          <h1 className='text text-white text-center'>DESEJA MESMO APAGAR A TAREFA:</h1>
          <h2 className="text-xl text-center font-bold text-white"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              wordBreak: 'break-word',
            }}>"{selectedTask.title}"</h2>
        </div>
        <button
          onClick={handleDelete}
          className='cursor-pointer px-7 font-bold bg-amber-800/50 hover:bg-amber-800/80 duration-250 text-white rounded py-0.5'>SIM</button>
      </div>
    </div>
  );
}
