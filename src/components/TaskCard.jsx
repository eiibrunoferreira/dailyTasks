import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function TaskCard({ task, columnId, onEdit, onDelete, onDoubleClick, itemColors }) {
  return (
    <div
      className="bg-slate-700/70 text-white p-3 gap-5 rounded mb-2 shadow cursor-move flex flex-row justify-between"
      onDoubleClick={() => onDoubleClick(task, columnId)}
    >
      <div className="flex gap-2 w-full min-w-0 items-center">
        {columnId === 'feito' && <FontAwesomeIcon icon={faCheck} color="orange" />}

        <div className=" w-full min-w-0 text-base font-bold mx-1.5"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            wordBreak: 'break-word',
          }}>
          {task.title}
        </div>

        {task.important && (
          <div className="hidden xl:block bg-amber-700 text-white text-xs p-1.5 rounded-xs shrink-0">
            IMPORTANTE
          </div>
        )}
      </div>

      <div className="flex gap-3 items-center shrink-0">
        <button onClick={() => onEdit(task, columnId)}>
          <FontAwesomeIcon icon={faPenToSquare} className="cursor-pointer text-white hover:text-white/70 duration-250" />
        </button>

        <button onClick={() => onDelete(task, columnId)}>
          <FontAwesomeIcon icon={faTrash} className="cursor-pointer text-white hover:text-white/70 duration-250" />
        </button>

        <div className={`${task.important ? 'bg-amber-700' : itemColors[columnId]} w-1 h-full rounded`} />
      </div>
    </div>
  );
}
