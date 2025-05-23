import { Router } from "express";
import VoteController from "../controller/vote.controller.js";

const router = Router();
const controller = new VoteController();

router.get("/", async (req, res) => {
    try {
        const votes = await controller.getAllVotes();
        res.json({ votes });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).json({ error: "userId is required" });
    }
    try {
        const userVote = await controller.getVote(userId);
        res.json({ vote: userVote });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    const voteData = req.body;
    try {
        const userVote = await controller.addVote(voteData);
        res.json({ vote: userVote });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

export default router;