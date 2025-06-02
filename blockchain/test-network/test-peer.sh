#! /bin/bash

set -x

# 1. Point at the test-network’s core.yaml
export FABRIC_CFG_PATH=/mnt/c/Users/54261/OneDrive/Desktop/Facultad/Cuarto/baseDeDatosAvanzada/voteSystem/blockchain/config
export CORE_PEER_TLS_ENABLED=true
# 2. Org1 MSP & peer settings
export CORE_PEER_LOCALMSPID=Org1MSP
export CORE_PEER_MSPCONFIGPATH=/mnt/c/Users/54261/OneDrive/Desktop/Facultad/Cuarto/baseDeDatosAvanzada/voteSystem/blockchain/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_TLS_ROOTCERT_FILE=/mnt/c/Users/54261/OneDrive/Desktop/Facultad/Cuarto/baseDeDatosAvanzada/voteSystem/blockchain/test-network/organizations/peerOrganizations/org1.example.com/tlsca/tlsca.org1.example.com-cert.pem
export CORE_PEER_ADDRESS=localhost:7051

# 3. Orderer TLS cert
ORDERER_CA=/mnt/c/Users/54261/OneDrive/Desktop/Facultad/Cuarto/baseDeDatosAvanzada/voteSystem/blockchain/test-network/organizations/ordererOrganizations/example.com/tlsca/tlsca.example.com-cert.pem

# 4. Invoke your chaincode
/mnt/c/Users/54261/OneDrive/Desktop/Facultad/Cuarto/baseDeDatosAvanzada/voteSystem/blockchain/bin/fabric-ca-client identity remove appUser \
  --url https://localhost:7054 --mspdir msp/org1-ca-admin
# /mnt/c/Users/54261/OneDrive/Desktop/Facultad/Cuarto/baseDeDatosAvanzada/voteSystem/blockchain/bin/peer chaincode invoke \
#   --orderer localhost:7050 \
#   --tls --cafile $ORDERER_CA \
#   -C mychannel \
#   -n basic \
#   -c '{"Args":["CreateVote","vote1","Alice"]}'