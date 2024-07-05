import React from 'react'
import { useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'


const App = () => {
  const[currentTask, setCurrentTask] = useState(null)

  const handleEdit = (task) => {
    setCurrentTask(task)
  }
  const handleSave = () => {
    setCurrentTask(null)
  }
  return (
    <div>
        <h1>Task Management</h1>
        <TaskForm currentTask={currentTask} onSave={handleSave} />
        <TaskList onEdit={handleEdit} />
    </div>
);
}

export default App