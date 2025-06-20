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
  Timestamp,
  writeBatch
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage, COLLECTIONS, STORAGE_PATHS } from '../config/firebase';
import { MenuItem, MenuItemVariation, MenuItemModifier } from '../models';
import { mockMenuItemService } from './mockMenuItemService';

// Use mock service for development
const USE_MOCK = true; // Set to false when Firebase is configured

export class MenuItemService {
  // Create a new menu item
  static async createMenuItem(
    organizationId: string,
    itemData: Omit<MenuItem, 'id'>
  ): Promise<string> {
    if (USE_MOCK) {
      return mockMenuItemService.createMenuItem(organizationId, itemData);
    }
    
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.MENU_ITEMS), {
        ...itemData,
        organizationId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating menu item:', error);
      throw new Error('Failed to create menu item');
    }
  }

  // Get all menu items for an organization
  static async getMenuItemsByOrganization(organizationId: string): Promise<MenuItem[]> {
    if (USE_MOCK) {
      return mockMenuItemService.getMenuItemsByOrganization(organizationId);
    }
    
    try {
      const q = query(
        collection(db, COLLECTIONS.MENU_ITEMS),
        where('organizationId', '==', organizationId),
        orderBy('name')
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as MenuItem));
    } catch (error) {
      console.error('Error fetching menu items:', error);
      throw new Error('Failed to fetch menu items');
    }
  }

  // Get menu items by category
  static async getMenuItemsByCategory(categoryId: string): Promise<MenuItem[]> {
    if (USE_MOCK) {
      return mockMenuItemService.getMenuItemsByCategory(categoryId);
    }
    
    try {
      const q = query(
        collection(db, COLLECTIONS.MENU_ITEMS),
        where('categoryId', '==', categoryId),
        orderBy('displayOrder')
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as MenuItem));
    } catch (error) {
      console.error('Error fetching menu items by category:', error);
      throw new Error('Failed to fetch menu items');
    }
  }

  // Get a single menu item
  static async getMenuItemById(itemId: string): Promise<MenuItem | null> {
    if (USE_MOCK) {
      return mockMenuItemService.getMenuItemById(itemId);
    }
    
    try {
      const docRef = doc(db, COLLECTIONS.MENU_ITEMS, itemId);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        return null;
      }
      
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as MenuItem;
    } catch (error) {
      console.error('Error fetching menu item:', error);
      throw new Error('Failed to fetch menu item');
    }
  }

  // Update a menu item
  static async updateMenuItem(
    itemId: string, 
    updates: Partial<MenuItem>
  ): Promise<void> {
    if (USE_MOCK) {
      return mockMenuItemService.updateMenuItem(itemId, updates);
    }
    
    try {
      const docRef = doc(db, COLLECTIONS.MENU_ITEMS, itemId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating menu item:', error);
      throw new Error('Failed to update menu item');
    }
  }

  // Delete a menu item
  static async deleteMenuItem(itemId: string): Promise<void> {
    if (USE_MOCK) {
      return mockMenuItemService.deleteMenuItem(itemId);
    }
    
    try {
      const item = await this.getMenuItemById(itemId);
      if (!item) throw new Error('Menu item not found');
      
      // Delete associated images from storage
      if (item.images && item.images.length > 0) {
        const deletePromises = item.images.map(async (imageUrl) => {
          try {
            const imageRef = ref(storage, imageUrl);
            await deleteObject(imageRef);
          } catch (error) {
            console.warn('Failed to delete image:', imageUrl, error);
          }
        });
        await Promise.all(deletePromises);
      }
      
      await deleteDoc(doc(db, COLLECTIONS.MENU_ITEMS, itemId));
    } catch (error) {
      console.error('Error deleting menu item:', error);
      throw new Error('Failed to delete menu item');
    }
  }

  // Upload menu item image
  static async uploadItemImage(
    organizationId: string,
    itemId: string,
    file: File
  ): Promise<string> {
    try {
      const timestamp = Date.now();
      const fileName = `${itemId}_${timestamp}_${file.name}`;
      const storageRef = ref(
        storage, 
        `${STORAGE_PATHS.MENU_IMAGES}/${organizationId}/${fileName}`
      );
      
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  }

  // Bulk update menu items (e.g., for reordering)
  static async bulkUpdateMenuItems(
    updates: Array<{ id: string; updates: Partial<MenuItem> }>
  ): Promise<void> {
    try {
      const batch = writeBatch(db);
      
      updates.forEach(({ id, updates }) => {
        const docRef = doc(db, COLLECTIONS.MENU_ITEMS, id);
        batch.update(docRef, {
          ...updates,
          updatedAt: serverTimestamp()
        });
      });
      
      await batch.commit();
    } catch (error) {
      console.error('Error bulk updating menu items:', error);
      throw new Error('Failed to bulk update menu items');
    }
  }

  // Toggle item availability
  static async toggleItemAvailability(itemId: string): Promise<void> {
    if (USE_MOCK) {
      return mockMenuItemService.toggleItemAvailability(itemId);
    }
    
    try {
      const item = await this.getMenuItemById(itemId);
      if (!item) throw new Error('Menu item not found');
      
      await this.updateMenuItem(itemId, {
        availability: {
          ...item.availability,
          isAvailable: !item.availability.isAvailable
        }
      });
    } catch (error) {
      console.error('Error toggling item availability:', error);
      throw new Error('Failed to toggle item availability');
    }
  }

  // Search menu items
  static async searchMenuItems(
    organizationId: string,
    searchTerm: string
  ): Promise<MenuItem[]> {
    if (USE_MOCK) {
      return mockMenuItemService.searchMenuItems(organizationId, searchTerm);
    }
    
    try {
      // Note: This is a simple implementation. For better search,
      // consider using Algolia or Elasticsearch
      const items = await this.getMenuItemsByOrganization(organizationId);
      
      const lowercaseSearch = searchTerm.toLowerCase();
      return items.filter(item => 
        item.name.toLowerCase().includes(lowercaseSearch) ||
        item.description?.toLowerCase().includes(lowercaseSearch) ||
        item.tags?.some(tag => tag.toLowerCase().includes(lowercaseSearch))
      );
    } catch (error) {
      console.error('Error searching menu items:', error);
      throw new Error('Failed to search menu items');
    }
  }

  // Clone a menu item
  static async cloneMenuItem(
    itemId: string,
    newName: string
  ): Promise<string> {
    try {
      const originalItem = await this.getMenuItemById(itemId);
      if (!originalItem) throw new Error('Menu item not found');
      
      const { id, ...itemData } = originalItem;
      
      return await this.createMenuItem(originalItem.organizationId!, {
        ...itemData,
        name: newName,
        availability: {
          ...itemData.availability,
          isAvailable: false
        }
      });
    } catch (error) {
      console.error('Error cloning menu item:', error);
      throw new Error('Failed to clone menu item');
    }
  }

  // Get popular items based on analytics
  static async getPopularItems(
    organizationId: string,
    limit: number = 10
  ): Promise<MenuItem[]> {
    if (USE_MOCK) {
      return mockMenuItemService.getPopularItems(organizationId, limit);
    }
    
    try {
      // This would integrate with analytics data
      // For now, return items marked as popular
      const q = query(
        collection(db, COLLECTIONS.MENU_ITEMS),
        where('organizationId', '==', organizationId),
        where('isPopular', '==', true),
        orderBy('name')
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        } as MenuItem))
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching popular items:', error);
      throw new Error('Failed to fetch popular items');
    }
  }
}