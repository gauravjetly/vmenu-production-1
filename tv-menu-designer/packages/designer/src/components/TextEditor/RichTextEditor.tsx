import React, { useState, useEffect, useRef } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify,
  Type,
  Palette,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { EnhancedTextElement, FontConfig, DEFAULT_FONTS, TEXT_STYLE_PRESETS } from '@tv-menu-designer/shared';
import { ColorPicker } from './ColorPicker';
import { FontPicker } from './FontPicker';
import { TextEffectsPanel } from './TextEffectsPanel';
import { TextStylePresets } from './TextStylePresets';

interface RichTextEditorProps {
  element: EnhancedTextElement;
  onChange: (element: EnhancedTextElement) => void;
  onClose?: () => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  element, 
  onChange,
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'effects' | 'presets'>('basic');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [showFontPicker, setShowFontPicker] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);

  // Load fonts
  useEffect(() => {
    loadFonts();
  }, []);

  const loadFonts = () => {
    DEFAULT_FONTS.forEach(font => {
      const link = document.createElement('link');
      link.href = font.variants[0].src;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    });
  };

  const updateStyle = (key: string, value: any) => {
    onChange({
      ...element,
      style: {
        ...element.style,
        [key]: value
      }
    });
  };

  const toggleFormat = (format: 'bold' | 'italic' | 'underline' | 'strikethrough') => {
    const currentStyle = element.style;
    let updates: any = {};

    switch (format) {
      case 'bold':
        updates.fontWeight = currentStyle.fontWeight === 'bold' ? 'normal' : 'bold';
        break;
      case 'italic':
        updates.fontStyle = currentStyle.fontStyle === 'italic' ? 'normal' : 'italic';
        break;
      case 'underline':
        updates.textDecoration = currentStyle.textDecoration === 'underline' ? 'none' : 'underline';
        break;
      case 'strikethrough':
        updates.textDecoration = currentStyle.textDecoration === 'line-through' ? 'none' : 'line-through';
        break;
    }

    onChange({
      ...element,
      style: {
        ...element.style,
        ...updates
      }
    });
  };

  const applyPreset = (preset: any) => {
    onChange({
      ...element,
      style: {
        ...element.style,
        ...preset.style
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-xl w-96 max-h-[80vh] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold text-lg">Text Editor</h3>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab('basic')}
          className={`flex-1 px-4 py-2 text-sm font-medium ${
            activeTab === 'basic' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Basic
        </button>
        <button
          onClick={() => setActiveTab('effects')}
          className={`flex-1 px-4 py-2 text-sm font-medium ${
            activeTab === 'effects' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Effects
        </button>
        <button
          onClick={() => setActiveTab('presets')}
          className={`flex-1 px-4 py-2 text-sm font-medium ${
            activeTab === 'presets' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Presets
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'basic' && (
          <div className="space-y-4">
            {/* Text Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Text Content
              </label>
              <textarea
                ref={textRef}
                value={element.content}
                onChange={(e) => onChange({ ...element, content: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
            </div>

            {/* Font Family */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Font
              </label>
              <button
                onClick={() => setShowFontPicker(!showFontPicker)}
                className="w-full px-3 py-2 border rounded-md flex items-center justify-between hover:bg-gray-50"
              >
                <span style={{ fontFamily: element.style.fontFamily }}>
                  {element.style.fontFamily}
                </span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {showFontPicker && (
                <FontPicker
                  fonts={DEFAULT_FONTS}
                  selectedFont={element.style.fontFamily}
                  onSelect={(font) => {
                    updateStyle('fontFamily', font.family);
                    setShowFontPicker(false);
                  }}
                  onClose={() => setShowFontPicker(false)}
                />
              )}
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Size
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="8"
                  max="120"
                  value={element.style.fontSize}
                  onChange={(e) => updateStyle('fontSize', parseInt(e.target.value))}
                  className="flex-1"
                />
                <input
                  type="number"
                  min="8"
                  max="120"
                  value={element.style.fontSize}
                  onChange={(e) => updateStyle('fontSize', parseInt(e.target.value))}
                  className="w-16 px-2 py-1 border rounded"
                />
              </div>
            </div>

            {/* Text Format */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Format
              </label>
              <div className="flex space-x-1">
                <button
                  onClick={() => toggleFormat('bold')}
                  className={`p-2 rounded hover:bg-gray-100 ${
                    element.style.fontWeight === 'bold' ? 'bg-gray-200' : ''
                  }`}
                >
                  <Bold className="h-4 w-4" />
                </button>
                <button
                  onClick={() => toggleFormat('italic')}
                  className={`p-2 rounded hover:bg-gray-100 ${
                    element.style.fontStyle === 'italic' ? 'bg-gray-200' : ''
                  }`}
                >
                  <Italic className="h-4 w-4" />
                </button>
                <button
                  onClick={() => toggleFormat('underline')}
                  className={`p-2 rounded hover:bg-gray-100 ${
                    element.style.textDecoration === 'underline' ? 'bg-gray-200' : ''
                  }`}
                >
                  <Underline className="h-4 w-4" />
                </button>
                <button
                  onClick={() => toggleFormat('strikethrough')}
                  className={`p-2 rounded hover:bg-gray-100 ${
                    element.style.textDecoration === 'line-through' ? 'bg-gray-200' : ''
                  }`}
                >
                  <Strikethrough className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Text Alignment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alignment
              </label>
              <div className="flex space-x-1">
                <button
                  onClick={() => updateStyle('textAlign', 'left')}
                  className={`p-2 rounded hover:bg-gray-100 ${
                    element.style.textAlign === 'left' ? 'bg-gray-200' : ''
                  }`}
                >
                  <AlignLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => updateStyle('textAlign', 'center')}
                  className={`p-2 rounded hover:bg-gray-100 ${
                    element.style.textAlign === 'center' ? 'bg-gray-200' : ''
                  }`}
                >
                  <AlignCenter className="h-4 w-4" />
                </button>
                <button
                  onClick={() => updateStyle('textAlign', 'right')}
                  className={`p-2 rounded hover:bg-gray-100 ${
                    element.style.textAlign === 'right' ? 'bg-gray-200' : ''
                  }`}
                >
                  <AlignRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => updateStyle('textAlign', 'justify')}
                  className={`p-2 rounded hover:bg-gray-100 ${
                    element.style.textAlign === 'justify' ? 'bg-gray-200' : ''
                  }`}
                >
                  <AlignJustify className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Colors */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Text Color
                </label>
                <button
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  className="w-full px-3 py-2 border rounded-md flex items-center justify-between hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <div 
                      className="w-5 h-5 rounded mr-2 border"
                      style={{ backgroundColor: element.style.color }}
                    />
                    <span className="text-sm">{element.style.color}</span>
                  </div>
                  <Palette className="h-4 w-4" />
                </button>
                {showColorPicker && (
                  <ColorPicker
                    color={element.style.color}
                    onChange={(color) => updateStyle('color', color)}
                    onClose={() => setShowColorPicker(false)}
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Background
                </label>
                <button
                  onClick={() => setShowBgColorPicker(!showBgColorPicker)}
                  className="w-full px-3 py-2 border rounded-md flex items-center justify-between hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <div 
                      className="w-5 h-5 rounded mr-2 border"
                      style={{ backgroundColor: element.style.backgroundColor || 'transparent' }}
                    />
                    <span className="text-sm">
                      {element.style.backgroundColor || 'None'}
                    </span>
                  </div>
                  <Palette className="h-4 w-4" />
                </button>
                {showBgColorPicker && (
                  <ColorPicker
                    color={element.style.backgroundColor || '#ffffff'}
                    onChange={(color) => updateStyle('backgroundColor', color)}
                    onClose={() => setShowBgColorPicker(false)}
                    allowTransparent
                  />
                )}
              </div>
            </div>

            {/* Spacing */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Line Height
                </label>
                <input
                  type="number"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={element.style.lineHeight || 1.2}
                  onChange={(e) => updateStyle('lineHeight', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Letter Spacing
                </label>
                <input
                  type="number"
                  min="-5"
                  max="20"
                  step="0.5"
                  value={element.style.letterSpacing || 0}
                  onChange={(e) => updateStyle('letterSpacing', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'effects' && (
          <TextEffectsPanel
            element={element}
            onChange={onChange}
          />
        )}

        {activeTab === 'presets' && (
          <TextStylePresets
            presets={TEXT_STYLE_PRESETS}
            onApply={applyPreset}
          />
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="flex justify-end space-x-2">
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          )}
          <button
            onClick={() => onClose?.()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};