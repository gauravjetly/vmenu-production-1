import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Eye, Copy, Loader2 } from 'lucide-react';
import { TemplateSelector } from '../components/TemplateSelector';
import { MenuTemplate } from '@tv-menu-designer/shared';

interface Menu {
  id: string;
  name: string;
  description?: string;
  status: 'draft' | 'published' | 'archived';
  updatedAt: string;
}

const MenusPage: React.FC = () => {
  const navigate = useNavigate();
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [newMenuName, setNewMenuName] = useState('');
  const [newMenuDescription, setNewMenuDescription] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<MenuTemplate | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadMenus();
  }, []);

  const loadMenus = async () => {
    try {
      const response = await api.get('/api/menus');
      setMenus(response.data.data);
    } catch (error) {
      toast.error('Failed to load menus');
    } finally {
      setLoading(false);
    }
  };

  const handleProceedToTemplate = () => {
    if (!newMenuName.trim()) {
      toast.error('Please enter a menu name');
      return;
    }
    setShowCreateModal(false);
    setShowTemplateSelector(true);
  };

  const handleTemplateSelect = async (template: MenuTemplate) => {
    setSelectedTemplate(template);
    setShowTemplateSelector(false);
    
    // Create menu with selected template
    setCreating(true);
    try {
      const response = await api.post('/api/menus', {
        name: newMenuName,
        description: newMenuDescription,
        template: template
      });
      
      const newMenu = response.data.data;
      toast.success('Menu created successfully');
      setNewMenuName('');
      setNewMenuDescription('');
      setSelectedTemplate(null);
      navigate(`/menus/${newMenu.id}`);
    } catch (error) {
      toast.error('Failed to create menu');
    } finally {
      setCreating(false);
    }
  };

  const handleCancelTemplateSelection = () => {
    setShowTemplateSelector(false);
    setShowCreateModal(true);
  };

  const handleDelete = async (menu: Menu) => {
    if (!confirm(`Are you sure you want to delete "${menu.name}"?`)) {
      return;
    }

    try {
      await api.delete(`/api/menus/${menu.id}`);
      toast.success('Menu deleted successfully');
      loadMenus();
    } catch (error) {
      toast.error('Failed to delete menu');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      draft: 'bg-gray-100 text-gray-800',
      published: 'bg-green-100 text-green-800',
      archived: 'bg-yellow-100 text-yellow-800',
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Menus</h1>
          <p className="mt-1 text-gray-600">Manage your digital menu displays</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Plus className="h-4 w-4" />
          Create Menu
        </button>
      </div>

      {menus.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No menus yet</h3>
          <p className="text-gray-600 mb-4">Create your first menu to get started</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Plus className="h-4 w-4" />
            Create Menu
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menus.map((menu) => (
            <div key={menu.id} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{menu.name}</h3>
                  {menu.description && (
                    <p className="text-sm text-gray-600 mt-1">{menu.description}</p>
                  )}
                </div>
                {getStatusBadge(menu.status)}
              </div>
              
              <p className="text-sm text-gray-500 mb-4">
                Updated {new Date(menu.updatedAt).toLocaleDateString()}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/menus/${menu.id}`)}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  <Edit className="h-3 w-3" />
                  Edit
                </button>
                <button
                  onClick={() => window.open(`/tv/${menu.id}`, '_blank')}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm border rounded hover:bg-gray-50"
                >
                  <Eye className="h-3 w-3" />
                  Preview
                </button>
                <button
                  onClick={() => handleDelete(menu)}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50"
                >
                  <Trash2 className="h-3 w-3" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Template Selector */}
      {showTemplateSelector && (
        <TemplateSelector
          onTemplateSelect={handleTemplateSelect}
          onClose={handleCancelTemplateSelection}
        />
      )}

      {/* Create Menu Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create New Menu</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Menu Name
                </label>
                <input
                  type="text"
                  value={newMenuName}
                  onChange={(e) => setNewMenuName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Lunch Menu"
                  autoFocus
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (optional)
                </label>
                <textarea
                  value={newMenuDescription}
                  onChange={(e) => setNewMenuDescription(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of this menu"
                  rows={3}
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewMenuName('');
                  setNewMenuDescription('');
                }}
                className="flex-1 px-4 py-2 border rounded-md hover:bg-gray-50"
                disabled={creating}
              >
                Cancel
              </button>
              <button
                onClick={handleProceedToTemplate}
                disabled={creating || !newMenuName.trim()}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {creating && <Loader2 className="animate-spin h-4 w-4" />}
                Next: Choose Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenusPage;