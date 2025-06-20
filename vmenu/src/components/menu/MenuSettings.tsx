import React, { useState } from 'react';
import { Menu, MenuLayout } from '../../models';
import { X, Layout, Type, Image, DollarSign, Activity } from 'lucide-react';

interface MenuSettingsProps {
  menu: Menu;
  onUpdate: (updates: Partial<Menu>) => void;
  onClose: () => void;
}

const MenuSettings: React.FC<MenuSettingsProps> = ({ menu, onUpdate, onClose }) => {
  const [localSettings, setLocalSettings] = useState({
    name: menu.name,
    description: menu.description || '',
    type: menu.type,
    layout: { ...menu.layout },
  });

  const handleLayoutChange = (updates: Partial<MenuLayout>) => {
    setLocalSettings({
      ...localSettings,
      layout: { ...localSettings.layout, ...updates },
    });
  };

  const handleSave = () => {
    onUpdate(localSettings);
    onClose();
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Menu Settings
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-6">
          {/* Basic Info */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Basic Information
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Menu Name
                </label>
                <input
                  type="text"
                  value={localSettings.name}
                  onChange={(e) =>
                    setLocalSettings({ ...localSettings, name: e.target.value })
                  }
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={localSettings.description}
                  onChange={(e) =>
                    setLocalSettings({ ...localSettings, description: e.target.value })
                  }
                  className="input"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Menu Type
                </label>
                <select
                  value={localSettings.type}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      type: e.target.value as Menu['type'],
                    })
                  }
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
          </div>

          {/* Layout Settings */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
              <Layout className="w-4 h-4 mr-2" />
              Layout Options
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Template
                </label>
                <select
                  value={localSettings.layout.template}
                  onChange={(e) =>
                    handleLayoutChange({
                      template: e.target.value as MenuLayout['template'],
                    })
                  }
                  className="input"
                >
                  <option value="grid">Grid</option>
                  <option value="list">List</option>
                  <option value="cards">Cards</option>
                  <option value="magazine">Magazine</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Columns
                </label>
                <select
                  value={localSettings.layout.columns}
                  onChange={(e) =>
                    handleLayoutChange({
                      columns: parseInt(e.target.value) as MenuLayout['columns'],
                    })
                  }
                  className="input"
                >
                  <option value="1">1 Column</option>
                  <option value="2">2 Columns</option>
                  <option value="3">3 Columns</option>
                  <option value="4">4 Columns</option>
                </select>
              </div>
            </div>
          </div>

          {/* Display Options */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Display Options
            </h4>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={localSettings.layout.showImages}
                  onChange={(e) =>
                    handleLayoutChange({ showImages: e.target.checked })
                  }
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 flex items-center">
                  <Image className="w-4 h-4 mr-1" />
                  Show Images
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={localSettings.layout.showDescriptions}
                  onChange={(e) =>
                    handleLayoutChange({ showDescriptions: e.target.checked })
                  }
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 flex items-center">
                  <Type className="w-4 h-4 mr-1" />
                  Show Descriptions
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={localSettings.layout.showPrices}
                  onChange={(e) =>
                    handleLayoutChange({ showPrices: e.target.checked })
                  }
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  Show Prices
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={localSettings.layout.showCalories}
                  onChange={(e) =>
                    handleLayoutChange({ showCalories: e.target.checked })
                  }
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 flex items-center">
                  <Activity className="w-4 h-4 mr-1" />
                  Show Calories
                </span>
              </label>
            </div>
          </div>

          {/* Animation Settings */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Animations
            </h4>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={localSettings.layout.animations?.enabled || false}
                  onChange={(e) =>
                    handleLayoutChange({
                      animations: {
                        ...(localSettings.layout.animations || {
                          type: 'fade',
                          duration: 500,
                        }),
                        enabled: e.target.checked,
                      },
                    })
                  }
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Enable Animations
                </span>
              </label>
              {localSettings.layout.animations?.enabled && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Animation Type
                    </label>
                    <select
                      value={localSettings.layout.animations.type}
                      onChange={(e) =>
                        handleLayoutChange({
                          animations: {
                            ...localSettings.layout.animations!,
                            type: e.target.value as 'fade' | 'slide' | 'zoom' | 'none',
                          },
                        })
                      }
                      className="input"
                    >
                      <option value="fade">Fade</option>
                      <option value="slide">Slide</option>
                      <option value="zoom">Zoom</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Duration (ms)
                    </label>
                    <input
                      type="number"
                      value={localSettings.layout.animations.duration}
                      onChange={(e) =>
                        handleLayoutChange({
                          animations: {
                            ...localSettings.layout.animations!,
                            duration: parseInt(e.target.value),
                          },
                        })
                      }
                      className="input"
                      min="100"
                      max="2000"
                      step="100"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn-primary"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuSettings;