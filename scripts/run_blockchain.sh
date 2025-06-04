#! /bin/bash
ROOT_PROJECT_DIR=$(dirname $(pwd))

rm -rf $ROOT_PROJECT_DIR/src/wallet

cd $ROOT_PROJECT_DIR/blockchain/test-network

./network.sh down


./network.sh up createChannel -c mychannel -ca

./network.sh deployCC -ccn basic -ccp  $ROOT_PROJECT_DIR/blockchain/chaincode-test -ccl javascript

export ORG1_CONNECTION_JSON="./blockchain/test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json"
