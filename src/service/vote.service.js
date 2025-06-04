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
        console.log(process.env.FABRIC_CFG_PATH)
        try {
            const contract = await getContract();
            const newVote = await contract.submitTransaction('CreateVote', 1, userId, candidate, Date.now().toString());
            return JSON.parse(newVote.toString('utf8'));
        } catch (error) {
            console.error("Error adding vote: ", error)
        }
    }

    // Obtiene todos los votos
    async getAllVotes() {
        console.log("Fetching all votes");
        try {
            const contract = await getContract();
            const allVotes = await contract.submitTransaction('GetAllVotes');
            return JSON.parse(allVotes.toString('utf8'));
        } catch (error) {
            console.error("Error adding vote: ", error)
        }
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