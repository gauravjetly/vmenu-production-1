# VMenu - Digital Menu Management System

VMenu is an advanced, intuitive, and scalable digital menu management system that empowers admins to create, update, and manage dynamic digital menu boards in real-time across multiple TVs and restaurant locations.

## 🚀 Features

### Core Functionality
- **Drag-and-Drop Menu Builder**: Create stunning menus with advanced layout customization
- **Real-Time Updates**: Instant menu updates across all connected displays
- **TV Location Management**: Visual floor plan interface for managing multiple screens
- **Rich Media Support**: Images, videos, animations, and dynamic content
- **Multi-Language Support**: Serve diverse customer bases with translations
- **Role-Based Access Control**: Secure admin system with granular permissions
- **Analytics Dashboard**: Track menu performance and customer engagement

### Advanced Features
- **Scheduling System**: Time-based menu switching (breakfast, lunch, dinner)
- **Offline Mode**: TVs continue displaying cached content without internet
- **POS Integration**: Real-time price and availability sync
- **Bulk Import/Export**: CSV/Excel support for menu items
- **Custom Branding**: Fully customizable themes and layouts
- **Mobile-Responsive Admin**: Manage menus on-the-go

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context + React Query
- **Backend**: Firebase (Firestore, Auth, Storage, Functions)
- **Real-Time**: WebSockets / Firebase Realtime Database
- **UI Components**: Lucide Icons, React Hot Toast
- **Drag & Drop**: @dnd-kit

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Firebase account
- Modern web browser

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   cd /Users/gauravjetly/VMenu/vmenu
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your Firebase configuration

4. **Start development server**
   ```bash
   npm run dev
   ```
   Open http://localhost:5173 in your browser

## 📁 Project Structure

```
vmenu/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── auth/       # Authentication components
│   │   ├── common/     # Shared components
│   │   ├── menu/       # Menu-related components
│   │   ├── tv/         # TV display components
│   │   └── admin/      # Admin dashboard components
│   ├── contexts/       # React contexts
│   ├── hooks/          # Custom React hooks
│   ├── models/         # TypeScript interfaces
│   ├── pages/          # Page components
│   ├── services/       # API and business logic
│   ├── utils/          # Utility functions
│   └── config/         # Configuration files
├── public/            # Static assets
└── ...config files
```

## 🔐 Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🏗️ Development Roadmap

### Phase 1 (MVP) ✅
- [x] Project setup and architecture
- [x] Authentication system
- [x] Basic admin dashboard
- [ ] Menu builder interface
- [ ] TV display application
- [ ] Real-time updates

### Phase 2
- [ ] Scheduling system
- [ ] Analytics dashboard
- [ ] POS integrations
- [ ] Advanced media management

### Phase 3
- [ ] Multi-location support
- [ ] AI-powered recommendations
- [ ] Advanced analytics
- [ ] Mobile applications

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 👥 Contact

For questions or support, please contact the VMenu team.

---

Built with ❤️ for the restaurant industry
