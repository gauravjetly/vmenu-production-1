import React, { useState } from 'react';
import { Menu, MenuItem } from '../../models';
import { X, Monitor, Smartphone, Tablet } from 'lucide-react';

interface MenuPreviewProps {
  menu: Menu;
  onClose: () => void;
}

type DeviceType = 'desktop' | 'tablet' | 'mobile';

const MenuPreview: React.FC<MenuPreviewProps> = ({ menu, onClose }) => {
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>('desktop');

  const deviceClasses = {
    desktop: 'w-full',
    tablet: 'max-w-2xl mx-auto',
    mobile: 'max-w-sm mx-auto',
  };

  const renderMenuItem = (item: MenuItem) => {
    const showImage = menu.layout.showImages && item.images?.[0];
    const showDescription = menu.layout.showDescriptions && item.description;
    const showPrice = menu.layout.showPrices;
    const showCalories = menu.layout.showCalories && item.nutritionalInfo?.calories;

    return (
      <div
        key={item.id}
        className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
      >
        <div className={`${showImage ? 'flex space-x-4' : ''}`}>
          {showImage && (
            <img
              src={item.images[0]}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
            />
          )}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {item.name}
                  {item.isNew && (
                    <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded">
                      New
                    </span>
                  )}
                  {item.isPopular && (
                    <span className="ml-2 px-2 py-1 text-xs bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 rounded">
                      Popular
                    </span>
                  )}
                </h4>
                {showDescription && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {item.description}
                  </p>
                )}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {showPrice && (
                <div className="text-right ml-4">
                  <p className="font-bold text-lg text-gray-900 dark:text-white">
                    ${item.price.toFixed(2)}
                  </p>
                  {showCalories && item.nutritionalInfo && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.nutritionalInfo.calories} cal
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Menu Preview
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Device Selector */}
        <div className="flex items-center space-x-2 mt-4">
          <button
            onClick={() => setSelectedDevice('desktop')}
            className={`p-2 rounded ${
              selectedDevice === 'desktop'
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            <Monitor className="w-5 h-5" />
          </button>
          <button
            onClick={() => setSelectedDevice('tablet')}
            className={`p-2 rounded ${
              selectedDevice === 'tablet'
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            <Tablet className="w-5 h-5" />
          </button>
          <button
            onClick={() => setSelectedDevice('mobile')}
            className={`p-2 rounded ${
              selectedDevice === 'mobile'
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            <Smartphone className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-4">
        <div className={deviceClasses[selectedDevice]}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            {/* Menu Header */}
            <div className="p-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
              <h1 className="text-2xl font-bold">{menu.name}</h1>
              {menu.description && (
                <p className="mt-2 opacity-90">{menu.description}</p>
              )}
            </div>

            {/* Menu Categories */}
            <div className="p-6">
              {menu.categories.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  No categories yet. Add some categories to see the preview.
                </p>
              ) : (
                <div className="space-y-8">
                  {menu.categories.map((category) => (
                    <div key={category.id}>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {category.name}
                      </h2>
                      {category.description && (
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {category.description}
                        </p>
                      )}
                      <div
                        className={`grid gap-4 ${
                          menu.layout.columns === 1
                            ? 'grid-cols-1'
                            : menu.layout.columns === 2
                            ? 'grid-cols-1 md:grid-cols-2'
                            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                        }`}
                      >
                        {category.items.length === 0 ? (
                          <p className="text-sm text-gray-500 dark:text-gray-400 col-span-full">
                            No items in this category
                          </p>
                        ) : (
                          category.items.map(renderMenuItem)
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPreview;