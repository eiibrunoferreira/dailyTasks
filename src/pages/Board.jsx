import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import Column from '../components/Colum';
import logo from "../assets/images/logo.png";


import AddTaskModal from '../modals/AddTaskModal';
import ShowDetailsModal from '../modals/ShowDetailsModal';
import EditTaskModal from '../modals/EditTaskModal';
import DeleteModal from '../modals/DeleteModal';
import ClearCompletedModal from '../modals/ClearCompletedModal';

const initialData = { 'a-fazer': [], 'fazendo': [], 'feito': [] };
const columnNames = { 'a-fazer': 'Pendentes', 'fazendo': 'Em Processo', 'feito': 'Concluído' };
const itemColors = { 'a-fazer': 'bg-slate-900', 'fazendo': 'bg-slate-900', 'feito': 'bg-slate-900' };

export default function DragAndDropBoard() {
  const [columns, setColumns] = useState(() => JSON.parse(localStorage.getItem('kanban-columns')) || initialData);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('a-fazer');
  const [isImportant, setIsImportant] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskColumn, setTaskColumn] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editImportant, setEditImportant] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showClearCompletedModal, setShowClearCompletedModal] = useState(false);


  const titleInputRef = useRef(null);
  const [highlightTitle, setHighlightTitle] = useState(false);

  useEffect(() => {
    const savedColumns = localStorage.getItem('kanban-columns');
    if (savedColumns) setColumns(JSON.parse(savedColumns));
  }, []);

  useEffect(() => {
    localStorage.setItem('kanban-columns', JSON.stringify(columns));
  }, [columns]);

  const addTask = () => {
    if (!newTitle.trim()) {
      alert("TÍTULO OBRIGATÓRIO!");
      setHighlightTitle(true);
      if (titleInputRef.current) titleInputRef.current.focus();
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      description: newDescription.trim(),
      important: isImportant,
    };

    setColumns(prev => ({ ...prev, [selectedColumn]: [...prev[selectedColumn], newTask] }));
    setNewTitle('');
    setNewDescription('');
    setSelectedColumn('a-fazer');
    setIsImportant(false);
    setShowAddModal(false);
    setHighlightTitle(false);
  };

  const deleteTask = (columnId, taskId) => {
    setColumns(prev => ({ ...prev, [columnId]: prev[columnId].filter(t => t.id !== taskId) }));
  };

  const clearCompletedTasks = () => {

    setColumns(prev => ({ ...prev, 'feito': [] }));
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const startColumn = columns[source.droppableId];
    const finishColumn = columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newItems = Array.from(startColumn);
      const [movedItem] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, movedItem);
      setColumns({ ...columns, [source.droppableId]: newItems });
      return;
    }

    const startItems = Array.from(startColumn);
    const [movedItem] = startItems.splice(source.index, 1);
    const finishItems = Array.from(finishColumn);
    finishItems.splice(destination.index, 0, movedItem);
    setColumns({ ...columns, [source.droppableId]: startItems, [destination.droppableId]: finishItems });
  };

  const handleEditTask = (task, columnId) => {
    setSelectedTask(task);
    setTaskColumn(columnId);
    setIsEditing(true);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditImportant(task.important || false);
  };

  const handleDeleteTask = (task, columnId) => {
    setSelectedTask(task);
    setTaskColumn(columnId);
    setShowDeleteModal(true);
  };

  const handleTaskDoubleClick = (task, columnId) => {
    setSelectedTask(task);
    setTaskColumn(columnId);
    setShowDetailsModal(true);
  };

  return (
    <div className="p-6 bg-slate-900 min-h-screen flex flex-col gap-8 items-center">
      <div className='w-full max-w-5xl h-20 px-6 flex items-center justify-between rounded'>
        <div className="">
          <img src={logo} alt="logo" className="w-48 h-auto -ml-6 md:ml-0" />
        </div>
        {/*
                <h1 className="text-white text-4xl text-center">
                  YOUR <br />
                  <span className="bg-amber-700 px-2.5 rounded">DAILY</span> <br />
                  TASKS
                </h1>
                  */}
        <button
          className="bg-amber-700 text-white px-4 py-2 rounded shadow hover:bg-amber-700/80 cursor-pointer duration-250"
          onClick={() => setShowAddModal(true)}
        >
          {/* Texto só aparece em telas médias para cima */}
          <span className="hidden md:inline">Adicionar Tarefa</span>

          {/* Ícone + só aparece em telas menores que md */}
          <span className="md:hidden text-xl font-bold">+</span>
        </button>
      </div>

      {showAddModal && (
        <AddTaskModal
          newTitle={newTitle} setNewTitle={setNewTitle}
          newDescription={newDescription} setNewDescription={setNewDescription}
          selectedColumn={selectedColumn} setSelectedColumn={setSelectedColumn}
          isImportant={isImportant} setIsImportant={setIsImportant}
          columnNames={columnNames}
          addTask={addTask}
          setShowAddModal={setShowAddModal}
          highlightTitle={highlightTitle}
          setHighlightTitle={setHighlightTitle}
          titleInputRef={titleInputRef}
        />
      )}

      {showDetailsModal && selectedTask && taskColumn && (
        <ShowDetailsModal
          selectedTask={selectedTask}
          taskColumn={taskColumn}
          columnNames={columnNames}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
          setShowDetailsModal={setShowDetailsModal}
        />
      )}

      {isEditing && (
        <EditTaskModal
          selectedTask={selectedTask}
          taskColumn={taskColumn}
          editTitle={editTitle} setEditTitle={setEditTitle}
          editDescription={editDescription} setEditDescription={setEditDescription}
          editImportant={editImportant} setEditImportant={setEditImportant}
          setIsEditing={setIsEditing}
          setColumns={setColumns}
        />
      )}

      {isEditing && selectedTask && (
        <EditTaskModal
          selectedTask={selectedTask}
          taskColumn={taskColumn}
          editTitle={editTitle} setEditTitle={setEditTitle}
          editDescription={editDescription} setEditDescription={setEditDescription}
          editImportant={editImportant} setEditImportant={setEditImportant}
          setIsEditing={setIsEditing}
          setColumns={setColumns}
          updateSelectedTask={(updatedTask) => setSelectedTask(updatedTask)} // <--- nova prop
        />
      )}


      {showDeleteModal && selectedTask && (
        <DeleteModal
          selectedTask={selectedTask}
          taskColumn={taskColumn}
          deleteTask={deleteTask}
          setShowDeleteModal={setShowDeleteModal}
          setShowDetailsModal={setShowDetailsModal}
        />
      )}

      {showClearCompletedModal && (
        <ClearCompletedModal
          clearCompletedTasks={clearCompletedTasks}
          setShowClearCompletedModal={setShowClearCompletedModal}
        />
      )}


      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-start">
          {Object.entries(columns).map(([columnId, tasks]) => (
            <Column
              key={columnId}
              columnId={columnId}
              columnName={columnNames[columnId]}
              tasks={tasks}
              itemColors={itemColors}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onTaskDoubleClick={handleTaskDoubleClick}
              setShowClearCompletedModal={setShowClearCompletedModal}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
