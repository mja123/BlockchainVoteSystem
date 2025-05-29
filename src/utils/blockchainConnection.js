/*
 * ES Module version of fabric client for Express
 */
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { Gateway, Wallets } from 'fabric-network';
import { enrollUser }  from './enrollUser.js';

// __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determine connection profile path
const connectionJson = process.env.ORG1_CONNECTION_JSON
  || '../../blockchain/test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json';
console.log('Using connection JSON:', connectionJson);

// Load and parse the connection profile
const ccpPath = path.resolve(__dirname, connectionJson);
if (!fs.existsSync(ccpPath)) {
  throw new Error(`No such file or directory: ${ccpPath}`);
}
const raw = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(raw);

// Enroll or register the user before using the contract
await enrollUser();

/**
 * Returns a Fabric contract instance for submitting transactions
 */
export async function getContract() {
  // 1. Set up wallet and identity
  const wallet = await Wallets.newFileSystemWallet(
    path.resolve(__dirname, '../wallet')
  );

  // 2. Create a new gateway connection
  const gateway = new Gateway();
  await gateway.connect(ccp, {
    wallet,
    identity: 'appUser',
    discovery: { enabled: false, asLocalhost: true }
  });

  // 3. Get the network (channel) and contract
  const network = await gateway.getNetwork('mychannel');
  const contract = network.getContract('basic');

  return contract;
}
