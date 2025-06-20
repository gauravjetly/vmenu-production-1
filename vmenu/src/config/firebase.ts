import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
import { getFunctions } from 'firebase/functions';

// TODO: Replace with your Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

// Initialize Analytics only in production
export const analytics = import.meta.env.PROD ? getAnalytics(app) : null;

// Firestore collection names
export const COLLECTIONS = {
  ORGANIZATIONS: 'organizations',
  ADMINS: 'admins',
  MENUS: 'menus',
  MENU_ITEMS: 'menuItems',
  CATEGORIES: 'categories',
  TV_LOCATIONS: 'tvLocations',
  MEDIA_ASSETS: 'mediaAssets',
  ACTIVITY_LOGS: 'activityLogs',
  ANALYTICS: 'analytics',
  SCHEDULES: 'schedules'
} as const;

// Storage bucket paths
export const STORAGE_PATHS = {
  MENU_IMAGES: 'menu-images',
  MENU_VIDEOS: 'menu-videos',
  ORGANIZATION_LOGOS: 'organization-logos',
  BACKGROUNDS: 'backgrounds'
} as const;