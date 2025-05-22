import { Router } from "express";
import UserController from "../controller/user.controller.js";

const router = Router();
const controller = new UserController()

router.post("/register", async (req, res) => {
    const userData = req.body;
    
    try {
        console.log(userData)
        const userAdded = await controller.addUser(userData) 
        res.json({ message: `${userAdded} user added successfully.`})
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
})

router.post("/login", async (req, res) => {
    const userData = req.body;
    
    try {
        const user = await controller.authenticate(userData) 
        res.json({ user })
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
})
export default router;