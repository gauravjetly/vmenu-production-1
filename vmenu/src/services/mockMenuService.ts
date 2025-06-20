// Mock menu service for development
import { Menu, Category, MenuItem } from '../models';

const MOCK_MENUS: Menu[] = [
  {
    id: 'menu-001',
    organizationId: 'demo-org-001',
    name: 'Lunch Menu',
    description: 'Our delicious lunch offerings',
    type: 'lunch',
    layout: {
      template: 'grid',
      columns: 2,
      showImages: true,
      showDescriptions: true,
      showPrices: true,
      showCalories: false,
      animations: {
        enabled: true,
        type: 'fade',
        duration: 500
      }
    },
    categories: [
      {
        id: 'cat_001',
        name: 'Appetizers',
        description: 'Start your meal right',
        displayOrder: 0,
        items: []
      },
      {
        id: 'cat_002',
        name: 'Main Courses',
        description: 'Hearty and satisfying entrees',
        displayOrder: 1,
        items: []
      },
      {
        id: 'cat_003',
        name: 'Desserts',
        description: 'Sweet endings',
        displayOrder: 2,
        items: []
      }
    ],
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
    createdBy: 'demo-admin-001',
    version: 1
  },
  {
    id: 'menu-002',
    organizationId: 'demo-org-001',
    name: 'Dinner Menu',
    description: 'Evening dining at its finest',
    type: 'dinner',
    layout: {
      template: 'cards',
      columns: 3,
      showImages: true,
      showDescriptions: true,
      showPrices: true,
      showCalories: true,
    },
    categories: [],
    isActive: false,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    createdBy: 'demo-admin-001',
    version: 1
  }
];

let mockMenusData = [...MOCK_MENUS];

export const mockMenuService = {
  createMenu: async (organizationId: string, menuData: Omit<Menu, 'id' | 'organizationId' | 'createdAt' | 'updatedAt' | 'version'>): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newMenu: Menu = {
      ...menuData,
      id: `menu-${Date.now()}`,
      organizationId,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    mockMenusData.push(newMenu);
    return newMenu.id;
  },

  getMenusByOrganization: async (organizationId: string): Promise<Menu[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockMenusData.filter(menu => menu.organizationId === organizationId);
  },

  getMenuById: async (menuId: string): Promise<Menu | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockMenusData.find(menu => menu.id === menuId) || null;
  },

  updateMenu: async (menuId: string, updates: Partial<Menu>): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const index = mockMenusData.findIndex(menu => menu.id === menuId);
    if (index !== -1) {
      mockMenusData[index] = {
        ...mockMenusData[index],
        ...updates,
        updatedAt: new Date(),
        version: (mockMenusData[index].version || 1) + 1
      };
    }
  },

  deleteMenu: async (menuId: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    mockMenusData = mockMenusData.filter(menu => menu.id !== menuId);
  },

  addCategory: async (menuId: string, category: Omit<Category, 'id' | 'items'>): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const menu = mockMenusData.find(m => m.id === menuId);
    if (!menu) throw new Error('Menu not found');
    
    const newCategory: Category = {
      ...category,
      id: `cat_${Date.now()}`,
      items: []
    };
    
    menu.categories = [...(menu.categories || []), newCategory];
    menu.updatedAt = new Date();
  },

  updateCategory: async (menuId: string, categoryId: string, updates: Partial<Category>): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const menu = mockMenusData.find(m => m.id === menuId);
    if (!menu) throw new Error('Menu not found');
    
    menu.categories = menu.categories.map(cat => 
      cat.id === categoryId ? { ...cat, ...updates } : cat
    );
    menu.updatedAt = new Date();
  },

  deleteCategory: async (menuId: string, categoryId: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const menu = mockMenusData.find(m => m.id === menuId);
    if (!menu) throw new Error('Menu not found');
    
    menu.categories = menu.categories.filter(cat => cat.id !== categoryId);
    menu.updatedAt = new Date();
  },

  reorderCategories: async (menuId: string, categoryOrder: string[]): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const menu = mockMenusData.find(m => m.id === menuId);
    if (!menu) throw new Error('Menu not found');
    
    const reorderedCategories = categoryOrder.map((catId, index) => {
      const category = menu.categories.find(c => c.id === catId);
      if (!category) throw new Error(`Category ${catId} not found`);
      return { ...category, displayOrder: index };
    });
    
    menu.categories = reorderedCategories;
    menu.updatedAt = new Date();
  },

  cloneMenu: async (menuId: string, newName: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const originalMenu = mockMenusData.find(m => m.id === menuId);
    if (!originalMenu) throw new Error('Menu not found');
    
    const { id, createdAt, updatedAt, ...menuData } = originalMenu;
    
    const newMenu: Menu = {
      ...menuData,
      id: `menu-${Date.now()}`,
      name: newName,
      isActive: false,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    mockMenusData.push(newMenu);
    return newMenu.id;
  }
};