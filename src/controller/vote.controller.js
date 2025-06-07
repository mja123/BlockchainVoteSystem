import VoteService from '../service/vote.service.js';
import UserController from './user.controller.js';

export default class VoteController {
    constructor() {
        this.voteService = new VoteService();
    }

    async addVote(voteData) {
        try {
            console.log("Adding vote controller: ", voteData); 
            const userController = new UserController();
            
            const userAlreadyVoted = await userController.userAlreadyVoted(voteData.email)
            console.log("User already voted: ", userAlreadyVoted);
            if (userAlreadyVoted) throw new Error("User already voted");                
            const newVote = await this.voteService.addVote(voteData);
            if (!newVote) {
                throw new Error("Vote not added");
            }
            userController.addUserVote(voteData.email, newVote.voteId);
            console.log("New vote added: ", newVote, " to user: ", voteData.email);
            return newVote;
        } catch (error) {
            console.error("Error in addVote controller: ", error);
            throw new Error(`Error adding vote: ${error.message}`);
        }
    }

    async getAllVotes() {
        try {
            const votes = await this.voteService.getAllVotes();
            return votes;
        } catch (error) {
            throw new Error(`Error retrieving votes: ${error.message}`);
        }
    }
}