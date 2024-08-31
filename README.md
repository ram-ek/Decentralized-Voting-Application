# Decentralized Voting Application
## Overview
- This application is used for voting purposes and utilizes Blockchain for better security and tamper-free process.
- It involves making our own cluster of computers to act as blockchain nodes which would work together to make our own distributed blockchain system.
- It uses go-ethereum (https://geth.ethereum.org/) which is used to build decentralized application.

## Dependencies
1. To create the blockchain network, you need to install go-ethereum(https://geth.ethereum.org/downloads).
2. Node must be installed on the system(https://nodejs.org/en/download)

## Execution (For Windows Only)
1. First run the init.bat file, this will create a directory as Blockchain.
2. Next run the run.bat file, this will start up the blockchain node.
3. Next run the nodejs server with
```
npm start
```
4. Next run the react front-end with
```
npm run dev
```
