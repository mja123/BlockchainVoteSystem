import VoteService from '../service/vote.service.js';

export default class VoteController {
    constructor() {
        this.voteService = new VoteService();
    }

    async addVote(voteData) {
        try {
            const newVote = await this.voteService.addVote(voteData); // Añadir 'const'
            return newVote;
        } catch (error) {
            throw new Error(`Error adding vote: ${error.message}`);
        }
    }

    async getAllVotes() {
        try {
            const votes = await this.voteService.getAllVotes(); // Añadir 'const'
            return votes;
        } catch (error) {
            throw new Error(`Error retrieving votes: ${error.message}`);
        }
    }

    async getVote(userId) {
        try {
            const userVote = await this.voteService.getVote(userId);
            return userVote;
        } catch (error) {
            throw new Error(`Error getting vote from user ${userId}: ${error.message}`);
        }
    }
}