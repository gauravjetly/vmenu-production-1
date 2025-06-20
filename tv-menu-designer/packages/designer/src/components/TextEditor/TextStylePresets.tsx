import React from 'react';
import { TextStylePreset } from '@tv-menu-designer/shared';

interface TextStylePresetsProps {
  presets: TextStylePreset[];
  onApply: (preset: TextStylePreset) => void;
}

export const TextStylePresets: React.FC<TextStylePresetsProps> = ({ 
  presets, 
  onApply 
}) => {
  const groupedPresets = presets.reduce((acc, preset) => {
    if (!acc[preset.category]) {
      acc[preset.category] = [];
    }
    acc[preset.category].push(preset);
    return acc;
  }, {} as Record<string, TextStylePreset[]>);

  return (
    <div className="space-y-4">
      {Object.entries(groupedPresets).map(([category, categoryPresets]) => (
        <div key={category}>
          <h4 className="font-medium text-sm text-gray-700 mb-2 capitalize">
            {category} Styles
          </h4>
          <div className="space-y-2">
            {categoryPresets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => onApply(preset)}
                className="w-full p-3 border rounded-lg hover:bg-gray-50 text-left transition-colors"
              >
                <div 
                  className="mb-1"
                  style={{
                    fontFamily: preset.style.fontFamily,
                    fontSize: Math.min(preset.style.fontSize, 24),
                    fontWeight: preset.style.fontWeight,
                    fontStyle: preset.style.fontStyle,
                    color: preset.style.color,
                    textTransform: preset.style.textTransform as any,
                    letterSpacing: preset.style.letterSpacing ? `${preset.style.letterSpacing}px` : undefined,
                    textShadow: preset.style.textShadow 
                      ? `${preset.style.textShadow.x}px ${preset.style.textShadow.y}px ${preset.style.textShadow.blur}px ${preset.style.textShadow.color}`
                      : undefined
                  }}
                >
                  {preset.name}
                </div>
                <div className="text-xs text-gray-500">
                  {preset.style.fontFamily} • {preset.style.fontSize}px
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};