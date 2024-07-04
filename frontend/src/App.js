import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Login from './components/Login';
import Register from './components/Register';
import { setAuthToken } from './api';

const App = () => {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthToken(token);
        }
    }, []);

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/tasks" element={<TaskList />} />
                    <Route path="/tasks/new" element={<TaskForm />} />
                    <Route path="/tasks/edit/:id" element={<TaskForm />} />
                    <Route path="/" element={<Navigate to="/tasks" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;