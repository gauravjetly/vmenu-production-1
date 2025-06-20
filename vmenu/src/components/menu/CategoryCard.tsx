import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Category } from '../../models';
import { 
  GripVertical, 
  ChevronDown, 
  ChevronUp, 
  Edit2, 
  Trash2, 
  Plus,
  Image as ImageIcon
} from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  onUpdate: (updates: Partial<Category>) => void;
  onDelete: () => void;
  isDragging?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category, 
  onUpdate, 
  onDelete,
  isDragging = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(category.name);
  const [editDescription, setEditDescription] = useState(category.description || '');

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSaveEdit = () => {
    onUpdate({
      name: editName,
      description: editDescription || undefined,
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditName(category.name);
    setEditDescription(category.description || '');
    setIsEditing(false);
  };

  if (isDragging) {
    return (
      <div className="card opacity-50">
        <div className="flex items-center">
          <GripVertical className="w-5 h-5 text-gray-400 mr-3" />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {category.name}
            </h3>
            {category.items.length > 0 && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {category.items.length} items
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="card"
    >
      {/* Category Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 -ml-1 mr-2"
          >
            <GripVertical className="w-5 h-5 text-gray-400" />
          </div>

          {isEditing ? (
            <div className="flex-1 flex items-center space-x-2">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="input flex-1"
                placeholder="Category name"
                autoFocus
              />
              <button
                onClick={handleSaveEdit}
                className="text-green-600 hover:text-green-700 dark:text-green-400"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="text-gray-600 hover:text-gray-700 dark:text-gray-400"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {category.name}
              </h3>
              {category.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {category.description}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Category Content */}
      {isExpanded && (
        <div className="mt-4">
          {isEditing && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description (optional)
              </label>
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="input"
                rows={2}
                placeholder="Category description"
              />
            </div>
          )}

          {/* Category Image */}
          {category.image ? (
            <div className="mb-4">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
          ) : (
            <div className="mb-4 p-8 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
              <div className="text-center">
                <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  No category image
                </p>
              </div>
            </div>
          )}

          {/* Menu Items */}
          <div className="space-y-2">
            {category.items.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                No items in this category
              </p>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {category.items.length} items
              </p>
            )}
          </div>

          {/* Add Item Button */}
          <button className="mt-4 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 dark:hover:border-primary-400 transition-colors flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
            <Plus className="w-4 h-4 mr-2" />
            Add Menu Item
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryCard;