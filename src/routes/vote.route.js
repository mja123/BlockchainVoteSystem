import { Router } from "express";
import VoteController from "../controller/vote.controller.js";

const router = Router();
const controller = new VoteController();

router.get("/", async (req, res) => {
    try {
        const votes = await controller.getAllVotes();
        res.status(200).json({ votes });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    const voteData = req.body;
    try {
        console.log("Received vote data: ", voteData);
        const userVote = await controller.addVote(voteData);
        res.status(201).json({ vote: userVote });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

export default router;