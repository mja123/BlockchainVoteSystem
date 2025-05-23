import { getConnection } from '../utils/dbConnection.js';

export default class VoteService {
    constructor() {
        this.pool = getConnection();
    }

    // Agrega un voto a la base de datos
    async addVote(voteData) {
        const { userId, candidate, voteHash } = voteData;
        const query = `
            INSERT INTO vote_schema.votes (user_id, candidate)
            VALUES ($1, $2)
            RETURNING *;
        `;
        const values = [userId, candidate];
        const result = await this.pool.query(query, values);

        // Opcional: actualizar el hash del voto en la tabla de usuarios
        if (voteHash) {
            await this.pool.query(
                'UPDATE vote_schema.users SET vote_hash = $1 WHERE id = $2',
                [voteHash, userId]
            );
        }

        return result.rows[0];
    }

    // Obtiene todos los votos
    async getAllVotes() {
        const result = await this.pool.query('SELECT * FROM vote_schema.votes');
        return result.rows;
    }

    // Obtiene el voto de un usuario específico
    async getVote(userId) {
        const result = await this.pool.query(
            'SELECT * FROM vote_schema.votes WHERE user_id = $1',
            [userId]
        );
        return result.rows[0] || null;
    }
}