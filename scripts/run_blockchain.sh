#! /bin/bash
ROOT_PROJECT_DIR=$(dirname $(pwd))

function create_channel() {
    cd fabric-samples/test-network
    ./network.sh down
    ./network.sh up createChannel
}

function package_chaincode() {
    export PATH=${PWD}/../bin:$PATH
    export FABRIC_CFG_PATH=$PWD/../config/
    peer lifecycle chaincode package basic.tar.gz --path $ROOT_PROJECT_DIR/src/service --lang node --label basic_1.0
}

function set_peer_environmets() {
    local organization=$1
    local port=$2
    export CORE_PEER_LOCALMSPID=Org$organizationMSP
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org$organization.example.com/users/Admin@org$organization.example.com/msp
    export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org$organization.example.com/peers/peer0.org$organization.example.com/tls/ca.crt
    export CORE_PEER_ADDRESS=localhost:$port
}


function install_chaincode() {
    peer lifecycle chaincode install basic.tar.gz
}


function export_package_id() {
    package_id=$(peer lifecycle chaincode queryinstalled | grep -oP "basic.*," | sed 's/,//g')
    export CC_PACKAGE_ID=$package_id
}


function approve_chaincode() {
    peer lifecycle chaincode approveformyorg -o localhost:$port --ordererTLSHostnameOverride orderer.example.com --channelID mychannel --name basic --version 1.0 --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem"
}

function commiting_chaincode() {
    peer lifecycle chaincode checkcommitreadiness --channelID mychannel --name basic --version 1.0 --sequence 1 --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" --output json
}

function orderer_commit_chaincode() {
    peer lifecycle chaincode commit -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --channelID mychannel --name basic --version 1.0 --sequence 1 --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt"
    peer lifecycle chaincode querycommitted --channelID mychannel --name basic
}

function invoke_chaincode {
    peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n basic --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" -c '{"function":"InitLedger","Args":[]}'
}

function query_chaincode() {
    peer chaincode query -C mychannel -n basic -c '{"Args":["GetAllAssets"]}'
}

function main() {
    create_channel
    package_chaincode

    set_peer_environmets 1 7051
    install_chaincode
    export_package_id
    approve_chaincode
    commiting_chaincode

    set_peer_environmets 2 9051
    install_chaincode
    export_package_id
    approve_chaincode

    orderer_commit_chaincode
    invoke_chaincode
    query_chaincode
}
main