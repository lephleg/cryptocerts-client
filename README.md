# CryptoCerts Client

This repository contains the web client application of CryptoCerts project, a decentralized academic certificate registry built on Ethereum. 

This project is written in [Solidity](https://docs.soliditylang.org/) utilizing [Ganache CLI](https://docs.nethereum.com/en/latest/ethereum-and-clients/ganache-cli/), [Truffle](https://www.trufflesuite.com/truffle) and [IPFS](https://ipfs.io/), along with a [React](https://reactjs.org/) web client application with [Redux](https://redux.js.org/) and [web3.js](https://github.com/ethereum/web3.js/).

For the smart contracts repository see [cryptocerts-contracts](https://github.com/lephleg/cryptocerts-contracts).

## Setup Instructions using Docker

### Prerequisites

To use the packaged environment you will need [Docker Desktop](https://www.docker.com/products/docker-desktop) for your operating system. Please ensure [Docker Compose](https://docs.docker.com/compose/install/) is also available.

### Steps
* Clone the contracts repository into a directory:
    ```
    $ git clone git@github.com:lephleg/cryptocerts-contracts.git .
    ```
* Clone the client repository in a subdirectory named `client`:
    ```
    $ git clone git@github.com:lephleg/cryptocerts-client.git client
    ```
* While remaining at the root directory, execute the following command to spin up the `ganache-cli` and `truffle` containers:
    ```
    $ docker-compose up -d
    ```
* Install contract dependencies using `npm` in the `truffle` container: 
    ```
    $ docker exec -it truffle npm install --silent
    ```
* In order to compile and deploy the contracts in Ganache use:
    ```
    $ docker exec -it truffle truffle migrate
    ```
* Write down the address of the newly deployed CryptoCerts contract found in the output of the previous command.
* Navigate to the `client` directory.
* Make a copy of the `.env.example` configuration file named `.env.local`:
    ```
    $ cp .env.example .env.local
    ```
* Paste the address of the CryptoCerts contract as the value of the `REACT_APP_CRYPTOCERTS_CONTRACT_ADDRESS` key in `.env.local`.
* While remaining in the `client` subdirectory spin up the `cryptocerts-client` application container along with the `ipfs` local node:
    ```
    $ docker-compose up -d
    ```
* Configure IPFS CORS policy to allow connections from localhost and restart container to apply the new configuration:
    ```
    $ docker exec -it ipfs ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
    $ docker exec -it ipfs ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["GET", "POST"]'
    $ docker restart ipfs
    ```
* Point your browser to http://localhost:3001 in order to access the web client application.

## Available Scripts

This repository was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 

Check the documentation [here](https://create-react-app.dev/docs/available-scripts/) for all the available scripts, which are still accessible in the `cryptocerts-client` container in the project root directory.

## Reset the IPFS files

In order to reset the IPFS files, stored from previous runs in your local IPFS node, use the following steps:

* Remove the `ipfs` container:
    ```
    $ docker rm -f ipfs
    ```
* Remove any files located in the `client/ipfs` directory
    ```
    $ rm -rf client/ipfs
    ```
* While being in client project root, recreate the container:
    ```
    $ docker-compose up -d
    ```
