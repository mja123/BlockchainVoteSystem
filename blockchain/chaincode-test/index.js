'use strict';

// Export the contract for Fabric to start via the contract API
const VoteContract = require('./lib/app.js');
module.exports.contracts = [VoteContract];