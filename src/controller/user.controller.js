import UserService from '../service/user.service.js';
import User from '../service/model/User.js';

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
}