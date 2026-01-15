// src/modals/EditTaskModal.jsx
import React from 'react';

export default function EditTaskModal({
  selectedTask,
  taskColumn,
  editTitle, setEditTitle,
  editDescription, setEditDescription,
  editImportant, setEditImportant,
  setIsEditing,
  setColumns,
  updateSelectedTask // nova prop
}) {
  const handleSave = () => {
    if (!editTitle.trim()) return alert('O título é obrigatório!');

    setColumns(prev => {
      const updatedTasks = prev[taskColumn].map(task =>
        task.id === selectedTask.id
          ? { ...task, title: editTitle.trim(), description: editDescription.trim(), important: editImportant }
          : task
      );

      const updatedTask = { ...selectedTask, title: editTitle.trim(), description: editDescription.trim(), important: editImportant };
      if (updateSelectedTask) updateSelectedTask(updatedTask); // atualiza ShowDetailsModal

      return { ...prev, [taskColumn]: updatedTasks };
    });

    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
      <div className="bg-slate-800 border-b-3 border-white rounded-lg p-6 mx-3.5 w-full max-w-md shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-white">Editar Tarefa</h2>
        <label className="block mb-2 font-medium text-white">Título</label>
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4 text-white outline-none"
        />
        <label className="block mb-2 font-medium text-white">Descrição</label>
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="scrollbarCustom w-full border px-3 py-2 rounded mb-4 resize-none min-h-40 overflow-y-auto outline-none text-white"
        />
        <div className="flex items-center gap-3 mb-4">
          <label className="block font-medium text-white">Importante?</label>
          <input
            type="checkbox"
            checked={editImportant}
            onChange={(e) => setEditImportant(e.target.checked)}
            className="mt-0.5 accent-amber-700 checked:bg-amber-700"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 text-white rounded border-b-2 border-slate-700/50 hover:bg-slate-700/50 hover:border-white duration-250 cursor-pointer"
          >Fechar</button>
          <button
            onClick={handleSave}
            className="px-4 py-2 border-b-2 border-slate-700/50 text-white rounded hover:bg-slate-700/50 hover:border-white cursor-pointer duration-250"
          >Salvar Alterações</button>
        </div>
      </div>
    </div>
  );
}

