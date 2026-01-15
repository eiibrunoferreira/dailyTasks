import React from 'react';

export default function AddTaskModal({
  newTitle, setNewTitle,
  newDescription, setNewDescription,
  selectedColumn, setSelectedColumn,
  isImportant, setIsImportant,
  columnNames,
  addTask,
  setShowAddModal,
  highlightTitle,
  setHighlightTitle,
  titleInputRef
}) {

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
    if (highlightTitle) setHighlightTitle(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 border-b-2 border-white rounded-lg mx-3.5 p-5 w-full max-w-md shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-white">Nova Tarefa</h2>
        <label className="block mb-1 font-medium text-white">Título</label>
        <input
          ref={titleInputRef}
          type="text"
          value={newTitle}
          onChange={handleTitleChange}
          onClick={() => {
            if (highlightTitle) setHighlightTitle(false);
          }}
          autoFocus
          className={`w-full text-white border px-3 py-2 rounded mb-4 outline-none transition-colors duration-200
            ${highlightTitle ? 'border-amber-500' : 'border-white'}`}
          placeholder="Digite o título..."
        />
        <label className="block mb-1 font-medium text-white">Descrição</label>
        <textarea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          className="scrollbarCustom w-full text-white border px-3 py-2 rounded mb-4 outline-none resize-none min-h-40 overflow-y-auto"
          placeholder="Digite a descrição..."
        />
        <div className="flex justify-between items-center mb-4">
          <div>
            <label className="block mb-2 font-medium text-white">Coluna</label>
            <select
              value={selectedColumn}
              onChange={(e) => setSelectedColumn(e.target.value)}
              className="w-full border border-white text-white px-3 py-2 rounded outline-none cursor-pointer"
            >
              {Object.entries(columnNames).map(([colId, colName]) => (
                <option key={colId} value={colId} className='bg-slate-800'>{colName}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3.5 mt-6">
            <label className="block font-medium text-white">Importante?</label>
            <input
              type="checkbox"
              checked={isImportant}
              onChange={(e) => setIsImportant(e.target.checked)}
              className="mt-1 accent-amber-700 checked:bg-amber-700"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              setShowAddModal(false);
              setNewTitle('');
              setNewDescription('');
              setSelectedColumn('a-fazer');
              setIsImportant(false);
              setHighlightTitle(false);
            }}
            className="px-4 py-2 text-white border-b-2 border-slate-700/50 rounded hover:bg-slate-700/50 hover:border-white cursor-pointer duration-250"
          >Cancelar</button>
          <button
            onClick={addTask}
            className="px-4 py-2 text-white border-b-2 border-slate-700/50 hover:bg-slate-700/50 hover:border-white rounded cursor-pointer duration-250"
          >Adicionar</button>
        </div>
      </div>
    </div>
  );
}
