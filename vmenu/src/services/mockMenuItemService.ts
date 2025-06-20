// Mock menu item service for development
import { MenuItem } from '../models';

const MOCK_ITEMS: MenuItem[] = [
  {
    id: 'item-001',
    organizationId: 'demo-org-001',
    name: 'Margherita Pizza',
    description: 'Fresh mozzarella, tomato sauce, basil',
    price: 14.99,
    images: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400'],
    categoryId: 'cat_002',
    tags: ['vegetarian', 'popular'],
    allergens: ['dairy', 'gluten'],
    availability: { isAvailable: true },
    displayOrder: 0,
    isPopular: true,
    nutritionalInfo: {
      calories: 850,
      protein: 32,
      carbs: 78,
      fat: 35
    }
  },
  {
    id: 'item-002',
    organizationId: 'demo-org-001',
    name: 'Caesar Salad',
    description: 'Romaine lettuce, parmesan, croutons, Caesar dressing',
    price: 12.99,
    images: ['https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400'],
    categoryId: 'cat_001',
    tags: ['salad'],
    allergens: ['dairy', 'gluten', 'eggs'],
    availability: { isAvailable: true },
    displayOrder: 1,
    preparationTime: 10
  },
  {
    id: 'item-003',
    organizationId: 'demo-org-001',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center, vanilla ice cream',
    price: 8.99,
    images: ['https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400'],
    categoryId: 'cat_003',
    tags: ['dessert', 'chocolate'],
    allergens: ['dairy', 'eggs', 'gluten'],
    availability: { isAvailable: true },
    displayOrder: 0,
    isNew: true,
    nutritionalInfo: {
      calories: 420
    }
  },
  {
    id: 'item-004',
    organizationId: 'demo-org-001',
    name: 'Spicy Buffalo Wings',
    description: 'Crispy wings tossed in buffalo sauce, served with ranch',
    price: 11.99,
    images: ['https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=400'],
    categoryId: 'cat_001',
    tags: ['spicy', 'chicken'],
    allergens: ['dairy'],
    availability: { isAvailable: false },
    displayOrder: 2,
    spicyLevel: 2,
    preparationTime: 15
  }
];

let mockItemsData = [...MOCK_ITEMS];

export const mockMenuItemService = {
  createMenuItem: async (organizationId: string, itemData: Omit<MenuItem, 'id'>): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newItem: MenuItem = {
      ...itemData,
      id: `item-${Date.now()}`,
      organizationId
    };
    
    mockItemsData.push(newItem);
    return newItem.id;
  },

  getMenuItemsByOrganization: async (organizationId: string): Promise<MenuItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockItemsData.filter(item => item.organizationId === organizationId);
  },

  getMenuItemsByCategory: async (categoryId: string): Promise<MenuItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockItemsData.filter(item => item.categoryId === categoryId);
  },

  getMenuItemById: async (itemId: string): Promise<MenuItem | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockItemsData.find(item => item.id === itemId) || null;
  },

  updateMenuItem: async (itemId: string, updates: Partial<MenuItem>): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const index = mockItemsData.findIndex(item => item.id === itemId);
    if (index !== -1) {
      mockItemsData[index] = {
        ...mockItemsData[index],
        ...updates
      };
    }
  },

  deleteMenuItem: async (itemId: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    mockItemsData = mockItemsData.filter(item => item.id !== itemId);
  },

  toggleItemAvailability: async (itemId: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const item = mockItemsData.find(i => i.id === itemId);
    if (item) {
      item.availability.isAvailable = !item.availability.isAvailable;
    }
  },

  searchMenuItems: async (organizationId: string, searchTerm: string): Promise<MenuItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const lowercaseSearch = searchTerm.toLowerCase();
    return mockItemsData.filter(item => 
      item.organizationId === organizationId &&
      (item.name.toLowerCase().includes(lowercaseSearch) ||
       item.description?.toLowerCase().includes(lowercaseSearch) ||
       item.tags?.some(tag => tag.toLowerCase().includes(lowercaseSearch)))
    );
  },

  getPopularItems: async (organizationId: string, limit: number = 10): Promise<MenuItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return mockItemsData
      .filter(item => item.organizationId === organizationId && item.isPopular)
      .slice(0, limit);
  }
};