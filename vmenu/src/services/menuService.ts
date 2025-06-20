import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db, COLLECTIONS } from '../config/firebase';
import { Menu, Category, MenuItem } from '../models';
import { mockMenuService } from './mockMenuService';

// Use mock service for development
const USE_MOCK = true; // Set to false when Firebase is configured

export class MenuService {
  // Create a new menu
  static async createMenu(organizationId: string, menuData: Omit<Menu, 'id' | 'organizationId' | 'createdAt' | 'updatedAt' | 'version'>): Promise<string> {
    if (USE_MOCK) {
      return mockMenuService.createMenu(organizationId, menuData);
    }
    
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.MENUS), {
        ...menuData,
        organizationId,
        version: 1,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating menu:', error);
      throw new Error('Failed to create menu');
    }
  }

  // Get all menus for an organization
  static async getMenusByOrganization(organizationId: string): Promise<Menu[]> {
    if (USE_MOCK) {
      return mockMenuService.getMenusByOrganization(organizationId);
    }
    
    try {
      const q = query(
        collection(db, COLLECTIONS.MENUS),
        where('organizationId', '==', organizationId),
        orderBy('updatedAt', 'desc')
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: (doc.data().createdAt as Timestamp)?.toDate(),
        updatedAt: (doc.data().updatedAt as Timestamp)?.toDate()
      } as Menu));
    } catch (error) {
      console.error('Error fetching menus:', error);
      throw new Error('Failed to fetch menus');
    }
  }

  // Get a single menu by ID
  static async getMenuById(menuId: string): Promise<Menu | null> {
    if (USE_MOCK) {
      return mockMenuService.getMenuById(menuId);
    }
    
    try {
      const docRef = doc(db, COLLECTIONS.MENUS, menuId);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        return null;
      }
      
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate()
      } as Menu;
    } catch (error) {
      console.error('Error fetching menu:', error);
      throw new Error('Failed to fetch menu');
    }
  }

  // Update a menu
  static async updateMenu(menuId: string, updates: Partial<Menu>): Promise<void> {
    if (USE_MOCK) {
      return mockMenuService.updateMenu(menuId, updates);
    }
    
    try {
      const docRef = doc(db, COLLECTIONS.MENUS, menuId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp(),
        version: updates.version || 1
      });
    } catch (error) {
      console.error('Error updating menu:', error);
      throw new Error('Failed to update menu');
    }
  }

  // Delete a menu
  static async deleteMenu(menuId: string): Promise<void> {
    if (USE_MOCK) {
      return mockMenuService.deleteMenu(menuId);
    }
    
    try {
      await deleteDoc(doc(db, COLLECTIONS.MENUS, menuId));
    } catch (error) {
      console.error('Error deleting menu:', error);
      throw new Error('Failed to delete menu');
    }
  }

  // Add a category to a menu
  static async addCategory(menuId: string, category: Omit<Category, 'id' | 'items'>): Promise<void> {
    if (USE_MOCK) {
      return mockMenuService.addCategory(menuId, category);
    }
    
    try {
      const menu = await this.getMenuById(menuId);
      if (!menu) throw new Error('Menu not found');
      
      const newCategory: Category = {
        ...category,
        id: `cat_${Date.now()}`,
        items: []
      };
      
      const updatedCategories = [...(menu.categories || []), newCategory];
      await this.updateMenu(menuId, { categories: updatedCategories });
    } catch (error) {
      console.error('Error adding category:', error);
      throw new Error('Failed to add category');
    }
  }

  // Update a category
  static async updateCategory(menuId: string, categoryId: string, updates: Partial<Category>): Promise<void> {
    if (USE_MOCK) {
      return mockMenuService.updateCategory(menuId, categoryId, updates);
    }
    
    try {
      const menu = await this.getMenuById(menuId);
      if (!menu) throw new Error('Menu not found');
      
      const updatedCategories = menu.categories.map(cat => 
        cat.id === categoryId ? { ...cat, ...updates } : cat
      );
      
      await this.updateMenu(menuId, { categories: updatedCategories });
    } catch (error) {
      console.error('Error updating category:', error);
      throw new Error('Failed to update category');
    }
  }

  // Delete a category
  static async deleteCategory(menuId: string, categoryId: string): Promise<void> {
    if (USE_MOCK) {
      return mockMenuService.deleteCategory(menuId, categoryId);
    }
    
    try {
      const menu = await this.getMenuById(menuId);
      if (!menu) throw new Error('Menu not found');
      
      const updatedCategories = menu.categories.filter(cat => cat.id !== categoryId);
      await this.updateMenu(menuId, { categories: updatedCategories });
    } catch (error) {
      console.error('Error deleting category:', error);
      throw new Error('Failed to delete category');
    }
  }

  // Reorder categories
  static async reorderCategories(menuId: string, categoryOrder: string[]): Promise<void> {
    if (USE_MOCK) {
      return mockMenuService.reorderCategories(menuId, categoryOrder);
    }
    
    try {
      const menu = await this.getMenuById(menuId);
      if (!menu) throw new Error('Menu not found');
      
      const reorderedCategories = categoryOrder.map((catId, index) => {
        const category = menu.categories.find(c => c.id === catId);
        if (!category) throw new Error(`Category ${catId} not found`);
        return { ...category, displayOrder: index };
      });
      
      await this.updateMenu(menuId, { categories: reorderedCategories });
    } catch (error) {
      console.error('Error reordering categories:', error);
      throw new Error('Failed to reorder categories');
    }
  }

  // Clone a menu
  static async cloneMenu(menuId: string, newName: string): Promise<string> {
    if (USE_MOCK) {
      return mockMenuService.cloneMenu(menuId, newName);
    }
    
    try {
      const originalMenu = await this.getMenuById(menuId);
      if (!originalMenu) throw new Error('Menu not found');
      
      const { id, createdAt, updatedAt, ...menuData } = originalMenu;
      
      return await this.createMenu(originalMenu.organizationId, {
        ...menuData,
        name: newName,
        isActive: false
      });
    } catch (error) {
      console.error('Error cloning menu:', error);
      throw new Error('Failed to clone menu');
    }
  }
}