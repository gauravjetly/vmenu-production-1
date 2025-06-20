import React, { useState } from 'react';
import { MenuItem } from '../../models';
import { 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff, 
  Clock, 
  Flame,
  Tag,
  Image as ImageIcon
} from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
  onEdit: () => void;
  onDelete: () => void;
  onToggleAvailability: () => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ 
  item, 
  onEdit, 
  onDelete, 
  onToggleAvailability 
}) => {
  const [imageError, setImageError] = useState(false);

  const spicyIcons = ['', '🌶️', '🌶️🌶️', '🌶️🌶️🌶️'];

  return (
    <div className="menu-item-card">
      <div className="flex space-x-4">
        {/* Image */}
        {item.images?.[0] && !imageError ? (
          <img
            src={item.images[0]}
            alt={item.name}
            className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
            <ImageIcon className="w-8 h-8 text-gray-400" />
          </div>
        )}

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 dark:text-white flex items-center">
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
                {item.spicyLevel && item.spicyLevel > 0 && (
                  <span className="ml-2 text-sm">{spicyIcons[item.spicyLevel]}</span>
                )}
              </h4>
              
              {item.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                  {item.description}
                </p>
              )}

              {/* Tags and Info */}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                  ${item.price.toFixed(2)}
                </p>
                
                {item.preparationTime && (
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="w-3 h-3 mr-1" />
                    {item.preparationTime} min
                  </div>
                )}

                {item.nutritionalInfo?.calories && (
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Flame className="w-3 h-3 mr-1" />
                    {item.nutritionalInfo.calories} cal
                  </div>
                )}
              </div>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 3 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      +{item.tags.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-1 ml-4">
              <button
                onClick={onToggleAvailability}
                className={`p-2 rounded-lg transition-colors ${
                  item.availability.isAvailable
                    ? 'text-green-600 hover:text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'
                    : 'text-red-600 hover:text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                }`}
                title={item.availability.isAvailable ? 'Available' : 'Unavailable'}
              >
                {item.availability.isAvailable ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={onEdit}
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={onDelete}
                className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;