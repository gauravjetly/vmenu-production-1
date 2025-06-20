// Core models for VMenu Digital Menu System

export interface Organization {
  id: string;
  name: string;
  logo?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
  settings: OrganizationSettings;
}

export interface OrganizationSettings {
  timezone: string;
  currency: string;
  taxRate: number;
  defaultLanguage: string;
  supportedLanguages: string[];
  theme: ThemeSettings;
}

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  logoPosition: 'left' | 'center' | 'right';
  backgroundImage?: string;
  backgroundVideo?: string;
}

export interface Admin {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'manager' | 'editor';
  organizationId: string;
  permissions: Permission[];
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Permission {
  resource: 'menus' | 'items' | 'tvs' | 'users' | 'analytics' | 'settings';
  actions: ('create' | 'read' | 'update' | 'delete')[];
}

export interface Menu {
  id: string;
  organizationId: string;
  name: string;
  description?: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'drinks' | 'desserts' | 'specials' | 'happy_hour' | 'custom';
  layout: MenuLayout;
  categories: Category[];
  isActive: boolean;
  schedule?: Schedule;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  version: number;
}

export interface MenuLayout {
  template: 'grid' | 'list' | 'cards' | 'magazine' | 'custom';
  columns: 1 | 2 | 3 | 4;
  showImages: boolean;
  showDescriptions: boolean;
  showPrices: boolean;
  showCalories: boolean;
  customCSS?: string;
  animations?: AnimationSettings;
}

export interface AnimationSettings {
  enabled: boolean;
  type: 'fade' | 'slide' | 'zoom' | 'none';
  duration: number; // milliseconds
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  displayOrder: number;
  image?: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  organizationId?: string; // Added for direct queries
  name: string;
  description?: string;
  price: number;
  images: string[];
  video?: string;
  categoryId: string;
  tags: string[];
  allergens: string[];
  nutritionalInfo?: NutritionalInfo;
  availability: {
    isAvailable: boolean;
    availableFrom?: string; // time format "HH:MM"
    availableUntil?: string;
    daysOfWeek?: number[]; // 0-6 (Sunday-Saturday)
  };
  variations?: MenuItemVariation[];
  modifiers?: MenuItemModifier[];
  displayOrder: number;
  isPopular?: boolean;
  isNew?: boolean;
  spicyLevel?: 0 | 1 | 2 | 3;
  preparationTime?: number; // minutes
  translations?: Record<string, MenuItemTranslation>;
}

export interface MenuItemTranslation {
  name: string;
  description?: string;
}

export interface MenuItemVariation {
  id: string;
  name: string;
  price: number;
  isDefault?: boolean;
}

export interface MenuItemModifier {
  id: string;
  name: string;
  options: ModifierOption[];
  required: boolean;
  maxSelections: number;
}

export interface ModifierOption {
  id: string;
  name: string;
  price: number;
}

export interface NutritionalInfo {
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  sodium?: number;
  sugar?: number;
}

export interface TVLocation {
  id: string;
  organizationId: string;
  name: string;
  location: string;
  zone?: string; // e.g., "bar", "dining room", "patio"
  ipAddress?: string;
  macAddress?: string;
  screenSize?: string;
  orientation: 'landscape' | 'portrait';
  isActive: boolean;
  isOnline: boolean;
  lastSeen?: Date;
  assignedMenus: TVMenuAssignment[];
  settings: TVSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface TVMenuAssignment {
  menuId: string;
  schedule?: Schedule;
  priority: number;
}

export interface TVSettings {
  brightness: number;
  volume: number;
  autoRefreshInterval: number; // seconds
  showClock: boolean;
  showWeather: boolean;
  showQRCode: boolean;
  qrCodeUrl?: string;
  slideShowInterval?: number; // seconds for rotating menus
}

export interface Schedule {
  id: string;
  name: string;
  startDate?: Date;
  endDate?: Date;
  daysOfWeek: number[]; // 0-6 (Sunday-Saturday)
  startTime: string; // "HH:MM"
  endTime: string; // "HH:MM"
  timezone: string;
}

export interface MediaAsset {
  id: string;
  organizationId: string;
  type: 'image' | 'video' | 'animation';
  url: string;
  thumbnailUrl?: string;
  name: string;
  size: number; // bytes
  dimensions?: {
    width: number;
    height: number;
  };
  duration?: number; // seconds for video
  tags: string[];
  uploadedBy: string;
  createdAt: Date;
}

export interface ActivityLog {
  id: string;
  organizationId: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
}

export interface Analytics {
  id: string;
  organizationId: string;
  tvId: string;
  menuId: string;
  date: Date;
  impressions: number;
  uniqueViews: number;
  averageViewDuration: number; // seconds
  popularItems: {
    itemId: string;
    views: number;
    viewDuration: number;
  }[];
}

// Real-time update events
export interface MenuUpdateEvent {
  type: 'menu_update' | 'item_availability' | 'price_change' | 'menu_switch';
  menuId: string;
  tvIds: string[];
  data: any;
  timestamp: Date;
}

// Import/Export formats
export interface CSVImportRow {
  category: string;
  name: string;
  description?: string;
  price: string;
  image?: string;
  tags?: string;
  allergens?: string;
  calories?: string;
  available?: string;
}

export interface MenuExport {
  menu: Menu;
  organization: Organization;
  exportDate: Date;
  version: string;
}