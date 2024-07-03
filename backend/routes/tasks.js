const express = require ("express")
const pool = require ("../db")


const router = express.Router()

router.get("/", async(req, res) => {
    try{
        const results = await pool.query("SELECT * FROM tasks");
        res.json(results.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    
    }   
})

router.get("/:id", async(req, res) => {
    try{
        const {id} = req.params;
        const results = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
        res.json(results.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

router.post("/", async(req, res) => {
    try {
        const {title, description} = req.body;
        const results = await pool.query("INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *", [title, description]);
        res.json(results.rows[0]);
    } catch (error) {
        console.log(error.messsage)
        res.status(500).send("Server Error")
    }
})

router.put("/:id", async(req, res) => {
    try {
        const {id} = req.params
        const  {title, description, status} = req.body
        const results = await pool.query("UPDATE tasks SET title = $1, description = $2, status = $3 WHERE id = $4 RETURNING *", [title, description, status, id])
        res.json(results.rows[0])
     }  
     catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")

    }})
    
router.delete("/:id", async(req, res) => {
    try{
        const {id} = req.params
        const results = await pool.query("DELETE FROM tasks WHERE id = $1", [id])
        res.json("Task deleted")
    }catch (err){
            console.log(err.message)
            res.status(500).send("Server Error")
    }
})

module.exports = router