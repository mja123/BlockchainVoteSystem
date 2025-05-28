const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const connectionJson =  process.env.ORG1_CONNECTION_JSON || "../../blockchain/test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json"
console.log('Using connection JSON: ', connectionJson)

const ccpPath = path.resolve(__dirname, connectionJson);
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

async function getContract() {
  // 1. Set up wallet and identity
  const wallet = await Wallets.newFileSystemWallet(path.join(__dirname, 'wallet'));
  // if (!(await wallet.list()).includes('appUser')) {
  //   throw new Error('appUser identity not found in wallet');
  // }

  // 2. Create a new gateway connection
  const gateway = new Gateway();
  await gateway.connect(ccp, {
    wallet,
    identity: 'appUser',
    discovery: { enabled: true, asLocalhost: true }
  });

  // 3. Get the network (channel) and contract
  const network = await gateway.getNetwork('mychannel');
  const contract = network.getContract('basic');

  // 4. We return both contract and gateway so we can disconnect later
  return contract;
}

module.exports = { getContract };
