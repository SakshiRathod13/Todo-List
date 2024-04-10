import React, { useState } from 'react';
import { Task } from '../types'; 
import './TodoItem.scss';

interface TodoItemProps {
  task: Task;
  onDelete: (taskId: string) => void;
  onToggleCompletion: (taskId: string) => void;
  onEdit: (taskId: string, title: string, description?: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, onDelete, onToggleCompletion, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || '');

  const saveEditedTask = () => {
    onEdit(task.id, editedTitle, editedDescription);
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${task.completed ? 'completed' : ''}`}>
      {!isEditing ? (
        <div className="task">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleCompletion(task.id)}
          />
          <div className="task-details">
            <span className="task-title">{task.title}</span>
          
          </div>
          <div className="task-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </div>
        </div>
      ) : (
        <div className="edit-task">
          <input
            type="text"
            value={editedTitle}
            onChange={e => setEditedTitle(e.target.value)}
          />
          <input
            type="text"
            value={editedDescription}
            onChange={e => setEditedDescription(e.target.value)}
          />
          <button onClick={saveEditedTask}>Save</button>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
