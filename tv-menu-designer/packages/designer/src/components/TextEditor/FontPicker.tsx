import React, { useState, useRef, useEffect } from 'react';
import { FontConfig } from '@tv-menu-designer/shared';
import { Search, X } from 'lucide-react';

interface FontPickerProps {
  fonts: FontConfig[];
  selectedFont: string;
  onSelect: (font: FontConfig) => void;
  onClose: () => void;
}

export const FontPicker: React.FC<FontPickerProps> = ({ 
  fonts, 
  selectedFont, 
  onSelect, 
  onClose 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const categories = ['all', 'serif', 'sans-serif', 'display', 'handwriting', 'monospace'];

  const filteredFonts = fonts.filter(font => {
    const matchesSearch = font.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || font.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div 
      ref={pickerRef}
      className="absolute z-50 mt-2 bg-white rounded-lg shadow-xl"
      style={{ width: '320px', maxHeight: '400px' }}
    >
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium">Choose Font</h4>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search fonts..."
            className="w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1 mt-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 text-xs rounded-full ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Font List */}
      <div className="overflow-y-auto" style={{ maxHeight: '280px' }}>
        {filteredFonts.map(font => (
          <button
            key={font.id}
            onClick={() => onSelect(font)}
            className={`w-full px-4 py-3 text-left hover:bg-gray-50 border-b ${
              font.family === selectedFont ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div 
                  className="text-lg"
                  style={{ fontFamily: font.family }}
                >
                  {font.name}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {font.category} • {font.variants.length} styles
                </div>
              </div>
              {font.family === selectedFont && (
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};