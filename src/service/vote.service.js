import { getConnection } from '../utils/dbConnection.js';
import { getContract } from '../utils/blockchainConnection.js';

export default class VoteService {
    constructor() {
        this.pool = getConnection();
    }

    // Agrega un voto a la base de datos
    async addVote(voteData) {
        console.log("Adding vote: ", voteData);
        const { userId, candidate } = voteData;
        try {
            const contract = await getContract();
            await contract.submitTransaction('createVote', 1, userId, candidate);
        } catch (error) {
            console.error("Error adding vote: ", error)
        }
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