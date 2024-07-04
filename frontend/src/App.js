import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { fetchTasks } from './api';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const tasks = await fetchTasks();
        setTasks(tasks);
    };

    const handleTaskDeleted = () => {
        loadTasks(); 
    };

    const handleSave = () => {
        setCurrentTask(null); // Reset current task after save
    };

    const handleTaskSaved = () => {
        loadTasks(); // Reload tasks
    };

    const handleEdit = (task) => {
        setCurrentTask(task);
    };

    return (
        <div className="app">
            <TaskForm currentTask={currentTask} onSave={handleSave} onTaskSaved={handleTaskSaved} />
            <TaskList tasks={tasks} onEdit={handleEdit}  onTaskDeleted={handleTaskDeleted}/>
        </div>
    );
};

export default App;
