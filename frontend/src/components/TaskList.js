import React from 'react';
import { deleteTask } from '../api';

const TaskList = ({ tasks, onEdit, onTaskDeleted }) => {
    const handleDelete = async (id) => {
        await deleteTask(id);
        onTaskDeleted();
    };

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id} style={taskItemStyle}>
                    <div style={taskDetailsStyle}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Status: {task.status}</p>
                    </div>
                    <div style={taskActionsStyle}>
                        <button onClick={() => onEdit(task)}>Edit</button>
                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

const taskItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    border: '1px solid #ddd',
    marginBottom: '10px',
    borderRadius: '4px',
};

const taskDetailsStyle = {
    flex: 1,
};

const taskActionsStyle = {
    display: 'flex',
    gap: '10px',
};

export default TaskList;
