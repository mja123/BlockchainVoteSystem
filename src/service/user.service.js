import { getConnection } from "../utils/dbConnection.js";
import bcrypt from 'bcrypt';

export default class UserService {
    constructor() {
        this.db = getConnection();
    }

    // Registro con hash de contraseña
    async createUser(userData) {
        console.log("Creating user in service");
        const { name, email, password } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const query = `
            INSERT INTO vote_schema.users (name, email, password) 
            VALUES ($1, $2, $3) 
            RETURNING *
        `;
        const result = await this.db.query(query, [name, email, hashedPassword]);
        console.log("User created: ", result.rows[0]);
        return result.rows[0];
    }

    // Autenticación
    async authenticate(email, password) {
        console.log("Authenticating user in service");
        const query = "SELECT * FROM vote_schema.users WHERE email = $1";
        const result = await this.db.query(query, [email]);
        if (result.rows.length === 0) throw new Error("User not found");
        
        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) throw new Error("Incorrect password");
        
        return user;
    }

    async addUserVote(email, voteId) {
        console.log("Adding user vote in service");
        const query = `UPDATE vote_schema.users SET vote_hash = $1 WHERE email = $2 RETURNING *`;
        const result = await this.db.query(query, [voteId, email]);
        if (result.rows.length === 0) throw new Error("User not found");
        console.log("User updated with vote hash: ", result.rows[0]);
        return result.rows[0];
    }

    // Validate if user has already voted
    async doesUserVoted(email) {
        console.log("Checking if user already voted in service");
        const query = "SELECT * FROM vote_schema.users WHERE email = $1 AND vote_hash IS NOT NULL";
        const result = await this.db.query(query, [email]);
        return result.rows.length > 0;
    }
}