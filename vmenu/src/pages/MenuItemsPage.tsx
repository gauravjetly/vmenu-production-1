import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MenuService } from '../services/menuService';
import { MenuItemService } from '../services/menuItemService';
import { Menu, MenuItem, Category } from '../models';
import MenuItemCard from '../components/menu/MenuItemCard';
import MenuItemForm from '../components/menu/MenuItemForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { 
  Plus, 
  Search, 
  Filter,
  Download,
  Upload,
  Grid3X3,
  List
} from 'lucide-react';
import toast from 'react-hot-toast';

const MenuItemsPage: React.FC = () => {
  const { adminData } = useAuth();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMenu, setSelectedMenu] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showItemForm, setShowItemForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | undefined>();

  useEffect(() => {
    loadData();
  }, [adminData]);

  const loadData = async () => {
    if (!adminData) return;
    
    setIsLoading(true);
    try {
      // Load menus first
      const menusData = await MenuService.getMenusByOrganization(adminData.organizationId);
      setMenus(menusData);
      
      // Extract all categories from menus
      const allCategories: Category[] = [];
      menusData.forEach(menu => {
        menu.categories.forEach(cat => {
          if (!allCategories.find(c => c.id === cat.id)) {
            allCategories.push(cat);
          }
        });
      });
      setCategories(allCategories);
      
      // Load menu items
      const itemsData = await MenuItemService.getMenuItemsByOrganization(adminData.organizationId);
      setItems(itemsData);
    } catch (error) {
      toast.error('Failed to load menu items');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateItem = async (itemData: Omit<MenuItem, 'id'>) => {
    if (!adminData) return;
    
    try {
      const itemId = await MenuItemService.createMenuItem(adminData.organizationId, itemData);
      const newItem = { ...itemData, id: itemId };
      setItems([...items, newItem]);
      setShowItemForm(false);
      toast.success('Menu item created successfully!');
    } catch (error) {
      toast.error('Failed to create menu item');
      throw error;
    }
  };

  const handleUpdateItem = async (itemData: Omit<MenuItem, 'id'>) => {
    if (!editingItem) return;
    
    try {
      await MenuItemService.updateMenuItem(editingItem.id, itemData);
      setItems(items.map(item => 
        item.id === editingItem.id ? { ...itemData, id: editingItem.id } : item
      ));
      setEditingItem(undefined);
      setShowItemForm(false);
      toast.success('Menu item updated successfully!');
    } catch (error) {
      toast.error('Failed to update menu item');
      throw error;
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return;
    
    try {
      await MenuItemService.deleteMenuItem(itemId);
      setItems(items.filter(item => item.id !== itemId));
      toast.success('Menu item deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete menu item');
    }
  };

  const handleToggleAvailability = async (item: MenuItem) => {
    try {
      await MenuItemService.toggleItemAvailability(item.id);
      setItems(items.map(i => 
        i.id === item.id 
          ? { ...i, availability: { ...i.availability, isAvailable: !i.availability.isAvailable } }
          : i
      ));
      toast.success(`${item.name} is now ${!item.availability.isAvailable ? 'available' : 'unavailable'}`);
    } catch (error) {
      toast.error('Failed to update availability');
    }
  };

  // Filter items based on search and filters
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory;
    const matchesMenu = selectedMenu === 'all' || 
                       menus.some(menu => 
                         menu.id === selectedMenu && 
                         menu.categories.some(cat => cat.id === item.categoryId)
                       );
    
    return matchesSearch && matchesCategory && matchesMenu;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Menu Items</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage all your menu items across all menus and categories.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="btn-secondary flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </button>
          <button className="btn-secondary flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button
            onClick={() => {
              setEditingItem(undefined);
              setShowItemForm(true);
            }}
            className="btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search menu items..."
              className="input pl-10"
            />
          </div>

          <div className="flex items-center space-x-4">
            {/* Menu Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedMenu}
                onChange={(e) => setSelectedMenu(e.target.value)}
                className="input py-2"
              >
                <option value="all">All Menus</option>
                {menus.map(menu => (
                  <option key={menu.id} value={menu.id}>{menu.name}</option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input py-2"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>

            {/* View Mode */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-gray-600 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-gray-600 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredItems.length} of {items.length} items
        </div>
      </div>

      {/* Items Grid/List */}
      {filteredItems.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            {searchTerm || selectedCategory !== 'all' || selectedMenu !== 'all'
              ? 'No items found matching your filters.'
              : 'No menu items yet. Create your first item to get started.'}
          </p>
        </div>
      ) : (
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
            : 'space-y-4'
        }>
          {filteredItems.map(item => (
            <MenuItemCard
              key={item.id}
              item={item}
              onEdit={() => {
                setEditingItem(item);
                setShowItemForm(true);
              }}
              onDelete={() => handleDeleteItem(item.id)}
              onToggleAvailability={() => handleToggleAvailability(item)}
            />
          ))}
        </div>
      )}

      {/* Item Form Modal */}
      {showItemForm && (
        <MenuItemForm
          item={editingItem}
          categories={categories}
          onSave={editingItem ? handleUpdateItem : handleCreateItem}
          onCancel={() => {
            setShowItemForm(false);
            setEditingItem(undefined);
          }}
        />
      )}
    </div>
  );
};

export default MenuItemsPage;