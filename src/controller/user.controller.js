import UserService from '../service/user.service.js';

export default class UserController {
    constructor() {
        this.userService = new UserService();
    }

    async addUser(userData) {
        try {

            const userAdded = await this.userService.addUser(userData);
            if (userAdded < 1) {
                throw new Error("User not added")
            }
            return userAdded;
        } catch (error) {
            throw new Error("Error adding user: " + error.message);
        }
    }
}