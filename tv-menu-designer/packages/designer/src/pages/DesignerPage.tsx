import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EnhancedMenuCanvas } from '../components/EnhancedMenuCanvas';
import { MenuTemplate } from '@tv-menu-designer/shared';
import api from '../services/api';
import { websocketService } from '../services/websocket';
import toast from 'react-hot-toast';
import { Loader2, Save, Eye } from 'lucide-react';

const DesignerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [menu, setMenu] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      loadMenu();
      // Connect to websocket and join menu editing session
      const token = localStorage.getItem('token');
      if (token) {
        websocketService.connect(token).then(() => {
          websocketService.joinMenuEditing(id);
          
          // Listen for menu changes from other users
          websocketService.onMenuChanges((data) => {
            console.log('Received menu changes:', data);
            // TODO: Apply changes to canvas
          });
          
          // Listen for menu refresh events
          websocketService.onMenuRefresh((data) => {
            if (data.menuId === id) {
              loadMenu();
            }
          });
        }).catch((error) => {
          console.error('Failed to connect to websocket:', error);
        });
      }
    }
    
    return () => {
      if (id) {
        websocketService.leaveMenuEditing(id);
      }
    };
  }, [id]);

  const loadMenu = async () => {
    try {
      const response = await api.get(`/api/menus/${id}`);
      const menuData = response.data.data;
      
      // Validate menu template structure
      if (!menuData.template) {
        console.error('Menu missing template');
        toast.error('Menu data is corrupted - missing template');
        navigate('/menus');
        return;
      }
      
      setMenu(menuData);
    } catch (error) {
      console.error('Failed to load menu:', error);
      toast.error('Failed to load menu');
      navigate('/menus');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (template: MenuTemplate) => {
    setSaving(true);
    try {
      // Validate template before saving
      if (!template.pages || template.pages.length === 0) {
        console.error('Attempted to save template without pages:', template);
        toast.error('Invalid template structure - missing pages');
        return;
      }
      
      await api.put(`/api/menus/${id}`, {
        ...menu,
        template,
        updatedAt: new Date().toISOString()
      });
      toast.success('Menu saved successfully');
    } catch (error) {
      console.error('Failed to save menu:', error);
      toast.error('Failed to save menu');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    try {
      await api.post(`/api/menus/${id}/publish`);
      toast.success('Menu published successfully');
      loadMenu();
    } catch (error) {
      toast.error('Failed to publish menu');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
      </div>
    );
  }

  if (!menu) {
    return <div>Menu not found</div>;
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{menu.name}</h1>
          <p className="text-gray-600">Status: {menu.status}</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.open(`/tv/${id}?preview=true`, '_blank')}
            className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-50"
          >
            <Eye className="h-4 w-4" />
            Preview
          </button>
          <button
            onClick={handlePublish}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            disabled={menu.status === 'published'}
          >
            {menu.status === 'published' ? 'Published' : 'Publish'}
          </button>
          <button
            onClick={() => handleSave(menu.template)}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="animate-spin h-4 w-4" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 overflow-hidden">
        <EnhancedMenuCanvas
          template={menu.template}
          onUpdate={(template) => {
            setMenu({ ...menu, template });
            handleSave(template);
            // Broadcast changes to other users
            if (websocketService.isConnected()) {
              websocketService.sendMenuChanges(id!, template);
            }
          }}
        />
      </div>
    </div>
  );
};

export default DesignerPage;