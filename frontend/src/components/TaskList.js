import { useEffect, useState } from "react";
import {getTasks, deleteTask} from "../api";

import React from 'react'

const TaskList = ({onEdit}) => {
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        loadTasks();
    }, [])


    const loadTasks = async () => {
        const {data} = await getTasks();
        setTasks(data);
    }

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure you want to delete this task?")) {
            await deleteTask(id);
            loadTasks();
        }
    }
    
  return (
    <div>
    <h2>Tasks</h2>
    <ul>
        {tasks.map(task => (
            <li key={task.id}>
                {task.title}
                <button onClick={() => onEdit(task)}>Edit</button>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
            </li>
        ))}
    </ul>
</div>
  )
}

export default TaskList