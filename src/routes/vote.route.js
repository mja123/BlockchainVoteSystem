import { Router } from "express";
import VoteController from "../controller/vote.controller.js";

const router = Router();
const controller = new VoteController();

router.get("/", async (req, res) => {
    try {
        votes = await controller.getAllVotes()
        res.json({ votes })
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
})

router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).json({ error: "userId is required" });
    }
    try {
        const userVote = await controller.getVote(userId)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
    res.json({ vote: userVote })
})

router.post("/", async (req, res) => {
    const voteData = req.body;

    try {
        userVote = await controller.addVote(voteData)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
    res.json({ vote: userVote })
})

export default router;