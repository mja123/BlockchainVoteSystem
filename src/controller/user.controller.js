import UserService from '../service/user.service.js';

export default class UserController {
    constructor() {
        this.userService = new UserService();
    }

    async addUser(userData) {
        try {
            const userAdded = await this.userService.createUser(userData);

            if (userAdded < 1) {
                throw new Error("User not added")
            }
            return userAdded;
        } catch (error) {
            throw new Error("Error adding user: " + error.message);
        }
    }

    async authenticate(userData) {
        try {
            const { email, password } = userData;
            const userAdded = await this.userService.authenticate(email, password);
            return userAdded;
        } catch (error) {
            throw new Error("Error getting user: " + error.message);
        }
    }

    async addUserVote(email, voteId) {
        try {
            const userUpdated = await this.userService.addUserVote(email, voteId);
            return userUpdated;
        } catch (error) {
            throw new Error("Error adding vote to user: " + error.message);
        }
    }

    async userAlreadyVoted(email) {
        try {
            const userAlreadyVoted = await this.userService.doesUserVoted(email);
            return userAlreadyVoted;
        } catch (error) {
            throw new Error("Error checking if user already voted: " + error.message);
        }
    }
}