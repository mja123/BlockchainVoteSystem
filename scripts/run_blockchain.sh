#! /bin/bash
BLOCKCHAIN_DIR=$(dirname $(pwd))/blockchain

cd $BLOCKCHAIN_DIR/test-network

./network.sh down

./network.sh up createChannel -c mychannel -ca

./network.sh deployCC -ccn basic -ccp  $BLOCKCHAIN_DIR/chaincode-test -ccl javascript

export ORG1_CONNECTION_JSON="./blockchain/test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json"
