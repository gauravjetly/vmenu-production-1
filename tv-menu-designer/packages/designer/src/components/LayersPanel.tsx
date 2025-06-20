import React from 'react';
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock,
  ChevronUp,
  ChevronDown,
  Trash2,
  Type,
  Image as ImageIcon,
  Square
} from 'lucide-react';
import { Element } from '@tv-menu-designer/shared';

interface LayersPanelProps {
  elements: Element[];
  selectedElementId: string | null;
  onSelectElement: (elementId: string) => void;
  onToggleVisibility: (elementId: string) => void;
  onToggleLock: (elementId: string) => void;
  onMoveLayer: (elementId: string, direction: 'up' | 'down') => void;
  onDeleteElement: (elementId: string) => void;
}

export const LayersPanel: React.FC<LayersPanelProps> = ({
  elements,
  selectedElementId,
  onSelectElement,
  onToggleVisibility,
  onToggleLock,
  onMoveLayer,
  onDeleteElement
}) => {
  const sortedElements = [...elements].sort((a, b) => b.layer - a.layer);

  const getElementIcon = (element: Element) => {
    switch (element.type) {
      case 'text':
        return <Type className="h-4 w-4" />;
      case 'image':
        return <ImageIcon className="h-4 w-4" />;
      case 'shape':
        return <Square className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getElementName = (element: Element) => {
    switch (element.type) {
      case 'text':
        return (element as any).content?.substring(0, 20) + '...' || 'Text';
      case 'image':
        return 'Image';
      case 'shape':
        return `${(element as any).shapeType || 'Shape'}`;
      default:
        return 'Element';
    }
  };

  return (
    <div className="w-64 bg-white border-l h-full flex flex-col">
      <div className="p-3 border-b">
        <h3 className="font-semibold text-sm">Layers</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {sortedElements.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            No elements yet
          </div>
        ) : (
          <div className="p-2">
            {sortedElements.map((element, index) => (
              <div
                key={element.id}
                className={`
                  flex items-center gap-2 p-2 rounded cursor-pointer
                  ${selectedElementId === element.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}
                  ${!element.visible ? 'opacity-50' : ''}
                `}
                onClick={() => onSelectElement(element.id)}
              >
                {/* Icon */}
                <div className="text-gray-600">
                  {getElementIcon(element)}
                </div>

                {/* Name */}
                <div className="flex-1 text-sm truncate">
                  {getElementName(element)}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  {/* Layer order */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveLayer(element.id, 'up');
                    }}
                    disabled={index === 0}
                    className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
                    title="Move up"
                  >
                    <ChevronUp className="h-3 w-3" />
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveLayer(element.id, 'down');
                    }}
                    disabled={index === sortedElements.length - 1}
                    className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
                    title="Move down"
                  >
                    <ChevronDown className="h-3 w-3" />
                  </button>

                  {/* Visibility */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleVisibility(element.id);
                    }}
                    className="p-1 hover:bg-gray-200 rounded"
                    title={element.visible ? 'Hide' : 'Show'}
                  >
                    {element.visible ? (
                      <Eye className="h-3 w-3" />
                    ) : (
                      <EyeOff className="h-3 w-3" />
                    )}
                  </button>

                  {/* Lock */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleLock(element.id);
                    }}
                    className="p-1 hover:bg-gray-200 rounded"
                    title={element.locked ? 'Unlock' : 'Lock'}
                  >
                    {element.locked ? (
                      <Lock className="h-3 w-3" />
                    ) : (
                      <Unlock className="h-3 w-3" />
                    )}
                  </button>

                  {/* Delete */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteElement(element.id);
                    }}
                    className="p-1 hover:bg-gray-200 rounded text-red-500"
                    title="Delete"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};