import React from "react";
import { Droppable, Draggable } from '@hello-pangea/dnd';
import TaskCard from "./TaskCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Column({
  columnId,
  columnName,
  tasks,
  itemColors,
  onEditTask,
  onDeleteTask,
  onTaskDoubleClick,
  setShowClearCompletedModal
}) {
  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div className={`bg-slate-800/70 p-4 rounded shadow min-h-[300px] flex flex-col border-b-4 border-amber-700`}>
          <div className='flex items-center justify-center mb-4 relative'>
            <h2 className="text-lg font-semibold text-center text-white py-1 px-3 rounded">{columnName}</h2>
            {columnId === 'feito' && (
              <button
                onClick={() => setShowClearCompletedModal(true)}
                className="bg-amber-700 text-white px-3 py-2 absolute right-0 rounded hover:bg-amber-700/80 duration-250 cursor-pointer">
                <FontAwesomeIcon icon={faTrash} className='text-white' />
              </button>
            )}
          </div>

          <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col min-h-[200px]">
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <TaskCard
                      task={task}
                      columnId={columnId}
                      onEdit={onEditTask}
                      onDelete={onDeleteTask}
                      onDoubleClick={onTaskDoubleClick}
                      itemColors={itemColors}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}
