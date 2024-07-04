import React, { useEffect, useState } from 'react';
import { fetchTasks, deleteTask } from '../api';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadTasks = async () => {
            try {
                setLoading(true);
                const response = await fetchTasks();
                setTasks(response.data || []); // Ensure tasks is always an array
            } catch (err) {
                setError('Failed to fetch tasks');
            } finally {
                setLoading(false);
            }
        };

        loadTasks();
    }, []);

    const handleDelete = async (taskId) => {
        try {
            await deleteTask(taskId);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (err) {
            setError('Failed to delete task');
        }
    };

    if (loading) {
        return <p>Loading tasks...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Tasks</h1>
            <button onClick={() => navigate('/tasks/new')}>Create New Task</button>
            {tasks.length === 0 ? (
                <p>No tasks available.</p>
            ) : (
                <ul>
                    {tasks.map(task => (
                        <li key={task.id}>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <button onClick={() => navigate(`/tasks/edit/${task.id}`)}>Edit</button>
                            <button onClick={() => handleDelete(task.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TaskList;
