import React, { useEffect, useState } from 'react';
import { createTask, updateTask } from '../api';
import './TaskForm.css';

const TaskForm = ({ currentTask, onSave }) => {
    const [task, setTask] = useState({ title: '', description: '', status: 'Pending' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (currentTask) {
            setTask(currentTask);
        }
    }, [currentTask]);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!task.title || !task.description) {
            setError('Title and Description are required');
            return;
        }
        setError('');
        setIsSubmitting(true);
        try {
            if (task.id) {
                await updateTask(task.id, task);
            } else {
                await createTask(task);
            }
            setTask({ title: '', description: '', status: 'Pending' });
            onSave();
        } catch (error) {
            console.error('Error saving task:', error);
            setError('Failed to save task');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                />
                <textarea
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                ></textarea>
                <select name="status" value={task.status} onChange={handleChange}>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </>
    );
};

export default TaskForm;
