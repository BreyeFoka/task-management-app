const express = require ("express")
const pool = require ("../db")
const auth = require("../middleware/auth")

const router = express.Router()

router.get("/", auth, async(req, res) => {
    const {userId} = req.user;
    try{
        const results = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [userId]);
        res.json(results.rows); 
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    
    }   
})

router.get("/:id", auth,  async(req, res) => {
    try{
        const {userId} = req.user
        const {id} = req.params;
        const results = await pool.query("SELECT * FROM tasks WHERE id = $1 AND user_id = $2", [id, userId]);
        res.json(results.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

router.post("/", auth, async(req, res) => {
    try {
        const {userId} = req.user
        const {title, description, status} = req.body;
        const results = await pool.query("INSERT INTO tasks (title, description, status, user_id) VALUES ($1, $2, $3, $4) RETURNING *", [title, description, status, userId]);
        // res.status(200).send({message:"Task created"})
        res.json(results.rows[0]);
    } catch (error) {
        console.log(error.messsage)
        res.status(500).send("Server Error")
    }
})

router.put("/:id",auth,  async(req, res) => {
    try {
        const {userId} = req.user
        const {id} = req.params
        const  {title, description, status} = req.body
        const results = await pool.query("UPDATE tasks SET title = $1, description = $2, status = $3 WHERE id = $4 AND user_id = $5 RETURNING *", [title, description, status, id, userId])
        // res.status(200).send({message:"Task updated"})
        res.json(results.rows[0])
     }  
     catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")

    }})
    
router.delete("/:id", auth, async(req, res) => {
    try{
        const {userId} = req.user
        const {id} = req.params
        const results = await pool.query("DELETE FROM tasks WHERE id = $1 AND user_id = $2", [id, userId])
        res.json("Task deleted")

    }catch (err){
            console.log(err.message)
            res.status(500).send("Server Error")
    }
})

module.exports = router