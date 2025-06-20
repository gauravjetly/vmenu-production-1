import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { MenuService } from '../services/menuService';
import { Menu } from '../models';
import MenuBuilder from '../components/menu/MenuBuilder';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Plus, ChevronLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const MenuBuilderPage: React.FC = () => {
  const { menuId } = useParams();
  const navigate = useNavigate();
  const { adminData } = useAuth();
  const [menu, setMenu] = useState<Menu | null>(null);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewMenuModal, setShowNewMenuModal] = useState(false);
  const [newMenuName, setNewMenuName] = useState('');
  const [newMenuType, setNewMenuType] = useState<Menu['type']>('lunch');

  useEffect(() => {
    loadMenus();
  }, [adminData]);

  useEffect(() => {
    if (menuId && menus.length > 0) {
      const selectedMenu = menus.find(m => m.id === menuId);
      if (selectedMenu) {
        setMenu(selectedMenu);
      } else {
        toast.error('Menu not found');
        navigate('/menus');
      }
    }
  }, [menuId, menus]);

  const loadMenus = async () => {
    if (!adminData) return;
    
    setIsLoading(true);
    try {
      const fetchedMenus = await MenuService.getMenusByOrganization(adminData.organizationId);
      setMenus(fetchedMenus);
      
      if (!menuId && fetchedMenus.length > 0) {
        // If no menu ID in URL, select the first menu
        navigate(`/menus/${fetchedMenus[0].id}`);
      }
    } catch (error) {
      toast.error('Failed to load menus');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveMenu = async (updatedMenu: Menu) => {
    try {
      await MenuService.updateMenu(updatedMenu.id, updatedMenu);
      setMenu(updatedMenu);
      setMenus(menus.map(m => m.id === updatedMenu.id ? updatedMenu : m));
    } catch (error) {
      throw error;
    }
  };

  const handleCreateMenu = async () => {
    if (!newMenuName.trim() || !adminData) return;
    
    try {
      const menuId = await MenuService.createMenu(adminData.organizationId, {
        name: newMenuName,
        type: newMenuType,
        layout: {
          template: 'grid',
          columns: 2,
          showImages: true,
          showDescriptions: true,
          showPrices: true,
          showCalories: false,
        },
        categories: [],
        isActive: false,
        createdBy: adminData.id,
      });
      
      toast.success('Menu created successfully!');
      setShowNewMenuModal(false);
      setNewMenuName('');
      await loadMenus();
      navigate(`/menus/${menuId}`);
    } catch (error) {
      toast.error('Failed to create menu');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!menuId || !menu) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Menu Builder
        </h1>
        
        {menus.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You haven't created any menus yet.
            </p>
            <button
              onClick={() => setShowNewMenuModal(true)}
              className="btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menus.map((menu) => (
              <div
                key={menu.id}
                onClick={() => navigate(`/menus/${menu.id}`)}
                className="card cursor-pointer hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {menu.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {menu.type.charAt(0).toUpperCase() + menu.type.slice(1)} Menu
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                  {menu.categories.length} categories
                </p>
                <div className="mt-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    menu.isActive 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {menu.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            ))}
            <button
              onClick={() => setShowNewMenuModal(true)}
              className="card border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-400 transition-colors flex items-center justify-center"
            >
              <div className="text-center">
                <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 dark:text-gray-400">Create New Menu</p>
              </div>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Breadcrumb */}
      <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => navigate('/menus')}
          className="flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          All Menus
        </button>
      </div>
      
      {/* Menu Builder */}
      <div className="flex-1 overflow-hidden">
        <MenuBuilder
          menu={menu}
          onSave={handleSaveMenu}
          isLoading={isLoading}
        />
      </div>

      {/* New Menu Modal */}
      {showNewMenuModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Create New Menu
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Menu Name
                </label>
                <input
                  type="text"
                  value={newMenuName}
                  onChange={(e) => setNewMenuName(e.target.value)}
                  className="input"
                  placeholder="e.g., Lunch Menu"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Menu Type
                </label>
                <select
                  value={newMenuType}
                  onChange={(e) => setNewMenuType(e.target.value as Menu['type'])}
                  className="input"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="drinks">Drinks</option>
                  <option value="desserts">Desserts</option>
                  <option value="specials">Specials</option>
                  <option value="happy_hour">Happy Hour</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => {
                  setShowNewMenuModal(false);
                  setNewMenuName('');
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateMenu}
                disabled={!newMenuName.trim()}
                className="btn-primary"
              >
                Create Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuBuilderPage;