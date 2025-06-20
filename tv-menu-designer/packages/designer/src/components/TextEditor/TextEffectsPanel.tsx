import React, { useState } from 'react';
import { EnhancedTextElement, TextShadow, TextGradient } from '@tv-menu-designer/shared';
import { Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import { ColorPicker } from './ColorPicker';

interface TextEffectsPanelProps {
  element: EnhancedTextElement;
  onChange: (element: EnhancedTextElement) => void;
}

export const TextEffectsPanel: React.FC<TextEffectsPanelProps> = ({ 
  element, 
  onChange 
}) => {
  const [activeEffect, setActiveEffect] = useState<'shadow' | 'outline' | 'gradient' | 'glow'>('shadow');
  const [showColorPicker, setShowColorPicker] = useState<string | null>(null);

  const updateStyle = (key: string, value: any) => {
    onChange({
      ...element,
      style: {
        ...element.style,
        [key]: value
      }
    });
  };

  const addShadow = () => {
    const newShadow: TextShadow = {
      color: 'rgba(0,0,0,0.3)',
      blur: 4,
      offsetX: 2,
      offsetY: 2
    };

    const currentShadows = element.style.multipleShadows || [];
    updateStyle('multipleShadows', [...currentShadows, newShadow]);
  };

  const updateShadow = (index: number, key: string, value: any) => {
    const shadows = [...(element.style.multipleShadows || [])];
    shadows[index] = { ...shadows[index], [key]: value };
    updateStyle('multipleShadows', shadows);
  };

  const removeShadow = (index: number) => {
    const shadows = element.style.multipleShadows?.filter((_, i) => i !== index);
    updateStyle('multipleShadows', shadows);
  };

  const renderShadowControls = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-sm">Text Shadows</h4>
        <button
          onClick={addShadow}
          className="flex items-center text-sm text-blue-500 hover:text-blue-600"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Shadow
        </button>
      </div>

      {element.style.multipleShadows?.map((shadow, index) => (
        <div key={index} className="border rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Shadow {index + 1}</span>
            <button
              onClick={() => removeShadow(index)}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {/* Shadow Color */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Color</label>
            <button
              onClick={() => setShowColorPicker(`shadow-${index}`)}
              className="w-full px-2 py-1 border rounded flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center">
                <div 
                  className="w-4 h-4 rounded mr-2 border"
                  style={{ backgroundColor: shadow.color }}
                />
                <span className="text-sm">{shadow.color}</span>
              </div>
            </button>
            {showColorPicker === `shadow-${index}` && (
              <ColorPicker
                color={shadow.color}
                onChange={(color) => updateShadow(index, 'color', color)}
                onClose={() => setShowColorPicker(null)}
              />
            )}
          </div>

          {/* Shadow Controls */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs text-gray-600 mb-1">X Offset</label>
              <input
                type="number"
                value={shadow.offsetX}
                onChange={(e) => updateShadow(index, 'offsetX', parseInt(e.target.value))}
                className="w-full px-2 py-1 text-sm border rounded"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Y Offset</label>
              <input
                type="number"
                value={shadow.offsetY}
                onChange={(e) => updateShadow(index, 'offsetY', parseInt(e.target.value))}
                className="w-full px-2 py-1 text-sm border rounded"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Blur</label>
              <input
                type="number"
                min="0"
                value={shadow.blur}
                onChange={(e) => updateShadow(index, 'blur', parseInt(e.target.value))}
                className="w-full px-2 py-1 text-sm border rounded"
              />
            </div>
          </div>
        </div>
      ))}

      {(!element.style.multipleShadows || element.style.multipleShadows.length === 0) && (
        <div className="text-center py-8 text-gray-400">
          <p className="text-sm">No shadows added yet</p>
        </div>
      )}
    </div>
  );

  const renderOutlineControls = () => (
    <div className="space-y-3">
      <h4 className="font-medium text-sm mb-2">Text Outline</h4>
      
      <div className="flex items-center mb-3">
        <input
          type="checkbox"
          checked={!!element.style.textStroke}
          onChange={(e) => {
            if (e.target.checked) {
              updateStyle('textStroke', {
                color: '#000000',
                width: 2
              });
            } else {
              updateStyle('textStroke', undefined);
            }
          }}
          className="mr-2"
        />
        <label className="text-sm">Enable outline</label>
      </div>

      {element.style.textStroke && (
        <>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Color</label>
            <button
              onClick={() => setShowColorPicker('outline')}
              className="w-full px-2 py-1 border rounded flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center">
                <div 
                  className="w-4 h-4 rounded mr-2 border"
                  style={{ backgroundColor: element.style.textStroke.color }}
                />
                <span className="text-sm">{element.style.textStroke.color}</span>
              </div>
            </button>
            {showColorPicker === 'outline' && (
              <ColorPicker
                color={element.style.textStroke.color}
                onChange={(color) => updateStyle('textStroke', {
                  ...element.style.textStroke,
                  color
                })}
                onClose={() => setShowColorPicker(null)}
              />
            )}
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">Width</label>
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.5"
              value={element.style.textStroke.width}
              onChange={(e) => updateStyle('textStroke', {
                ...element.style.textStroke,
                width: parseFloat(e.target.value)
              })}
              className="w-full"
            />
            <div className="text-xs text-gray-500 text-center">
              {element.style.textStroke.width}px
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderGradientControls = () => (
    <div className="space-y-3">
      <h4 className="font-medium text-sm mb-2">Text Gradient</h4>
      
      <div className="flex items-center mb-3">
        <input
          type="checkbox"
          checked={!!element.style.textGradient}
          onChange={(e) => {
            if (e.target.checked) {
              updateStyle('textGradient', {
                type: 'linear',
                colors: ['#FF0000', '#0000FF'],
                angle: 45
              });
            } else {
              updateStyle('textGradient', undefined);
            }
          }}
          className="mr-2"
        />
        <label className="text-sm">Enable gradient</label>
      </div>

      {element.style.textGradient && (
        <>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Type</label>
            <select
              value={element.style.textGradient.type}
              onChange={(e) => updateStyle('textGradient', {
                ...element.style.textGradient,
                type: e.target.value as 'linear' | 'radial'
              })}
              className="w-full px-2 py-1 text-sm border rounded"
            >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">Colors</label>
            <div className="space-y-2">
              {element.style.textGradient.colors.map((color, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowColorPicker(`gradient-${index}`)}
                    className="flex-1 px-2 py-1 border rounded flex items-center hover:bg-gray-50"
                  >
                    <div 
                      className="w-4 h-4 rounded mr-2 border"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm">{color}</span>
                  </button>
                  {element.style.textGradient!.colors.length > 2 && (
                    <button
                      onClick={() => {
                        const colors = element.style.textGradient!.colors.filter((_, i) => i !== index);
                        updateStyle('textGradient', {
                          ...element.style.textGradient,
                          colors
                        });
                      }}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                  {showColorPicker === `gradient-${index}` && (
                    <ColorPicker
                      color={color}
                      onChange={(newColor) => {
                        const colors = [...element.style.textGradient!.colors];
                        colors[index] = newColor;
                        updateStyle('textGradient', {
                          ...element.style.textGradient,
                          colors
                        });
                      }}
                      onClose={() => setShowColorPicker(null)}
                    />
                  )}
                </div>
              ))}
              <button
                onClick={() => {
                  const colors = [...element.style.textGradient!.colors, '#000000'];
                  updateStyle('textGradient', {
                    ...element.style.textGradient,
                    colors
                  });
                }}
                className="w-full py-1 text-sm text-blue-500 border border-dashed border-blue-300 rounded hover:bg-blue-50"
              >
                Add Color
              </button>
            </div>
          </div>

          {element.style.textGradient.type === 'linear' && (
            <div>
              <label className="block text-xs text-gray-600 mb-1">Angle</label>
              <input
                type="range"
                min="0"
                max="360"
                value={element.style.textGradient.angle || 0}
                onChange={(e) => updateStyle('textGradient', {
                  ...element.style.textGradient,
                  angle: parseInt(e.target.value)
                })}
                className="w-full"
              />
              <div className="text-xs text-gray-500 text-center">
                {element.style.textGradient.angle || 0}°
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );

  const renderGlowControls = () => (
    <div className="space-y-3">
      <h4 className="font-medium text-sm mb-2">Text Glow</h4>
      
      <div className="flex items-center mb-3">
        <input
          type="checkbox"
          checked={!!element.style.textGlow}
          onChange={(e) => {
            if (e.target.checked) {
              updateStyle('textGlow', {
                color: '#FFFF00',
                intensity: 50,
                spread: 10
              });
            } else {
              updateStyle('textGlow', undefined);
            }
          }}
          className="mr-2"
        />
        <label className="text-sm">Enable glow</label>
      </div>

      {element.style.textGlow && (
        <>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Color</label>
            <button
              onClick={() => setShowColorPicker('glow')}
              className="w-full px-2 py-1 border rounded flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center">
                <div 
                  className="w-4 h-4 rounded mr-2 border"
                  style={{ backgroundColor: element.style.textGlow.color }}
                />
                <span className="text-sm">{element.style.textGlow.color}</span>
              </div>
            </button>
            {showColorPicker === 'glow' && (
              <ColorPicker
                color={element.style.textGlow.color}
                onChange={(color) => updateStyle('textGlow', {
                  ...element.style.textGlow,
                  color
                })}
                onClose={() => setShowColorPicker(null)}
              />
            )}
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">Intensity</label>
            <input
              type="range"
              min="0"
              max="100"
              value={element.style.textGlow.intensity}
              onChange={(e) => updateStyle('textGlow', {
                ...element.style.textGlow,
                intensity: parseInt(e.target.value)
              })}
              className="w-full"
            />
            <div className="text-xs text-gray-500 text-center">
              {element.style.textGlow.intensity}%
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">Spread</label>
            <input
              type="range"
              min="0"
              max="50"
              value={element.style.textGlow.spread}
              onChange={(e) => updateStyle('textGlow', {
                ...element.style.textGlow,
                spread: parseInt(e.target.value)
              })}
              className="w-full"
            />
            <div className="text-xs text-gray-500 text-center">
              {element.style.textGlow.spread}px
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Effect Tabs */}
      <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg">
        <button
          onClick={() => setActiveEffect('shadow')}
          className={`flex-1 px-3 py-1.5 text-sm rounded ${
            activeEffect === 'shadow' 
              ? 'bg-white shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Shadow
        </button>
        <button
          onClick={() => setActiveEffect('outline')}
          className={`flex-1 px-3 py-1.5 text-sm rounded ${
            activeEffect === 'outline' 
              ? 'bg-white shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Outline
        </button>
        <button
          onClick={() => setActiveEffect('gradient')}
          className={`flex-1 px-3 py-1.5 text-sm rounded ${
            activeEffect === 'gradient' 
              ? 'bg-white shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Gradient
        </button>
        <button
          onClick={() => setActiveEffect('glow')}
          className={`flex-1 px-3 py-1.5 text-sm rounded ${
            activeEffect === 'glow' 
              ? 'bg-white shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Glow
        </button>
      </div>

      {/* Effect Controls */}
      <div>
        {activeEffect === 'shadow' && renderShadowControls()}
        {activeEffect === 'outline' && renderOutlineControls()}
        {activeEffect === 'gradient' && renderGradientControls()}
        {activeEffect === 'glow' && renderGlowControls()}
      </div>
    </div>
  );
};