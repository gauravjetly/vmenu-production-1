// Mock authentication service for development
// This simulates Firebase Auth until real Firebase is configured

import { Admin } from '../models';

const MOCK_ADMIN: Admin = {
  id: 'demo-admin-001',
  email: 'demo@vmenu.com',
  name: 'Demo Admin',
  role: 'super_admin',
  organizationId: 'demo-org-001',
  permissions: [
    { resource: 'menus', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'items', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'tvs', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'users', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'analytics', actions: ['read'] },
    { resource: 'settings', actions: ['read', 'update'] },
  ],
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date(),
  lastLogin: new Date(),
};

export const mockAuth = {
  signInWithEmailAndPassword: async (email: string, password: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (email === 'demo@vmenu.com' && password === 'demo123') {
      return {
        user: {
          uid: MOCK_ADMIN.id,
          email: MOCK_ADMIN.email,
          displayName: MOCK_ADMIN.name,
        }
      };
    }
    
    throw new Error('Invalid credentials');
  },
  
  getAdminData: async (uid: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (uid === MOCK_ADMIN.id) {
      return MOCK_ADMIN;
    }
    
    return null;
  },
  
  signOut: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));
  },
  
  getCurrentUser: () => {
    // Check if user is "logged in" (for demo purposes)
    const isLoggedIn = localStorage.getItem('vmenu_demo_auth') === 'true';
    
    if (isLoggedIn) {
      return {
        uid: MOCK_ADMIN.id,
        email: MOCK_ADMIN.email,
        displayName: MOCK_ADMIN.name,
      };
    }
    
    return null;
  },
  
  setLoggedIn: (value: boolean) => {
    if (value) {
      localStorage.setItem('vmenu_demo_auth', 'true');
    } else {
      localStorage.removeItem('vmenu_demo_auth');
    }
  }
};