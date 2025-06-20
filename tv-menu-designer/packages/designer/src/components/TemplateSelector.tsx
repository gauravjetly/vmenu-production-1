import React, { useState } from 'react';
import { MenuTemplate, getRestaurantTemplates } from '@tv-menu-designer/shared';
import { Check, Clock, Tag } from 'lucide-react';

interface TemplateSelectorProps {
  onTemplateSelect: (template: MenuTemplate) => void;
  onClose: () => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  onTemplateSelect, 
  onClose 
}) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [templates] = useState<MenuTemplate[]>(getRestaurantTemplates());

  const handleSelect = () => {
    if (selectedTemplateId) {
      const template = templates.find(t => t.id === selectedTemplateId);
      if (template) {
        onTemplateSelect(template);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="border-b px-6 py-4">
          <h2 className="text-2xl font-bold">Choose a Template</h2>
          <p className="text-gray-600 mt-1">Select a template to start designing your menu</p>
        </div>

        {/* Template Grid */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="grid grid-cols-2 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedTemplateId === template.id
                    ? 'border-blue-500 shadow-lg ring-2 ring-blue-200'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => setSelectedTemplateId(template.id)}
              >
                {/* Template Preview */}
                <div className="bg-gray-100 rounded aspect-video mb-4 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 transform scale-[0.2] origin-top-left"
                    style={{
                      width: '1920px',
                      height: '1080px',
                      backgroundColor: template.settings.canvas.backgroundColor
                    }}
                  >
                    {/* Simple preview of template elements */}
                    {template.pages[0]?.elements.slice(0, 5).map((element, idx) => {
                      if (element.type === 'shape') {
                        return (
                          <div
                            key={idx}
                            className="absolute"
                            style={{
                              left: element.position.x,
                              top: element.position.y,
                              width: element.size.width,
                              height: element.size.height,
                              backgroundColor: element.style.fill || '#ccc',
                              border: `${element.style.strokeWidth || 0}px solid ${element.style.stroke || '#000'}`,
                              opacity: element.opacity
                            }}
                          />
                        );
                      }
                      if (element.type === 'text') {
                        return (
                          <div
                            key={idx}
                            className="absolute"
                            style={{
                              left: element.position.x,
                              top: element.position.y,
                              fontSize: element.style.fontSize * 0.8,
                              fontFamily: element.style.fontFamily,
                              color: element.style.color,
                              fontWeight: element.style.fontWeight
                            }}
                          >
                            {element.content}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                  
                  {selectedTemplateId === template.id && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <h3 className="font-semibold text-lg mb-1">{template.metadata.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{template.metadata.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{template.settings.animations.autoPlayDuration}s</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    <span>{template.metadata.tags.join(', ')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSelect}
            disabled={!selectedTemplateId}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Use Template
          </button>
        </div>
      </div>
    </div>
  );
};