const express = require ("express")
const cors =  require ('cors');
const bodyParser = require ('body-parser');
const tasksRoutes = require('./routes/tasks');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/tasks', tasksRoutes);
app.use('/api/auth', authRouter)


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
