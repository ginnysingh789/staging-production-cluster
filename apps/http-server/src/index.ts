import express from "express";
import {client} from "@repo/db/client";

const app = express();

// Add JSON middleware to parse request bodies
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hi there")
})

app.post("/signup", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }
        
        console.log(username, password);
        
        const newUser = await client.user.create({
            data: {
                username,
                password
            }
        });
        
        res.status(201).json({ 
            message: "User created successfully", 
            userId: newUser.id 
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: "Failed to create user" });
    }
}); 

app.listen(3002, () => {
    console.log('HTTP server is running on port 3002');
});