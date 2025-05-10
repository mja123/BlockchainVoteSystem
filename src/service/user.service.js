import { getConnection } from "../utils/dbConnection.js";

export default class UserService {
    constructor() {
        this.db = getConnection()
    }

    async addUser(userData) {
        try {
            const { name, email } = userData;
            console.log(`Name: ${name}, email: ${email}`)
            const query = "INSERT INTO vote_schema.users (name, email) VALUES ($1, $2)";
            const result = await this.db.query(query, [name, email]);
            return result.rowCount;
        } catch (error) {
            throw new Error("Error adding user: " + error.message);
        }
    }
}