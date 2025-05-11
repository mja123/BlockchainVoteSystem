import VoteService from '../service/vote.service.js';

export default class VoteController {
    constructor() {
        this.voteService = new VoteService();
    }

    async addVote(voteData) {
        try {
            newVote = await this.voteService.addVote(voteData);
        } catch (error) {
            throw new Error(`Error adding vote: ${error.message}`);
        }
        return newVote;
    }

    async getAllVotes() {
        try {
            votes = await this.voteService.getAllVotes();
        } catch (error) {
            throw new Error(`Error retrieving votes: ${error.message}`);
        }
        return votes;
    }

    async getVote(userId) {
        try {
            userVote = await this.voteService.addVote(voteData);
        } catch (error) {
            throw new Error(`Error getting vote from user ${userId}: ${error.message}`);
        }
    }
}