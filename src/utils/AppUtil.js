/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Derive __filename and __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Load the connection profile for Org1
 */
export function buildCCPOrg1() {
  const ccpPath = path.resolve(
    __dirname,
    '..',
    '..',
    'blockchain',
    'test-network',
    'organizations',
    'peerOrganizations',
    'org1.example.com',
    'connection-org1.json'
  );
  if (!fs.existsSync(ccpPath)) {
    throw new Error(`no such file or directory: ${ccpPath}`);
  }
  const contents = fs.readFileSync(ccpPath, 'utf8');
  const ccp = JSON.parse(contents);
  console.log(`Loaded the network configuration located at ${ccpPath}`);
  return ccp;
}

/**
 * Load the connection profile for Org2
 */
export function buildCCPOrg2() {
  const ccpPath = path.resolve(
    __dirname,
    '..',
    '..',
    'blockchain',
    'test-network',
    'organizations',
    'peerOrganizations',
    'org2.example.com',
    'connection-org2.json'
  );
  if (!fs.existsSync(ccpPath)) {
    throw new Error(`no such file or directory: ${ccpPath}`);
  }
  const contents = fs.readFileSync(ccpPath, 'utf8');
  const ccp = JSON.parse(contents);
  console.log(`Loaded the network configuration located at ${ccpPath}`);
  return ccp;
}

/**
 * Create a new wallet for identities, either file system or in-memory
 * @param {import('fabric-network').Wallets} Wallets - Wallets API from fabric-network
 * @param {string} [walletPath] - Optional path to file system wallet
 */
export async function buildWallet(Wallets, walletPath) {
  let wallet;
  if (walletPath) {
    wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Built a file system wallet at ${walletPath}`);
  } else {
    wallet = await Wallets.newInMemoryWallet();
    console.log('Built an in memory wallet');
  }
  return wallet;
}

/**
 * Pretty-print a JSON string
 * @param {string} inputString - Raw JSON string
 * @returns {string} Pretty-printed JSON
 */
export function prettyJSONString(inputString) {
  if (inputString) {
    return JSON.stringify(JSON.parse(inputString), null, 2);
  }
  return inputString;
}
