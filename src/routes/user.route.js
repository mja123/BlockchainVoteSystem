import { Router } from "express";
import UserController from "../controller/user.controller.js";
import User from "../service/model/User.js";

const router = Router();
const controller = new UserController()

router.post("/register", async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, password } = req.body;
        const newUser = new User(name, email, password);
        const userAdded = await controller.addUser(newUser) 
        res.status(201).json({ message: `${userAdded} user added successfully.`})
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message });
    }
})

router.post("/login", async (req, res) => {
    const userData = req.body;
    
    try {
        const user = await controller.authenticate(userData) 
        res.status(200).json({ user })
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
})
export default router;