# PLBot

Based on a modern, production-ready Discord bot template with TypeScript, Bun, and MongoDB.

![Bun](https://img.shields.io/badge/Bun-v1.1-black)
![Node.js](https://img.shields.io/badge/node-%3E%3D20-brightgreen)
![Discord.js](https://img.shields.io/badge/discord.js-v14-blue)
![TypeScript](https://img.shields.io/badge/typescript-v5-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Issues](https://img.shields.io/github/issues/DFanso/discord-bot-boilerplate)
![Forks](https://img.shields.io/github/forks/DFanso/discord-bot-boilerplate)
![Stars](https://img.shields.io/github/stars/DFanso/discord-bot-boilerplate)

## Quick Start

```sh
git clone https://github.com/aaroncarrizal/PLBot.git
cd PLBot
bun install
cp .env.example .env  # Add your TOKEN, CLIENT_ID, MONGO_URI
bun run dev
```

## Features

- **TypeScript** - Full type safety for robust development
- **MongoDB Integration** - Mongoose ODM for database management
- **Hot Reload** - Nodemon for seamless development experience
- **Slash Commands** - Native Discord slash command support
- **Event-Driven Architecture** - Easy command and event loader pattern
- **Database Seeding** - Seed script for populating initial data
- **Docker Ready** - Deploy anywhere with Docker

## Prerequisites

- [Bun](https://bun.sh) v1.1+ (runtime)
- [Node.js](https://nodejs.org/) v20+ (for Docker)
- [Discord Bot Token](https://discord.com/developers/applications)
- [MongoDB](https://www.mongodb.com/) (local or [Atlas](https://www.mongodb.com/atlas/database))

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/aaroncarrizal/PLBot.git
   cd PLBot
   ```

2. Install the dependencies:
   ```sh
   bun install
   ```

## Configuration

Rename `.env.example` file to `.env` and add your configuration:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
TOKEN=YOUR_BOT_TOKEN
CLIENT_ID=YOUR_CLIENT_ID
NODE_ENV=development
```

## Usage

To start the bot in development mode (with hot reload):

```sh
bun run dev
```

To start the bot in production mode:

```sh
bun run start:prod
```

To register slash commands:

```sh
bun run deploy
```

To check for type errors:

```sh
bun run typecheck
```

## Project Structure

```
discord-bot-boilerplate/
├── src/
│   ├── commands/
│   │   └── hello.ts
│   ├── events/
│   │   └── ready.ts
│   ├── services/
│   │   └── UserService.ts
│   ├── models/
│   │   └── user.ts
│   ├── dto/
│   │   └── UserDTO.ts
│   ├── utils/
│   │   ├── deploy.ts
│   │   ├── database.ts
│   │   └── seed.ts
│   └── index.ts
├── package.json
├── tsconfig.json
├── nodemon.json
└── Dockerfile
```

- **commands/**: Directory for command files.
- **events/**: Directory for event files.
- **services/**: Directory for additional services.
- **dtos/**: Directory for Data Transfer Objects.
- **utils/**: Directory for utility files, such as database connection.
- **index.ts**: Entry point of the bot.

## Commands and Events

- Commands are stored in the `src/commands` directory and must export a `data` property with command metadata and an `execute` function.
- Events are stored in the `src/events` directory and must export a `name` and `execute` function.

### Example Command (`src/commands/hello.ts`)

```typescript
import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Replies with Hello!'),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply('Hello!');
  },
};
```

### Example Event (`src/events/ready.ts`)

```typescript
import { Client, Events } from 'discord.js';

export default {
  name: Events.ClientReady,
  once: true,
  execute(client: Client) {
    console.log(`${client.user?.tag} is online!`);
  },
};
```

## Docker Deployment

```sh
docker build -t discord-bot --build-arg TOKEN=your_token --build-arg CLIENT_ID=your_client_id .
docker run discord-bot
```

## Contributing

You can contribute to the original repo at [DFanso/discord-bot-boilerplate](https://github.com/DFanso/discord-bot-boilerplate.git)

## Support

If you encounter any issues or have questions:

- [Open an issue](https://github.com/DFanso/discord-bot-boilerplate/issues)
- [Discussion forum](https://github.com/DFanso/discord-bot-boilerplate/discussions)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
