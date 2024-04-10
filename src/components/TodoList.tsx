import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem.tsx';
import TodoForm from './TodoForm.tsx';
import { Task } from '../types'; 
import './TodoList.scss';



const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, description?: string) => {
    const newTask: Task = {
      id: Math.random().toString(),
      title,
      description: description || '',
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  const editTask = (taskId: string, title: string, description?: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, title, description: description || '' };
      }
      return task;
    }));
  };

  const filterTasks = (filterType: string) => {
    setFilter(filterType);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="todo-list">
      <h2>Todo List</h2>
      <TodoForm addTask={addTask} />
      <div className="filter-buttons">
        <br></br>
        <button onClick={() => filterTasks('all')}>All</button>
        <button onClick={() => filterTasks('active')}>Active</button>
        <button onClick={() => filterTasks('completed')}>Completed</button>
      </div>
      <ul className="tasks">
        {filteredTasks.map(task => (
          <TodoItem
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onToggleCompletion={toggleTaskCompletion}
            onEdit={editTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
