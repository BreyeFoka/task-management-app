import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import tasks from './routes/tasks.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/tasks', tasksRoutes);


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
