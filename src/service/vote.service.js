import { getContract } from '../utils/blockchainConnection.js';
import { randomUUID } from 'crypto';

export default class VoteService {
    // Agrega un voto a la base de datos
    async addVote(voteData) {
        console.log("Adding vote: ", voteData);
        const { email, candidate } = voteData;
        const voteId = randomUUID(); // Genera un ID único para el voto
        
        try {
            const contract = await getContract();
            const newVote = await contract.submitTransaction('CreateVote', voteId, email, candidate, Date.now().toString());
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
}