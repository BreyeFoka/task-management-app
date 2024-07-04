const express = require('express')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const pool = require("../db")

const router = express.Router()

const JWT_SECRET= process.env.JWT_SECRET;

router.post("/register", async(req, res) => {
    const {username, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, hashedPassword])
        res.status(201).send({message:"User Created Successfully"})
    }catch(err){
        console.error(err.message)
        res.status(500).send({message:"Erro registering user"})
    }
}
)

router.post('/login', async (req, res)=> {
    const {username, password} = req.body
    try{
        const result = await pool.query("SELECT * FROM users WHERE username = $1", [username])
        if (result.rows.length === 0) return res.status(401).send({message: "Invalid credentials"})
    
        const user = result.rows[0]
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).send({message: "Invalid credentials"})
        const token = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: "1h"});
        res.status(200).send({message: "Login successful", token})

        }catch(err){
        res.status(500).send({message: "Error login In", err})
    }
})

module.exports = router