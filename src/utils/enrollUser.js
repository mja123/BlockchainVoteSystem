/*
 * ES Module version of user enrollment script
 * Transforms require() to import and adds __dirname shim
 */
import { Wallets } from 'fabric-network';
import FabricCAServices from 'fabric-ca-client';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildCAClient, registerAndEnrollUser, enrollAdmin } from './CAUtil.js';
import { buildCCPOrg1, buildWallet } from './AppUtil.js';

// Shim __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, '../wallet');
const userId = 'appUser';

/**
 * Enrolls the admin and registers/enrolls the application user
 */
export async function enrollUser() {
  try {
    // 1. Load the network connection profile
    const ccp = buildCCPOrg1();

    // 2. Build the CA client for Org1
    const caClient = buildCAClient(
      FabricCAServices,
      ccp,
      'ca.org1.example.com'
    );

    // 3. Set up the wallet for identity management
    const wallet = await buildWallet(Wallets, walletPath);

    // 4. Enroll the admin user (if not already enrolled)
    await enrollAdmin(caClient, wallet, mspOrg1);

    // 5. Register and enroll the application user
    await registerAndEnrollUser(
      caClient,
      wallet,
      mspOrg1,
      userId,
      'org1.department1'
    );

    console.log('✅ Successfully enrolled user and admin identities');
  } catch (error) {
    console.error(`❌ Failed to enroll user: ${error}`);
    throw error;
  }
}
