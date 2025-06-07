'use strict';

const { Contract } = require('fabric-contract-api');

class VoteContract extends Contract {
  // Called during chaincode instantiation or explicit init invocation
  async Init(ctx) {
    console.info('=== VoteContract Init ===');
  }

  // Create a new vote record
  async CreateVote(ctx, voteId, email, candidate, timestamp) {
    const vote = { voteId, email, candidate, timestamp };
    await ctx.stub.putState(voteId, Buffer.from(JSON.stringify(vote)));
    return JSON.stringify(vote);
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
}

module.exports = VoteContract;
