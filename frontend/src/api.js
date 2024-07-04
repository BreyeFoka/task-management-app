import axios from 'axios';

const API_URL = "hhtp://localhost:5000/api/tasks";

const getTasks = () => axios.get(API_URL)
const getTask = (id) => axios.get(`${API_URL}/:id`);
const createTask = (task) => axios.post(API_URL, task);
const updateTask = (id, task) => axios.put(`${API_URL}/${id}`, task);
const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);

module.exports = {
    getTasks, getTask, createTask, updateTask, deleteTask
}
