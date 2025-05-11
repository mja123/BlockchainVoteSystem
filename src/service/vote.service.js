import crypto from 'crypto';

export default class VoteService {
    constructor() {
        // Blockchain connection
        this.votes = []
    }

    // Add a vote to the blockchain
    async addVote(voteData) {
        newVote = crypto.randomUUID();
        this.votes.push(newVote);
        return newVote;
    }

    async getAllVotes() {
        return this.votes;
    }

    async getVote(userId) {
        return (this.votes.length !== 0) ? votes[0] : crypto.randomUUID();
    }
}