# TV Menu Designer System

A professional TV Digital Menu Designer System for creating and managing digital menu displays, similar to DSMenu. Built with React, Fabric.js, Node.js, and WebSocket for real-time updates.

## Features

- 🎨 **Professional Canvas Designer** - 1920x1080px canvas with Fabric.js
- 📱 **Multi-Device Support** - TVs, tablets, mobile, kiosks, web browsers
- 🔄 **Real-time Updates** - WebSocket-based live menu updates
- 👥 **Multi-tenant SaaS** - Organization and user management
- 📊 **Analytics Dashboard** - Track views, interactions, and performance
- 🎯 **Template System** - Pre-built templates for restaurants, cafes, retail
- 🔐 **Role-based Access** - Granular permissions system
- 💾 **Auto-save & Version Control** - Never lose your work
- 🌐 **Offline Support** - Player app works without internet
- 📤 **Cloud Storage** - AWS S3 integration for media files

## Tech Stack

### Frontend
- **Designer App**: React 18, TypeScript, Fabric.js, Redux Toolkit, Tailwind CSS
- **Player App**: React 18, TypeScript, Service Workers, IndexedDB
- **UI Components**: Radix UI, Lucide Icons
- **State Management**: Redux Toolkit, React Query
- **Build Tool**: Vite

### Backend
- **API**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL with Knex.js
- **Cache**: Redis
- **WebSocket**: Socket.io
- **Authentication**: JWT with refresh tokens
- **File Storage**: AWS S3 (optional)

### Infrastructure
- **Monorepo**: Lerna
- **Containerization**: Docker & Docker Compose
- **Testing**: Jest, Vitest, Testing Library
- **Code Quality**: ESLint, Prettier

## Project Structure

```
tv-menu-designer/
├── packages/
│   ├── shared/          # Shared types, utilities, and constants
│   ├── backend/         # Express.js API server
│   ├── designer/        # React designer application
│   └── player/          # React player application
├── infrastructure/
│   └── docker/          # Docker configuration files
├── docs/                # Documentation
└── scripts/             # Build and deployment scripts
```

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0
- PostgreSQL >= 14
- Redis >= 7
- Docker & Docker Compose (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/tv-menu-designer.git
cd tv-menu-designer
```

2. Install dependencies:
```bash
npm run install:all
```

3. Set up environment variables:
```bash
cp packages/backend/.env.example packages/backend/.env
# Edit .env with your configuration
```

4. Start the development servers:
```bash
# Start all services
npm run dev

# Or start individually
npm run dev:backend    # Backend API
npm run dev:designer   # Designer app
npm run dev:player     # Player app
```

### Using Docker

1. Start the infrastructure:
```bash
npm run docker:up
```

2. Run database migrations:
```bash
cd packages/backend
npm run migrate
```

## Development

### Available Scripts

- `npm run dev` - Start all services in development mode
- `npm run build` - Build all packages
- `npm run test` - Run tests for all packages
- `npm run lint` - Lint all packages
- `npm run clean` - Clean all node_modules and build artifacts

### Database Migrations

```bash
cd packages/backend
npm run migrate        # Run migrations
npm run migrate:make   # Create new migration
npm run seed           # Run seed data
```

## API Documentation

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Menus

- `GET /api/menus` - List menus
- `POST /api/menus` - Create menu
- `GET /api/menus/:id` - Get menu details
- `PUT /api/menus/:id` - Update menu
- `DELETE /api/menus/:id` - Delete menu
- `POST /api/menus/:id/publish` - Publish menu

### Devices

- `GET /api/devices` - List devices
- `POST /api/devices/register` - Register device
- `GET /api/devices/:id` - Get device details
- `PUT /api/devices/:id` - Update device
- `DELETE /api/devices/:id` - Delete device
- `POST /api/devices/:id/assign-menu` - Assign menu to device

## WebSocket Events

### Client → Server

- `menu:update` - Notify devices of menu update
- `menu:edit` - Collaborative editing changes
- `device:register` - Register new device
- `device:status` - Update device status

### Server → Client

- `menu:refresh` - Menu needs refresh
- `menu:changes` - Collaborative changes
- `device:statusUpdate` - Device status changed
- `device:command` - Execute device command

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@tvmenudesigner.com or join our Slack channel.