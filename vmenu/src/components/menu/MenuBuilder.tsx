import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Menu, Category, MenuItem } from '../../models';
import CategoryCard from './CategoryCard';
import MenuPreview from './MenuPreview';
import MenuSettings from './MenuSettings';
import { Plus, Save, Eye, Settings, Layout, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface MenuBuilderProps {
  menu: Menu;
  onSave: (menu: Menu) => Promise<void>;
  isLoading?: boolean;
}

const MenuBuilder: React.FC<MenuBuilderProps> = ({ menu, onSave, isLoading }) => {
  const [localMenu, setLocalMenu] = useState<Menu>(menu);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setLocalMenu(menu);
    setHasChanges(false);
  }, [menu]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = localMenu.categories.findIndex((cat) => cat.id === active.id);
      const newIndex = localMenu.categories.findIndex((cat) => cat.id === over.id);

      const newCategories = arrayMove(localMenu.categories, oldIndex, newIndex).map(
        (cat, index) => ({ ...cat, displayOrder: index })
      );

      setLocalMenu({ ...localMenu, categories: newCategories });
      setHasChanges(true);
    }

    setActiveId(null);
  };

  const handleAddCategory = () => {
    const newCategory: Category = {
      id: `cat_${Date.now()}`,
      name: 'New Category',
      displayOrder: localMenu.categories.length,
      items: [],
    };

    setLocalMenu({
      ...localMenu,
      categories: [...localMenu.categories, newCategory],
    });
    setHasChanges(true);
  };

  const handleUpdateCategory = (categoryId: string, updates: Partial<Category>) => {
    const updatedCategories = localMenu.categories.map((cat) =>
      cat.id === categoryId ? { ...cat, ...updates } : cat
    );

    setLocalMenu({ ...localMenu, categories: updatedCategories });
    setHasChanges(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    const updatedCategories = localMenu.categories
      .filter((cat) => cat.id !== categoryId)
      .map((cat, index) => ({ ...cat, displayOrder: index }));

    setLocalMenu({ ...localMenu, categories: updatedCategories });
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(localMenu);
      setHasChanges(false);
      toast.success('Menu saved successfully!');
    } catch (error) {
      toast.error('Failed to save menu');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateSettings = (updates: Partial<Menu>) => {
    setLocalMenu({ ...localMenu, ...updates });
    setHasChanges(true);
  };

  const activeCategory = activeId
    ? localMenu.categories.find((cat) => cat.id === activeId)
    : null;

  return (
    <div className="flex h-full">
      {/* Main Builder Area */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {localMenu.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {localMenu.description || 'No description'}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Eye className="w-5 h-5" />
              </button>
              <button
                onClick={handleSave}
                disabled={!hasChanges || isSaving}
                className={`btn-primary flex items-center space-x-2 ${
                  !hasChanges || isSaving ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>Save Changes</span>
              </button>
            </div>
          </div>

          {/* Categories */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={localMenu.categories.map((cat) => cat.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {localMenu.categories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    onUpdate={(updates) => handleUpdateCategory(category.id, updates)}
                    onDelete={() => handleDeleteCategory(category.id)}
                  />
                ))}
              </div>
            </SortableContext>

            <DragOverlay>
              {activeCategory ? (
                <CategoryCard
                  category={activeCategory}
                  onUpdate={() => {}}
                  onDelete={() => {}}
                  isDragging
                />
              ) : null}
            </DragOverlay>
          </DndContext>

          {/* Add Category Button */}
          <button
            onClick={handleAddCategory}
            className="mt-6 w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 dark:hover:border-primary-400 transition-colors group"
          >
            <div className="flex items-center justify-center text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400">
              <Plus className="w-5 h-5 mr-2" />
              Add New Category
            </div>
          </button>
        </div>
      </div>

      {/* Preview Panel */}
      {showPreview && (
        <div className="w-96 border-l border-gray-200 dark:border-gray-700">
          <MenuPreview menu={localMenu} onClose={() => setShowPreview(false)} />
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="w-96 border-l border-gray-200 dark:border-gray-700">
          <MenuSettings
            menu={localMenu}
            onUpdate={handleUpdateSettings}
            onClose={() => setShowSettings(false)}
          />
        </div>
      )}
    </div>
  );
};

export default MenuBuilder;