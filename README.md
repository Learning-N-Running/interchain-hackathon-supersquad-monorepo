# SuperSquad Monorepo for Interchain Hackathon
## What is SuperSquad?
SuperSquad is a SocialFi platform that enables people to connect to Web3 based on real-life actions.

## Overview

This repository contains the SuperSquad project developed for the Interchain Hackathon. The project aims to create a decentralized fitness challenge platform where users can participate in challenges, deposit tokens, and earn rewards. This project is deployed on the Osmosis Testnet 5 and integrates with Keplr wallet for seamless user experience. It utilizes Next.js for server-side rendering and is built using CosmWasm for smart contract functionality.

## Features

- **Smart Contract Deployment**: Contracts are deployed on the Osmosis-test-5 network.
- **Keplr Wallet Integration**: Users can connect their Keplr wallets for transactions.
- **Server-Side Rendering**: Utilizes Next.js for server-side rendering.
- **Challenge Information**: Users can view challenge details and deposit OMSO tokens.
- **Photo Verification**: Users upload a photo of their weighing scale for verification.
- **Reward Distribution**: OSMO tokens are paid back upon successful challenge completion.

## Tech Stack

- Smart Contracts: CosmWasm, Rust
- Frontend: Next.js, Typescript, styled-components
- Libraries: OsmoJS, CosmoJS, Cosmos Kit

## Getting Started

### Prerequisites

- Node.js
- Yarn or npm
- Keplr Wallet

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Learning-N-Running/interchain-hackathon-supersquad-monorepo.git
   ```

2. Install dependencies
   ```bash
   yarn install
   ```

3. Start the development server
   ```bash
   yarn dev
   ```

## Usage

1. Connect your Keplr Wallet.
2. Choose a challenge and deposit OMSO tokens.
3. Upload a photo for verification.
4. Complete the challenge and earn OSMO tokens.

