import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { MenuTemplate, TextElement, ImageElement, ShapeElement, Element } from '@tv-menu-designer/shared';
import { v4 as uuidv4 } from 'uuid';
import { ImageUploader } from './ImageUploader';
import { ArrowUp, ArrowDown, Layers } from 'lucide-react';

interface MenuCanvasProps {
  template: MenuTemplate;
  onUpdate: (template: MenuTemplate) => void;
}

export const MenuCanvas: React.FC<MenuCanvasProps> = ({ template, onUpdate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null);
  const [showImageUploader, setShowImageUploader] = useState(false);
  
  // Ensure template has proper structure
  const safeTemplate = React.useMemo(() => {
    if (!template.pages || template.pages.length === 0) {
      console.warn('Template missing pages - creating default structure');
      return {
        ...template,
        pages: [{
          id: uuidv4(),
          name: 'Page 1',
          elements: []
        }]
      };
    }
    return template;
  }, [template]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 1920,
      height: 1080,
      backgroundColor: safeTemplate.settings.canvas.backgroundColor || '#ffffff',
    });

    // Enable object selection
    fabricCanvas.selection = true;

    // Handle selection events
    fabricCanvas.on('selection:created', (e) => {
      setSelectedObject(e.selected?.[0] || null);
    });

    fabricCanvas.on('selection:updated', (e) => {
      setSelectedObject(e.selected?.[0] || null);
    });

    fabricCanvas.on('selection:cleared', () => {
      setSelectedObject(null);
    });

    // Handle object modifications
    fabricCanvas.on('object:modified', () => {
      saveCanvasState(fabricCanvas);
    });

    setCanvas(fabricCanvas);

    // Load existing elements
    loadElements(fabricCanvas, safeTemplate);

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  const loadElements = (canvas: fabric.Canvas, template: MenuTemplate) => {
    if (!template) {
      console.error('Template is null or undefined');
      return;
    }
    
    if (!template.pages || !template.pages[0]) {
      console.warn('Template pages missing - creating default page');
      if (!template.pages) {
        template.pages = [];
      }
      if (template.pages.length === 0) {
        template.pages.push({
          id: uuidv4(),
          name: 'Page 1',
          elements: []
        });
      }
      return; // No elements to load yet
    }

    // Sort elements by layer for proper z-ordering
    const sortedElements = [...template.pages[0].elements].sort((a, b) => a.layer - b.layer);

    sortedElements.forEach((element) => {
      if (element.type === 'text') {
        const textElement = element as TextElement;
        const text = new fabric.Text(textElement.content, {
          left: element.position.x,
          top: element.position.y,
          fontSize: textElement.style.fontSize,
          fontFamily: textElement.style.fontFamily,
          fill: textElement.style.color,
          fontWeight: textElement.style.fontWeight || 'normal',
          fontStyle: textElement.style.fontStyle || 'normal',
          textAlign: textElement.style.textAlign || 'left',
          underline: textElement.style.textDecoration === 'underline',
          lineHeight: textElement.style.lineHeight || 1.16,
          id: element.id,
        });
        canvas.add(text);
      } else if (element.type === 'image') {
        const imageElement = element as ImageElement;
        fabric.Image.fromURL(imageElement.src, (img) => {
          // Check if canvas still exists (component not unmounted)
          if (!canvas || (canvas as any).disposed) return;
          
          img.set({
            left: element.position.x,
            top: element.position.y,
            width: element.size.width,
            height: element.size.height,
            angle: element.rotation,
            opacity: element.opacity,
            id: element.id,
          });
          
          // Double-check canvas is still valid before operations
          if (canvas && !(canvas as any).disposed && canvas.getContext()) {
            canvas.add(img);
            canvas.renderAll();
          }
        }, {
          crossOrigin: 'anonymous'
        });
      } else if (element.type === 'shape') {
        const shapeElement = element as ShapeElement;
        let shapeObject: fabric.Object | null = null;

        if (shapeElement.shapeType === 'rectangle') {
          shapeObject = new fabric.Rect({
            left: element.position.x,
            top: element.position.y,
            width: element.size.width,
            height: element.size.height,
            fill: shapeElement.style.fill || 'transparent',
            stroke: shapeElement.style.stroke,
            strokeWidth: shapeElement.style.strokeWidth || 0,
            angle: element.rotation,
            opacity: element.opacity,
            id: element.id,
          });
        } else if (shapeElement.shapeType === 'circle') {
          shapeObject = new fabric.Circle({
            left: element.position.x,
            top: element.position.y,
            radius: Math.min(element.size.width, element.size.height) / 2,
            fill: shapeElement.style.fill || 'transparent',
            stroke: shapeElement.style.stroke,
            strokeWidth: shapeElement.style.strokeWidth || 0,
            angle: element.rotation,
            opacity: element.opacity,
            id: element.id,
          });
        }

        if (shapeObject) {
          canvas.add(shapeObject);
        }
      }
    });
  };

  const saveCanvasState = (canvas: fabric.Canvas) => {
    const objects = canvas.getObjects();
    const elements: Element[] = objects.map((obj, index) => {
      const baseElement = {
        id: (obj as any).id || uuidv4(),
        position: {
          x: obj.left || 0,
          y: obj.top || 0,
        },
        size: {
          width: obj.width || 100,
          height: obj.height || 50,
        },
        layer: index, // Use object order as layer
        locked: false,
        visible: true,
        rotation: obj.angle || 0,
        opacity: obj.opacity || 1,
      };

      if (obj.type === 'text') {
        const textObj = obj as fabric.Text;
        return {
          ...baseElement,
          type: 'text',
          content: textObj.text || '',
          style: {
            fontFamily: textObj.fontFamily || 'Arial',
            fontSize: textObj.fontSize || 16,
            color: textObj.fill?.toString() || '#000000',
            fontWeight: textObj.fontWeight || 'normal',
            fontStyle: textObj.fontStyle || 'normal',
            textAlign: textObj.textAlign || 'left',
            textDecoration: textObj.underline ? 'underline' : 'none',
            lineHeight: textObj.lineHeight || 1.16,
          },
        } as TextElement;
      } else if (obj.type === 'image') {
        const imgObj = obj as fabric.Image & { src?: string };
        return {
          ...baseElement,
          type: 'image',
          src: imgObj.src || imgObj.getSrc() || '',
          alt: '',
          style: {
            objectFit: 'contain',
          },
        } as ImageElement;
      } else if (obj.type === 'rect' || obj.type === 'circle') {
        const shapeObj = obj as fabric.Rect | fabric.Circle;
        return {
          ...baseElement,
          type: 'shape',
          shapeType: obj.type === 'rect' ? 'rectangle' : 'circle',
          style: {
            fill: shapeObj.fill?.toString() || 'transparent',
            stroke: shapeObj.stroke?.toString() || 'transparent',
            strokeWidth: shapeObj.strokeWidth || 0,
          },
        } as ShapeElement;
      }

      // Default to shape element for unknown types
      return {
        ...baseElement,
        type: 'shape',
        shapeType: 'rectangle',
        style: {
          fill: '#cccccc',
          stroke: 'transparent',
          strokeWidth: 0,
        },
      } as ShapeElement;
    });

    // Template should always have pages due to safeTemplate
    if (!safeTemplate.pages || safeTemplate.pages.length === 0) {
      console.error('Unexpected: safeTemplate should always have pages');
      return;
    }

    const updatedTemplate: MenuTemplate = {
      ...safeTemplate,
      pages: [
        {
          ...(safeTemplate.pages[0] || { id: uuidv4(), name: 'Page 1' }),
          elements,
        },
      ],
    };

    onUpdate(updatedTemplate);
  };

  const addText = () => {
    if (!canvas) return;

    const text = new fabric.Text('New Text', {
      left: 100,
      top: 100,
      fontSize: 32,
      fontFamily: 'Arial',
      fill: '#000000',
      id: uuidv4(),
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
    saveCanvasState(canvas);
  };

  const deleteSelected = () => {
    if (!canvas || !selectedObject) return;

    canvas.remove(selectedObject);
    canvas.renderAll();
    saveCanvasState(canvas);
    setSelectedObject(null);
  };

  const updateTextColor = (color: string) => {
    if (!canvas || !selectedObject || selectedObject.type !== 'text') return;

    selectedObject.set('fill', color);
    canvas.renderAll();
    saveCanvasState(canvas);
  };

  const updateFontSize = (size: number) => {
    if (!canvas || !selectedObject || selectedObject.type !== 'text') return;

    (selectedObject as fabric.Text).set('fontSize', size);
    canvas.renderAll();
    saveCanvasState(canvas);
  };

  const addImage = (imageUrl: string) => {
    if (!canvas) return;

    fabric.Image.fromURL(imageUrl, (img) => {
      const scale = Math.min(500 / (img.width || 1), 500 / (img.height || 1));
      img.set({
        left: 100,
        top: 100,
        scaleX: scale,
        scaleY: scale,
        id: uuidv4(),
        src: imageUrl,
      } as any);

      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
      saveCanvasState(canvas);
    });
  };

  const handleImageSelected = (imageUrl: string) => {
    // Convert relative URL to absolute URL
    const absoluteUrl = imageUrl.startsWith('http') 
      ? imageUrl 
      : `${window.location.origin.replace(':3002', ':3003')}${imageUrl}`;
    
    addImage(absoluteUrl);
    setShowImageUploader(false);
  };

  const addRectangle = () => {
    if (!canvas) return;

    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: 200,
      height: 150,
      fill: '#e0e0e0',
      stroke: '#666666',
      strokeWidth: 2,
      id: uuidv4(),
    });

    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.renderAll();
    saveCanvasState(canvas);
  };

  const addCircle = () => {
    if (!canvas) return;

    const circle = new fabric.Circle({
      left: 100,
      top: 100,
      radius: 75,
      fill: '#e0e0e0',
      stroke: '#666666',
      strokeWidth: 2,
      id: uuidv4(),
    });

    canvas.add(circle);
    canvas.setActiveObject(circle);
    canvas.renderAll();
    saveCanvasState(canvas);
  };

  const moveLayerUp = () => {
    if (!canvas || !selectedObject) return;

    const objects = canvas.getObjects();
    const currentIndex = objects.indexOf(selectedObject);
    
    if (currentIndex < objects.length - 1) {
      canvas.bringForward(selectedObject);
      canvas.renderAll();
      saveCanvasState(canvas);
    }
  };

  const moveLayerDown = () => {
    if (!canvas || !selectedObject) return;

    const objects = canvas.getObjects();
    const currentIndex = objects.indexOf(selectedObject);
    
    if (currentIndex > 0) {
      canvas.sendBackwards(selectedObject);
      canvas.renderAll();
      saveCanvasState(canvas);
    }
  };

  const bringToFront = () => {
    if (!canvas || !selectedObject) return;
    
    canvas.bringToFront(selectedObject);
    canvas.renderAll();
    saveCanvasState(canvas);
  };

  const sendToBack = () => {
    if (!canvas || !selectedObject) return;
    
    canvas.sendToBack(selectedObject);
    canvas.renderAll();
    saveCanvasState(canvas);
  };

  return (
    <div className="flex h-full">
      {/* Toolbar */}
      <div className="w-64 bg-gray-100 p-4 space-y-4">
        <h3 className="font-semibold text-lg">Tools</h3>
        
        <button
          onClick={addText}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Text
        </button>

        <button
          onClick={() => setShowImageUploader(true)}
          className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Image
        </button>

        <button
          onClick={addRectangle}
          className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Add Rectangle
        </button>

        <button
          onClick={addCircle}
          className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Add Circle
        </button>

        {selectedObject && (
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <Layers className="h-4 w-4" />
              Layer Controls
            </h4>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={moveLayerUp}
                className="flex items-center justify-center gap-1 px-3 py-2 border rounded hover:bg-gray-200"
                title="Move up one layer"
              >
                <ArrowUp className="h-4 w-4" />
                Up
              </button>
              <button
                onClick={moveLayerDown}
                className="flex items-center justify-center gap-1 px-3 py-2 border rounded hover:bg-gray-200"
                title="Move down one layer"
              >
                <ArrowDown className="h-4 w-4" />
                Down
              </button>
              <button
                onClick={bringToFront}
                className="px-3 py-2 text-sm border rounded hover:bg-gray-200"
                title="Bring to front"
              >
                To Front
              </button>
              <button
                onClick={sendToBack}
                className="px-3 py-2 text-sm border rounded hover:bg-gray-200"
                title="Send to back"
              >
                To Back
              </button>
            </div>
          </div>
        )}

        {selectedObject && selectedObject.type === 'text' && (
          <div className="space-y-4">
            <h4 className="font-medium">Text Properties</h4>
            
            <div>
              <label className="block text-sm font-medium mb-1">Font Family</label>
              <select
                value={(selectedObject as fabric.Text).fontFamily || 'Arial'}
                onChange={(e) => {
                  (selectedObject as fabric.Text).set('fontFamily', e.target.value);
                  canvas?.renderAll();
                  saveCanvasState(canvas!);
                }}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Georgia">Georgia</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
                <option value="Verdana">Verdana</option>
                <option value="Playfair Display">Playfair Display</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Roboto">Roboto</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Font Size</label>
              <input
                type="number"
                value={(selectedObject as fabric.Text).fontSize || 16}
                onChange={(e) => updateFontSize(parseInt(e.target.value))}
                className="w-full px-3 py-2 border rounded"
                min="8"
                max="200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Text Style</label>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const currentWeight = (selectedObject as fabric.Text).fontWeight;
                    (selectedObject as fabric.Text).set('fontWeight', currentWeight === 'bold' ? 'normal' : 'bold');
                    canvas?.renderAll();
                    saveCanvasState(canvas!);
                  }}
                  className={`px-3 py-1 border rounded ${
                    (selectedObject as fabric.Text).fontWeight === 'bold' ? 'bg-gray-200' : ''
                  }`}
                >
                  <strong>B</strong>
                </button>
                <button
                  onClick={() => {
                    const currentStyle = (selectedObject as fabric.Text).fontStyle;
                    (selectedObject as fabric.Text).set('fontStyle', currentStyle === 'italic' ? 'normal' : 'italic');
                    canvas?.renderAll();
                    saveCanvasState(canvas!);
                  }}
                  className={`px-3 py-1 border rounded ${
                    (selectedObject as fabric.Text).fontStyle === 'italic' ? 'bg-gray-200' : ''
                  }`}
                >
                  <em>I</em>
                </button>
                <button
                  onClick={() => {
                    const currentUnderline = (selectedObject as fabric.Text).underline;
                    (selectedObject as fabric.Text).set('underline', !currentUnderline);
                    canvas?.renderAll();
                    saveCanvasState(canvas!);
                  }}
                  className={`px-3 py-1 border rounded ${
                    (selectedObject as fabric.Text).underline ? 'bg-gray-200' : ''
                  }`}
                >
                  <u>U</u>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Text Align</label>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    (selectedObject as fabric.Text).set('textAlign', 'left');
                    canvas?.renderAll();
                    saveCanvasState(canvas!);
                  }}
                  className={`px-3 py-1 border rounded ${
                    (selectedObject as fabric.Text).textAlign === 'left' ? 'bg-gray-200' : ''
                  }`}
                >
                  ⬅️
                </button>
                <button
                  onClick={() => {
                    (selectedObject as fabric.Text).set('textAlign', 'center');
                    canvas?.renderAll();
                    saveCanvasState(canvas!);
                  }}
                  className={`px-3 py-1 border rounded ${
                    (selectedObject as fabric.Text).textAlign === 'center' ? 'bg-gray-200' : ''
                  }`}
                >
                  ⬆️
                </button>
                <button
                  onClick={() => {
                    (selectedObject as fabric.Text).set('textAlign', 'right');
                    canvas?.renderAll();
                    saveCanvasState(canvas!);
                  }}
                  className={`px-3 py-1 border rounded ${
                    (selectedObject as fabric.Text).textAlign === 'right' ? 'bg-gray-200' : ''
                  }`}
                >
                  ➡️
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Color</label>
              <input
                type="color"
                value={(selectedObject as fabric.Text).fill?.toString() || '#000000'}
                onChange={(e) => updateTextColor(e.target.value)}
                className="w-full h-10 rounded border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Line Height</label>
              <input
                type="number"
                value={(selectedObject as fabric.Text).lineHeight || 1.16}
                onChange={(e) => {
                  (selectedObject as fabric.Text).set('lineHeight', parseFloat(e.target.value));
                  canvas?.renderAll();
                  saveCanvasState(canvas!);
                }}
                className="w-full px-3 py-2 border rounded"
                min="0.5"
                max="3"
                step="0.1"
              />
            </div>

            <button
              onClick={deleteSelected}
              className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        )}

        {selectedObject && selectedObject.type === 'image' && (
          <div className="space-y-4">
            <h4 className="font-medium">Image Properties</h4>
            
            <div>
              <label className="block text-sm font-medium mb-1">Opacity</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={selectedObject.opacity || 1}
                onChange={(e) => {
                  selectedObject.set('opacity', parseFloat(e.target.value));
                  canvas?.renderAll();
                  saveCanvasState(canvas!);
                }}
                className="w-full"
              />
            </div>

            <button
              onClick={deleteSelected}
              className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        )}

        {selectedObject && (selectedObject.type === 'rect' || selectedObject.type === 'circle') && (
          <div className="space-y-4">
            <h4 className="font-medium">Shape Properties</h4>
            
            <div>
              <label className="block text-sm font-medium mb-1">Fill Color</label>
              <input
                type="color"
                value={(selectedObject as fabric.Rect | fabric.Circle).fill?.toString() || '#000000'}
                onChange={(e) => {
                  selectedObject.set('fill', e.target.value);
                  canvas?.renderAll();
                  saveCanvasState(canvas!);
                }}
                className="w-full h-10 rounded border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Stroke Color</label>
              <input
                type="color"
                value={(selectedObject as fabric.Rect | fabric.Circle).stroke?.toString() || '#000000'}
                onChange={(e) => {
                  selectedObject.set('stroke', e.target.value);
                  canvas?.renderAll();
                  saveCanvasState(canvas!);
                }}
                className="w-full h-10 rounded border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Stroke Width</label>
              <input
                type="number"
                value={(selectedObject as fabric.Rect | fabric.Circle).strokeWidth || 0}
                onChange={(e) => {
                  selectedObject.set('strokeWidth', parseInt(e.target.value));
                  canvas?.renderAll();
                  saveCanvasState(canvas!);
                }}
                className="w-full px-3 py-2 border rounded"
                min="0"
                max="20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Opacity</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={selectedObject.opacity || 1}
                onChange={(e) => {
                  selectedObject.set('opacity', parseFloat(e.target.value));
                  canvas?.renderAll();
                  saveCanvasState(canvas!);
                }}
                className="w-full"
              />
            </div>

            <button
              onClick={deleteSelected}
              className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Canvas */}
      <div className="flex-1 bg-gray-200 p-8 overflow-auto">
        <div className="inline-block shadow-lg">
          <canvas ref={canvasRef} />
        </div>
      </div>

      {/* Image Uploader Modal */}
      {showImageUploader && (
        <ImageUploader
          onImageSelected={handleImageSelected}
          onClose={() => setShowImageUploader(false)}
        />
      )}
    </div>
  );
};