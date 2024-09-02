# MetroLink

### Train Service Management System

## Overview

This project is a backend system for managing train services, stations, user accounts, and wallets. It is built using Node.js, Express, and MongoDB and includes features for secure user authentication, train scheduling, station management, wallet transactions, and ticket purchasing.

## Features

- **User Management**:
  - User registration and login with secure JWT authentication.
  - Password hashing with bcrypt for enhanced security.
- **Station Management**:
  - Create, update, and retrieve train station information.
- **Train Management**:
  - Manage train schedules with stops and timings.
  - Create, update, and retrieve train information.
- **Wallet Integration**:
  - Add funds to user wallets.
  - Track wallet balance and transaction history.
- **Ticketing System**:
  - Purchase tickets using wallet balance.
  - Calculate fare based on train stops and deduct from wallet balance.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM library for MongoDB.
- **JWT**: JSON Web Token for authentication.
- **Bcrypt**: Library for hashing passwords.
- **Node-cron**: Scheduler library for Node.js.

## Project Setup

### Prerequisites

- Node.js installed on your machine
- MongoDB installed and running locally or via a cloud service (e.g., MongoDB Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nasimhelal-cell/metro-link
   cd metro-link
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=4000
   DB_URL = mongodb://localhost:27017
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Project Structure

```plaintext
train-service-management/
├── models/
│   ├── User.js
│   ├── Station.js
│   ├── Train.js
│   ├── Wallet.js
│   └── Ticket.js
│   └── index.js
├── routes/
│   ├── auth.js
│   ├── station.js
│   ├── train.js
│   ├── wallet.js
│   └── ticket.js
├── controllers/
│   ├── authController.js
│   ├── stationController.js
│   ├── trainController.js
│   ├── walletController.js
│   └── ticketController.js
├── middlewares/
│   ├── authMiddleware.js
├── .env
├── server.js
└── package.json
```
