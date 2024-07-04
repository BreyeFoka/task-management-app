import React, { useState, useEffect } from 'react';
import { createTask, updateTask, fetchTasks } from '../api';
import { useNavigate, useParams } from 'react-router-dom';

const TaskForm = () => {
    const [task, setTask] = useState({ title: '', description: '', status: 'Pending' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const loadTask = async () => {
            if (id) {
                const response = await fetchTasks();
                const taskToEdit = response.data.find(t => t.id === parseInt(id));
                if (taskToEdit) setTask(taskToEdit);
            }
        };

        loadTask();
    }, [id]);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await updateTask(id, task);
        } else {
            await createTask(task);
        }
        navigate('/tasks');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
                placeholder="Title"
            />
            <textarea
                name="description"
                value={task.description}
                onChange={handleChange}
                placeholder="Description"
            ></textarea>
            <select name="status" value={task.status} onChange={handleChange}>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
            </select>
            <button type="submit">Save</button>
        </form>
    );
}

export default TaskForm;