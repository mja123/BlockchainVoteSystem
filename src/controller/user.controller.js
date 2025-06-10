import UserService from '../service/user.service.js';

export default class UserController {
    constructor() {
        this.userService = new UserService();
    }

    async addUser(userData) {
        try {
            console.log("Adding user controller");
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
        console.log("Authenticating user controller");
        try {
            const { email, password } = userData;
            const userAdded = await this.userService.authenticate(email, password);
            return userAdded;
        } catch (error) {
            throw new Error("Error getting user: " + error.message);
        }
    }

    async addUserVote(email, voteId) {
        console.log("Adding user vote controller");
        try {
            const userUpdated = await this.userService.addUserVote(email, voteId);
            return userUpdated;
        } catch (error) {
            throw new Error("Error adding vote to user: " + error.message);
        }
    }

    async userAlreadyVoted(email) {
        console.log("Checking if user already voted controller");
        try {
            const userAlreadyVoted = await this.userService.doesUserVoted(email);
            return userAlreadyVoted;
        } catch (error) {
            throw new Error("Error checking if user already voted: " + error.message);
        }
    }
}