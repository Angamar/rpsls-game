# 🪨📄✂️🦎🖖 Rock Paper Scissors Lizard Spock

Welcome to **Rock Paper Scissors Lizard Spock** – an extended twist on the classic game popularized by The Big Bang Theory! Experience the strategic depth of five choices instead of three.

---

## 🎮 Game Rules

- The game is played in **Sets**, and each **Set** consists of **five rounds**.
- Players start each Set with _five unique cards_, one for each choice.
- Each round, they play one of their remaining cards. Once all five cards have been played, the Set ends.
- The player who wins **the most rounds** wins the Set.
- In case of a tie, the Set is awarded to the player who was the **last to win a round**.

Each choice wins against two others, loses to two others, and ties with itself!

- **Rock** crushes **Scissors** and **Lizard**
- **Paper** covers **Rock** and disproves **Spock**
- **Scissors** cuts **Paper** and decapitates **Lizard**
- **Lizard** poisons **Spock** and eats **Paper**
- **Spock** smashes **Scissors** and vaporizes **Rock**

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **Yarn** (v4.x)
- **Docker** (optional, for containerized setup)

### 🐳 Docker Setup (Recommended)

```bash
# Clone the repository
git clone https://github.com/Angamar/rpsls-game.git
cd rpsls-game

# Start with Docker Compose
docker compose up --build

# Access the game
open http://localhost:8080
```

### 💻 Local Development

```bash
# Clone and install dependencies
git clone https://github.com/Angamar/rpsls-game.git
cd rpsls-game
yarn install

# Start development servers
yarn dev

# Or start individually
yarn workspace rpsls-game-api dev    # API on :3000
yarn workspace rpsls-game-ui dev     # UI on :3001
```

### 🏗️ Production Build

```bash
# Build all packages
yarn build

# Start production packages
yarn start
```

---

## 🏗️ Project Structure

```
rpsls-game/
├── packages/
│   ├── ui/              # React frontend
│   │   ├── src/
│   │   ├── cypress/     # E2E tests
│   │   └── Dockerfile
│   ├── api/             # Express backend
│   │   ├── src/
│   │   └── Dockerfile
│   └── shared/          # Shared types & utilities
│       └──src/
└── docker-compose.yml
```

---

## 🛠️ Technology Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for fast development
- **CSS Modules** for styling
- **Vitest** for unit testing
- **Cypress** for E2E testing

### Backend

- **Node.js** with Express
- **TypeScript** with ES modules
- **Zod** for validation
- **Vitest** for testing

### DevOps

- **Docker** & Docker Compose
- **Yarn Workspaces** (monorepo)
- **ESLint** & **Prettier**
- **Husky** for git hooks

---

## 🧪 Testing

```bash
# Run all tests
yarn test

# Run specific package tests
yarn workspace rpsls-game-ui test
yarn workspace rpsls-game-api test

# Run E2E tests (requires running app)
yarn workspace rpsls-game-ui cypress:open
```

---

## 📦 Package Scripts

### UI Package

- `yarn workspace rpsls-game-ui dev` - Start dev server
- `yarn workspace rpsls-game-ui build` - Build for production
- `yarn workspace rpsls-game-ui start` - Start production server

- `yarn workspace rpsls-game-ui test` - Run unit tests
- `yarn workspace rpsls-game-ui cypress:open` - Open Cypress

### API Package

- `yarn workspace rpsls-game-api dev` - Start dev server
- `yarn workspace rpsls-game-api build` - Build for production
- `yarn workspace rpsls-game-api start` - Start production server
- `yarn workspace rpsls-game-api test` - Run tests

### Shared Package

- `yarn workspace @rpsls-game/shared build` - Build shared package

---

## 🌐 Endpoints

| Endpoint       | Method | Description                |
| -------------- | ------ | -------------------------- |
| `/api/choices` | GET    | Get all available choices  |
| `/api/choice`  | GET    | Get random computer choice |
| `/api/play`    | POST   | Play a round               |

---

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**

```bash
# Check what's using the port
lsof -i :3000
lsof -i :8080

# Kill the process
kill -9 <PID>
```

**Docker issues:**

```bash
# Reset Docker state
docker compose down
docker system prune -a
docker compose up --build
```

**Dependency issues:**

```bash
# Clean install
yarn reset
```

## 🙏 Acknowledgments

> _"Rock, Paper, Scissors, Lizard, Spock. It's very simple: Scissors cuts Paper. Paper covers Rock. Rock crushes Lizard. Lizard poisons Spock. Spock smashes Scissors. Scissors decapitates Lizard. Lizard eats Paper. Paper disproves Spock. Spock vaporizes Rock. And as it always has, Rock crushes Scissors."_  
> — **Sheldon Cooper**, The Big Bang Theory

---
