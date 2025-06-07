#! /bin/bash
set -x
ROOT_PROJECT_DIR=$(dirname $(pwd))
cd $ROOT_PROJECT_DIR/blockchain/test-network

if [ $(docker ps -a --format '{{ .Names }}' | grep -c "orderer.example.com") == 0 ]; then
    echo "Cleaning up blockchain"
    rm -rf $ROOT_PROJECT_DIR/src/wallet
    ./network.sh down
    echo "Creating blockchain network"
    ./network.sh up createChannel -c mychannel -ca
    ./network.sh deployCC -ccn basic -ccp  $ROOT_PROJECT_DIR/blockchain/chaincode -ccl javascript
else
    ./network.sh up
fi

export ORG1_CONNECTION_JSON="./blockchain/test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json"
