import React, { useState } from 'react';
import './TodoForm.scss';
interface TodoFormProps {
  addTask: (title: string, description?: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title, description);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="Enter Task"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
   
   
      <br></br>
      <button type="submit">Add Task</button>
      <br></br>
    </form>
    
  );
}

export default TodoForm;
