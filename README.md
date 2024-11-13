# digit-draw-app

## Overview

The `digit-draw-app` is a web application designed for managing and participating in a digit-based betting game. Users can place bets on 4-digit numbers, and winnings are distributed proportionally based on user contributions. The application includes features for user authentication, bet placement, round management, and result calculation.

## Features

- **User Authentication**: Secure user registration and login using JWT (JSON Web Token) authentication.
- **Bet Placement**: Users can place bets on 4-digit numbers for active rounds.
- **Round Management**: Admins can initialize new rounds, update winning numbers, and end rounds.
- **Result Calculation**: At the end of each round, the application calculates and displays user winnings and contributions.
- **Proportional Payouts**: Winnings are distributed proportionally based on user contributions to the total pool.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MySQL

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/digit-draw-app.git
   cd digit-draw-app
   ```

2. Install dependencies:

```
npm install
```

3. Set up the MySQL database:

- Create a new MySQL database named digit_draw.
- Update the database configuration in src/app.module.ts with your MySQL credentials.

4. Set up environment variables:

- Create a .env file in the root directory and add the following variables:

```
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

## Running the Application

### Start the NestJS application:

```
npm run start
```

## Start the Admin and Frontend applications

### Navigate to the respective directories and run:

```
cd digit-draw-admin
npm install
npm run start
```

```
cd digit-draw-frontend
npm install
npm run start
```

## API Endpoints

### Authentication

- **POST /auth/register**: Register a new user.
- **POST /auth/login**: Login and receive a JWT token.

### Bets

- **POST /bet/placeBet**: Place a new bet.
- **GET /bet/userBetsAndWinnings/:userId**: Get the user's recent bets and winnings.

### Rounds

- **POST /round/initRound**: Initialize a new round.
- **PUT /round/updateRoundNumber/:roundId**: Update the winning number for a round.
- **POST /round/endRound/:roundId**: End a round and calculate results.
- **GET /round/rounds**: Get rounds by status.
