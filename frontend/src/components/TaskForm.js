import React from 'react'
import { useEffect, useState } from 'react'
import {createTask, updateTask} from "../api";

const TaskForm = ({currentTask, onSave}) => {
    const [task, setTask]  = useState({title: "", description: "", status: "pending"}); 
    useEffect(() => {
        if(currentTask){
            setTask(currentTask)
        }
    }, [currentTask])

    const handleChange = (e) => {
        setTask({...task, [e.target.name]: e.target.value})
    }

    const handleSublit = async (e) => {
        e.preventDefault();
        if (task.id){
            await updateTask(task.id, task);
        } else{
            await createTask(task);
        }
        onSave();
    }
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

export default TaskForm