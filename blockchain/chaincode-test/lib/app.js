'use strict';

const { Contract } = require('fabric-contract-api');

class VoteContract extends Contract {
  // Called during chaincode instantiation or explicit init invocation
  async Init(ctx) {
    console.info('=== VoteContract Init ===');
  }

  // Create a new vote record
  async CreateVote(ctx, voteId, candidate) {
    const exists = await ctx.stub.getState(voteId);
    if (exists && exists.length > 0) {
      throw new Error(`Vote ${voteId} already exists`);
    }
    const vote = { ID: voteId, Candidate: candidate, Timestamp: new Date().toISOString() };
    await ctx.stub.putState(voteId, Buffer.from(JSON.stringify(vote)));
    return JSON.stringify(vote);
  }

  // Read a vote by ID
  async ReadVote(ctx, voteId) {
    const data = await ctx.stub.getState(voteId);
    if (!data || data.length === 0) {
      throw new Error(`Vote ${voteId} does not exist`);
    }
    return data.toString();
  }

  // Get all votes
  async GetAllVotes(ctx) {
    const iterator = await ctx.stub.getStateByRange('', '');
    const allResults = [];
    while (true) {
      const res = await iterator.next();
      if (res.value) {
        allResults.push(JSON.parse(res.value.value.toString()));
      }
      if (res.done) break;
    }
    return JSON.stringify(allResults);
  }

  // Delete a vote
  async DeleteVote(ctx, voteId) {
    const exists = await ctx.stub.getState(voteId);
    if (!exists || exists.length === 0) {
      throw new Error(`Vote ${voteId} does not exist`);
    }
    await ctx.stub.deleteState(voteId);
  }
}

module.exports = VoteContract;
