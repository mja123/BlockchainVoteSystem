#! /bin/bash
BLOCKCHAIN_DIR=$(dirname $(pwd))/blockchain

cd $BLOCKCHAIN_DIR/test-network

./network.sh down

./network.sh up createChannel -c mychannel -ca

./network.sh deployCC -ccn basic -ccp  $BLOCKCHAIN_DIR/chaincode -ccl javascript

