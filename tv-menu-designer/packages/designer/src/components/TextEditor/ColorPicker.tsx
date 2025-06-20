import React, { useState, useRef, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { X } from 'lucide-react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  onClose: () => void;
  allowTransparent?: boolean;
}

const PRESET_COLORS = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
  '#FF00FF', '#00FFFF', '#808080', '#FF8C00', '#8B008B', '#008B8B',
  '#2F4F4F', '#FF1493', '#00CED1', '#FFD700', '#F0E68C', '#E6E6FA',
  '#DDA0DD', '#FF69B4', '#FFA07A', '#98FB98', '#87CEEB', '#F5DEB3'
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ 
  color, 
  onChange, 
  onClose,
  allowTransparent = false 
}) => {
  const [currentColor, setCurrentColor] = useState(color);
  const [hexInput, setHexInput] = useState(color);
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

  const handleColorChange = (newColor: string) => {
    setCurrentColor(newColor);
    setHexInput(newColor);
    onChange(newColor);
  };

  const handleHexInputChange = (value: string) => {
    setHexInput(value);
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      setCurrentColor(value);
      onChange(value);
    }
  };

  return (
    <div 
      ref={pickerRef}
      className="absolute z-50 mt-2 bg-white rounded-lg shadow-xl p-4"
      style={{ minWidth: '260px' }}
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-sm">Choose Color</h4>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Color Picker */}
      <div className="mb-3">
        <HexColorPicker color={currentColor} onChange={handleColorChange} />
      </div>

      {/* Hex Input */}
      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Hex Code
        </label>
        <input
          type="text"
          value={hexInput}
          onChange={(e) => handleHexInputChange(e.target.value)}
          className="w-full px-2 py-1 text-sm border rounded focus:ring-blue-500 focus:border-blue-500"
          placeholder="#000000"
        />
      </div>

      {/* Preset Colors */}
      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Preset Colors
        </label>
        <div className="grid grid-cols-8 gap-1">
          {PRESET_COLORS.map((presetColor) => (
            <button
              key={presetColor}
              onClick={() => handleColorChange(presetColor)}
              className={`w-7 h-7 rounded border-2 ${
                currentColor === presetColor ? 'border-blue-500' : 'border-gray-300'
              }`}
              style={{ backgroundColor: presetColor }}
              title={presetColor}
            />
          ))}
        </div>
      </div>

      {/* Transparent Option */}
      {allowTransparent && (
        <button
          onClick={() => {
            onChange('transparent');
            onClose();
          }}
          className="w-full py-2 text-sm border rounded hover:bg-gray-50"
        >
          Remove Background
        </button>
      )}

      {/* Apply Button */}
      <div className="flex justify-end space-x-2 mt-3">
        <button
          onClick={onClose}
          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onChange(currentColor);
            onClose();
          }}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Apply
        </button>
      </div>
    </div>
  );
};