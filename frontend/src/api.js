import axios from 'axios';

const API_URL = 'http://localhost:5000/api/';

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};


export const loginUser = async (credentials) => {
    return await axios.post(`${API_URL}/auth/login`, credentials);
};

export const registerUser = async (data) => {
    return await axios.post(`${API_URL}/auth/register`, data);
};

export const fetchTasks = async () => {
    try {
        const response = await axios.get(`${API_URL}/tasks`);
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
};

export const createTask = async (task) => {
    try {
        const response = await axios.post(`${API_URL}/tasks`, task);
        return response.data;
    } catch (error) {
        console.error('Error creating task:', error);
    }
};

export const updateTask = async (id, task) => {
    try {
        const response = await axios.put(`${API_URL}/tasks/${id}`, task);
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
    }
};

export const deleteTask = async (id) => {
    try {
        await axios.delete(`${API_URL}/tasks/${id}`);
    } catch (error) {
        console.error('Error deleting task:', error);
    }
};
