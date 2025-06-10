import { Router } from "express";
import UserController from "../controller/user.controller.js";
import User from "../service/model/User.js";

const router = Router();
const controller = new UserController()

router.post("/register", async (req, res) => {
    try {
        console.log("Received user registration data");
        const { name, email, password } = req.body;
        const newUser = new User(name, email, password);
        const userAdded = await controller.addUser(newUser) 
        res.status(201).json({ message: `${userAdded} user added successfully.`})
    } catch (error) {
        if (error.message.includes("duplicate key value")) {
            console.error(`Error during user registration: ${error.message}`);
            return res.status(409).json({ error: "User already exists" });
        }
        console.error("Error registring user: ", error)
        return res.status(400).json({ error: error.message });
    }
})

router.post("/login", async (req, res) => {
    console.log("Received user login data");
    const userData = req.body;
    try {
        const user = await controller.authenticate(userData) 
        res.status(200).json({ user })
    } catch (error) {
        console.error(`Error during user login: ${error.message}`);
        if (error.message.includes("User not found") | error.message.includes("Incorrect password")) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(400).json({ error: error.message });
    }
})
export default router;