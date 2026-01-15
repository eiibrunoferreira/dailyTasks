// src/modals/ShowDetailsModal.jsx
import React from 'react';

export default function ShowDetailsModal({
  selectedTask,
  taskColumn,
  columnNames,
  handleEditTask,
  handleDeleteTask,
  setShowDetailsModal
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 text-white border-b-2 mx-3.5 rounded-lg w-full max-w-md shadow-lg max-h-[90vh] overflow-y-auto">
        <div className='flex items-center justify-center py-2.5 bg-slate-900/50'>
          <h2 className='text-center font-bold text-white w-full px-2 py-1 rounded'>{columnNames[taskColumn]}</h2>
        </div>
        <div className='p-6'>
          <h2 className="text-xl pl-1.5 font-bold text-white mb-2">{selectedTask.title}</h2>
          {selectedTask.important && (
            <div className="bg-amber-700 text-white w-fit text-xs p-1.5 rounded-xs shrink-0 mb-4">IMPORTANTE</div>
          )}
          <div className='h-0.5 w-full rounded-lg mb-3 bg-slate-900/40'></div>
          <p className="mb-10 pl-1.5 whitespace-pre-line max-h-40 overflow-y-auto pr-2 break-words scrollbarCustom">{selectedTask.description || 'Sem descrição.'}</p>

          <div className="flex justify-between gap-4 mb-3">
            <button
              onClick={() => handleEditTask(selectedTask, taskColumn)}
              className="border-slate-700/50 border-b-2 hover:bg-slate-700/50 hover:border-white text-white px-4 py-2 rounded cursor-pointer duration-250"
            >Editar Tarefa</button>
            <button
              onClick={() => handleDeleteTask(selectedTask, taskColumn)}
              className="text-white px-4 py-2 rounded border-b-2 border-slate-700/50 hover:bg-slate-700/50 hover:border-amber-700 cursor-pointer duration-250"
            >Deletar Tarefa</button>
          </div>
          <button
            onClick={() => setShowDetailsModal(false)}
            className="bg-slate-900/50 hover:bg-slate-900 border-b-2 border-slate-900/50 hover:border-slate-900 px-4 py-2 rounded cursor-pointer duration-250"
          >Fechar</button>
        </div>
      </div>
    </div>
  );
}
