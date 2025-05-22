import { getConnection } from "../utils/dbConnection.js";
import bcrypt from 'bcrypt';

export default class UserService {
    constructor() {
        this.db = getConnection();
    }

    // Registro con hash de contraseña
    async createUser(userData) {
        const { name, email, password } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const query = `
            INSERT INTO vote_schema.users (name, email, password) 
            VALUES ($1, $2, $3) 
            RETURNING *
        `;
        const result = await this.db.query(query, [name, email, hashedPassword]);
        console.log(result.rows[0]);
        return result.rows[0];
    }

    // Autenticación
    async authenticate(email, password) {
        const query = "SELECT * FROM vote_schema.users WHERE email = $1";
        const result = await this.db.query(query, [email]);
        if (result.rows.length === 0) throw new Error("Usuario no existe");
        
        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) throw new Error("Contraseña incorrecta");
        
        return user;
    }
}