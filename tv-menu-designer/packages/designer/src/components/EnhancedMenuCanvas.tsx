import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { 
  MenuTemplate, 
  Element,
  EnhancedTextElement,
  ImageElement, 
  ShapeElement,
  DEFAULT_FONTS
} from '@tv-menu-designer/shared';
import { v4 as uuidv4 } from 'uuid';
import { RichTextEditor } from './TextEditor';
import { ImageUploader } from './ImageUploader';
import { CanvasToolbar } from './CanvasToolbar';
import { LayersPanel } from './LayersPanel';
import toast from 'react-hot-toast';
import { 
  Type, 
  Image as ImageIcon, 
  Square, 
  Circle, 
  Triangle,
  Trash2,
  Copy,
  Layers,
  Lock,
  Unlock,
  Eye,
  EyeOff
} from 'lucide-react';

interface EnhancedMenuCanvasProps {
  template: MenuTemplate;
  onUpdate: (template: MenuTemplate) => void;
}

export const EnhancedMenuCanvas: React.FC<EnhancedMenuCanvasProps> = ({ 
  template, 
  onUpdate 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [showTextEditor, setShowTextEditor] = useState(false);
  const [textEditorPosition, setTextEditorPosition] = useState({ x: 0, y: 0 });
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [showLayers, setShowLayers] = useState(true);
  const [isCanvasReady, setIsCanvasReady] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(1);
  
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

  // Load Google Fonts
  useEffect(() => {
    const loadFonts = () => {
      const uniqueFonts = new Set<string>();
      DEFAULT_FONTS.forEach(font => {
        font.variants.forEach(variant => {
          uniqueFonts.add(variant.src);
        });
      });

      uniqueFonts.forEach(fontUrl => {
        const link = document.createElement('link');
        link.href = fontUrl;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      });
    };

    loadFonts();
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 1920,
      height: 1080,
      backgroundColor: safeTemplate.settings.canvas.backgroundColor || '#ffffff',
      preserveObjectStacking: true,
      renderOnAddRemove: true
    });

    // Enable object selection
    fabricCanvas.selection = true;

    // Handle selection events
    fabricCanvas.on('selection:created', handleSelection);
    fabricCanvas.on('selection:updated', handleSelection);
    fabricCanvas.on('selection:cleared', () => {
      setSelectedObject(null);
      setSelectedElement(null);
      setShowTextEditor(false);
    });

    // Handle object modifications
    fabricCanvas.on('object:modified', () => {
      saveCanvasState(fabricCanvas);
    });

    // Handle double-click for text editing
    fabricCanvas.on('mouse:dblclick', (e) => {
      if (e.target && e.target.type === 'text') {
        const element = findElementByObject(e.target);
        if (element && element.type === 'text') {
          openTextEditor(e.target, element as EnhancedTextElement);
        }
      }
    });

    // Add mouse wheel zoom
    fabricCanvas.on('mouse:wheel', (opt) => {
      const delta = opt.e.deltaY;
      let zoom = fabricCanvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 5) zoom = 5;
      if (zoom < 0.1) zoom = 0.1;
      fabricCanvas.setZoom(zoom);
      setCurrentZoom(zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });

    // Add panning with alt + drag
    let isPanning = false;
    let lastPosX = 0;
    let lastPosY = 0;

    fabricCanvas.on('mouse:down', (opt) => {
      if (opt.e.altKey === true) {
        isPanning = true;
        fabricCanvas.selection = false;
        lastPosX = opt.e.clientX;
        lastPosY = opt.e.clientY;
      }
    });

    fabricCanvas.on('mouse:move', (opt) => {
      if (isPanning) {
        const vpt = fabricCanvas.viewportTransform!;
        vpt[4] += opt.e.clientX - lastPosX;
        vpt[5] += opt.e.clientY - lastPosY;
        fabricCanvas.requestRenderAll();
        lastPosX = opt.e.clientX;
        lastPosY = opt.e.clientY;
      }
    });

    fabricCanvas.on('mouse:up', () => {
      fabricCanvas.setViewportTransform(fabricCanvas.viewportTransform!);
      isPanning = false;
      fabricCanvas.selection = true;
    });

    setCanvas(fabricCanvas);
    
    // Wait a bit for canvas to be fully initialized
    setTimeout(() => {
      setIsCanvasReady(true);
      // Load existing elements
      loadElements(fabricCanvas, safeTemplate);
      
      // Auto-fit content after loading
      setTimeout(() => {
        const objects = fabricCanvas.getObjects();
        if (objects.length > 0) {
          // Calculate bounding box
          let minX = Infinity, minY = Infinity;
          let maxX = -Infinity, maxY = -Infinity;
          
          objects.forEach(obj => {
            const bound = obj.getBoundingRect();
            minX = Math.min(minX, bound.left);
            minY = Math.min(minY, bound.top);
            maxX = Math.max(maxX, bound.left + bound.width);
            maxY = Math.max(maxY, bound.top + bound.height);
          });
          
          // Calculate zoom to fit
          const canvasWidth = fabricCanvas.getWidth();
          const canvasHeight = fabricCanvas.getHeight();
          const contentWidth = maxX - minX;
          const contentHeight = maxY - minY;
          
          const scaleX = canvasWidth / contentWidth;
          const scaleY = canvasHeight / contentHeight;
          const zoom = Math.min(scaleX, scaleY) * 0.9;
          
          // Only auto-zoom if content is outside normal view
          if (zoom < 0.8 || zoom > 1.2) {
            fabricCanvas.setZoom(zoom);
            
            // Center the content
            const centerX = (minX + maxX) / 2;
            const centerY = (minY + maxY) / 2;
            const vpt = fabricCanvas.viewportTransform!;
            vpt[4] = canvasWidth / 2 - centerX * zoom;
            vpt[5] = canvasHeight / 2 - centerY * zoom;
            fabricCanvas.setViewportTransform(vpt);
          }
        }
        fabricCanvas.renderAll();
      }, 200);
    }, 100);

    return () => {
      setIsCanvasReady(false);
      fabricCanvas.dispose();
      setCanvas(null);
    };
  }, []);

  const handleSelection = (e: fabric.IEvent) => {
    const obj = e.selected?.[0];
    if (obj) {
      setSelectedObject(obj);
      const element = findElementByObject(obj);
      setSelectedElement(element);
    }
  };

  const findElementByObject = (obj: fabric.Object): Element | null => {
    const elementId = (obj as any).id;
    if (!elementId) return null;
    
    return safeTemplate.pages[0].elements.find(el => el.id === elementId) || null;
  };

  const openTextEditor = (textObject: fabric.Object, element: EnhancedTextElement) => {
    const zoom = canvas?.getZoom() || 1;
    const objBounds = textObject.getBoundingRect();
    
    setTextEditorPosition({
      x: objBounds.left + objBounds.width + 20,
      y: objBounds.top
    });
    
    setSelectedElement(element);
    setShowTextEditor(true);
  };

  const addImage = (imageUrl: string) => {
    if (!canvas || !isCanvasReady) {
      console.error('Canvas not ready');
      return;
    }

    // Ensure URL is absolute
    const absoluteUrl = imageUrl.startsWith('http') ? imageUrl : `http://localhost:3003${imageUrl}`;
    console.log('Adding image with URL:', absoluteUrl);

    const newElement: ImageElement = {
      id: uuidv4(),
      type: 'image',
      src: imageUrl, // Store the original URL in the element
      position: { x: 100, y: 100 },
      size: { width: 300, height: 200 },
      layer: safeTemplate.pages[0].elements.length,
      locked: false,
      visible: true,
      rotation: 0,
      opacity: 1,
      style: {
        objectFit: 'contain' as const,
        borderRadius: 0
      }
    };

    // Close the image uploader immediately
    setShowImageUploader(false);

    // Update template first
    const updatedTemplate = {
      ...safeTemplate,
      pages: [{
        ...safeTemplate.pages[0],
        elements: [...safeTemplate.pages[0].elements, newElement]
      }]
    };
    onUpdate(updatedTemplate);

    // Create fabric image object
    fabric.Image.fromURL(absoluteUrl, (fabricImg) => {
      // Check if canvas is still valid
      if (!canvas || !isCanvasReady) {
        console.error('Canvas disposed before image loaded');
        return;
      }

      if (!fabricImg) {
        console.error('Failed to create fabric image');
        return;
      }

      // Ensure the image has valid dimensions
      const imgWidth = fabricImg.width || fabricImg.getScaledWidth() || 300;
      const imgHeight = fabricImg.height || fabricImg.getScaledHeight() || 200;
      
      fabricImg.set({
        left: newElement.position.x,
        top: newElement.position.y,
        scaleX: newElement.size.width / imgWidth,
        scaleY: newElement.size.height / imgHeight,
        id: newElement.id,
        visible: true,
        selectable: true,
        evented: true
      } as any);

      canvas.add(fabricImg);
      canvas.setActiveObject(fabricImg);
      canvas.renderAll();
      
      console.log('Image added to canvas:', {
        url: absoluteUrl,
        width: fabricImg.width,
        height: fabricImg.height,
        scaleX: fabricImg.scaleX,
        scaleY: fabricImg.scaleY,
        totalObjects: canvas.getObjects().length,
        canvasSize: { width: canvas.width, height: canvas.height }
      });
      
      // Force render
      fabricImg.setCoords();
      canvas.requestRenderAll();
    }, {
      crossOrigin: 'anonymous'
    });
  };

  const addText = () => {
    if (!canvas) return;

    const newElement: EnhancedTextElement = {
      id: uuidv4(),
      type: 'text',
      content: 'New Text',
      position: { x: 100, y: 100 },
      size: { width: 200, height: 50 },
      layer: safeTemplate.pages[0].elements.length,
      locked: false,
      visible: true,
      rotation: 0,
      opacity: 1,
      style: {
        fontFamily: 'Montserrat',
        fontSize: 32,
        fontWeight: 'normal',
        fontStyle: 'normal',
        textAlign: 'left',
        color: '#000000',
        lineHeight: 1.2,
        letterSpacing: 0
      }
    };

    const text = createTextObject(newElement);
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();

    // Update template
    const updatedTemplate = {
      ...safeTemplate,
      pages: [{
        ...safeTemplate.pages[0],
        elements: [...safeTemplate.pages[0].elements, newElement]
      }]
    };
    onUpdate(updatedTemplate);

    // Open text editor
    openTextEditor(text, newElement);
  };

  const createTextObject = (element: EnhancedTextElement): fabric.Text => {
    const text = new fabric.Text(element.content, {
      left: element.position.x,
      top: element.position.y,
      fontSize: element.style.fontSize,
      fontFamily: element.style.fontFamily,
      fill: element.style.color,
      fontWeight: element.style.fontWeight || 'normal',
      fontStyle: element.style.fontStyle || 'normal',
      textAlign: element.style.textAlign || 'left',
      underline: element.style.textDecoration === 'underline',
      linethrough: element.style.textDecoration === 'line-through',
      lineHeight: element.style.lineHeight || 1.16,
      charSpacing: (element.style.letterSpacing || 0) * 10, // Fabric uses different scale
      id: element.id,
    } as any);

    // Apply text effects
    applyTextEffects(text, element);

    return text;
  };

  const applyTextEffects = (text: fabric.Text, element: EnhancedTextElement) => {
    // Apply shadows
    if (element.style.multipleShadows && element.style.multipleShadows.length > 0) {
      // Fabric.js only supports one shadow, so we use the first one
      const shadow = element.style.multipleShadows[0];
      text.shadow = new fabric.Shadow({
        color: shadow.color,
        blur: shadow.blur,
        offsetX: shadow.offsetX,
        offsetY: shadow.offsetY
      });
    }

    // Apply stroke (outline)
    if (element.style.textStroke) {
      text.stroke = element.style.textStroke.color;
      text.strokeWidth = element.style.textStroke.width;
    }

    // Apply background
    if (element.style.backgroundColor) {
      text.backgroundColor = element.style.backgroundColor;
    }

    // Note: Gradient and glow effects require custom rendering or post-processing
    // They can be implemented using fabric.js filters or custom rendering
  };

  const updateTextElement = (updatedElement: EnhancedTextElement) => {
    if (!canvas || !selectedObject) return;

    // Update the fabric object
    canvas.remove(selectedObject);
    const newText = createTextObject(updatedElement);
    canvas.add(newText);
    canvas.setActiveObject(newText);
    canvas.renderAll();

    // Update template
    const updatedElements = safeTemplate.pages[0].elements.map(el => 
      el.id === updatedElement.id ? updatedElement : el
    );

    const updatedTemplate = {
      ...safeTemplate,
      pages: [{
        ...safeTemplate.pages[0],
        elements: updatedElements
      }]
    };
    
    onUpdate(updatedTemplate);
    setSelectedObject(newText);
    setSelectedElement(updatedElement);
  };

  const addShape = (shapeType: 'rectangle' | 'circle' | 'triangle') => {
    if (!canvas) return;

    const newElement: ShapeElement = {
      id: uuidv4(),
      type: 'shape',
      shapeType,
      position: { x: 100, y: 100 },
      size: { width: 100, height: 100 },
      layer: safeTemplate.pages[0].elements.length,
      locked: false,
      visible: true,
      rotation: 0,
      opacity: 1,
      style: {
        fill: '#3498db',
        stroke: '#2c3e50',
        strokeWidth: 2
      }
    };

    let shapeObject: fabric.Object | null = null;

    switch (shapeType) {
      case 'rectangle':
        shapeObject = new fabric.Rect({
          left: newElement.position.x,
          top: newElement.position.y,
          width: newElement.size.width,
          height: newElement.size.height,
          fill: newElement.style.fill,
          stroke: newElement.style.stroke,
          strokeWidth: newElement.style.strokeWidth,
          id: newElement.id
        } as any);
        break;
      case 'circle':
        shapeObject = new fabric.Circle({
          left: newElement.position.x,
          top: newElement.position.y,
          radius: Math.min(newElement.size.width, newElement.size.height) / 2,
          fill: newElement.style.fill,
          stroke: newElement.style.stroke,
          strokeWidth: newElement.style.strokeWidth,
          id: newElement.id
        } as any);
        break;
      case 'triangle':
        shapeObject = new fabric.Triangle({
          left: newElement.position.x,
          top: newElement.position.y,
          width: newElement.size.width,
          height: newElement.size.height,
          fill: newElement.style.fill,
          stroke: newElement.style.stroke,
          strokeWidth: newElement.style.strokeWidth,
          id: newElement.id
        } as any);
        break;
    }

    if (shapeObject) {
      canvas.add(shapeObject);
      canvas.setActiveObject(shapeObject);
      canvas.renderAll();

      // Update template
      const updatedTemplate = {
        ...safeTemplate,
        pages: [{
          ...safeTemplate.pages[0],
          elements: [...safeTemplate.pages[0].elements, newElement]
        }]
      };
      onUpdate(updatedTemplate);
    }
  };

  const deleteSelected = () => {
    if (!canvas || !selectedObject || !selectedElement) return;

    canvas.remove(selectedObject);
    
    // Update template
    const updatedElements = safeTemplate.pages[0].elements.filter(
      el => el.id !== selectedElement.id
    );

    const updatedTemplate = {
      ...safeTemplate,
      pages: [{
        ...safeTemplate.pages[0],
        elements: updatedElements
      }]
    };
    
    onUpdate(updatedTemplate);
    setSelectedObject(null);
    setSelectedElement(null);
  };

  const duplicateSelected = () => {
    if (!canvas || !selectedObject || !selectedElement) return;

    const newElement = {
      ...selectedElement,
      id: uuidv4(),
      position: {
        x: selectedElement.position.x + 20,
        y: selectedElement.position.y + 20
      }
    };

    // Create appropriate fabric object based on type
    let newObject: fabric.Object | null = null;
    
    if (newElement.type === 'text') {
      newObject = createTextObject(newElement as EnhancedTextElement);
    } else if (newElement.type === 'shape') {
      const shapeElement = newElement as ShapeElement;
      switch (shapeElement.shapeType) {
        case 'rectangle':
          newObject = new fabric.Rect({
            left: shapeElement.position.x,
            top: shapeElement.position.y,
            width: shapeElement.size.width,
            height: shapeElement.size.height,
            fill: shapeElement.style.fill,
            stroke: shapeElement.style.stroke,
            strokeWidth: shapeElement.style.strokeWidth,
            id: shapeElement.id
          } as any);
          break;
        case 'circle':
          newObject = new fabric.Circle({
            left: shapeElement.position.x,
            top: shapeElement.position.y,
            radius: Math.min(shapeElement.size.width, shapeElement.size.height) / 2,
            fill: shapeElement.style.fill,
            stroke: shapeElement.style.stroke,
            strokeWidth: shapeElement.style.strokeWidth,
            id: shapeElement.id
          } as any);
          break;
        case 'triangle':
          newObject = new fabric.Triangle({
            left: shapeElement.position.x,
            top: shapeElement.position.y,
            width: shapeElement.size.width,
            height: shapeElement.size.height,
            fill: shapeElement.style.fill,
            stroke: shapeElement.style.stroke,
            strokeWidth: shapeElement.style.strokeWidth,
            id: shapeElement.id
          } as any);
          break;
      }
    } else if (newElement.type === 'image') {
      const imgElement = newElement as ImageElement;
      const absoluteUrl = imgElement.src.startsWith('http') ? imgElement.src : `http://localhost:3003${imgElement.src}`;
      
      // Update template first
      const updatedTemplate = {
        ...safeTemplate,
        pages: [{
          ...safeTemplate.pages[0],
          elements: [...safeTemplate.pages[0].elements, newElement]
        }]
      };
      onUpdate(updatedTemplate);
      
      fabric.Image.fromURL(absoluteUrl, (fabricImg) => {
        if (!canvas || !isCanvasReady || !fabricImg) return;
        
        fabricImg.set({
          left: imgElement.position.x,
          top: imgElement.position.y,
          scaleX: imgElement.size.width / (fabricImg.width || 300),
          scaleY: imgElement.size.height / (fabricImg.height || 200),
          angle: imgElement.rotation || 0,
          opacity: imgElement.opacity || 1,
          id: imgElement.id
        } as any);

        canvas.add(fabricImg);
        canvas.setActiveObject(fabricImg);
        canvas.renderAll();
      }, {
        crossOrigin: 'anonymous'
      });
      return; // Exit early since image loading is async
    }

    if (newObject) {
      canvas.add(newObject);
      canvas.setActiveObject(newObject);
      canvas.renderAll();

      // Update template
      const updatedTemplate = {
        ...safeTemplate,
        pages: [{
          ...safeTemplate.pages[0],
          elements: [...safeTemplate.pages[0].elements, newElement]
        }]
      };
      onUpdate(updatedTemplate);
    }
  };

  const loadElements = (canvas: fabric.Canvas, template: MenuTemplate) => {
    if (!template.pages || !template.pages[0]) return;

    const sortedElements = [...template.pages[0].elements].sort((a, b) => a.layer - b.layer);

    sortedElements.forEach((element) => {
      if (element.type === 'text') {
        const text = createTextObject(element as EnhancedTextElement);
        text.visible = element.visible !== false;
        text.selectable = !element.locked;
        text.evented = !element.locked;
        canvas.add(text);
      } else if (element.type === 'shape') {
        const shapeElement = element as ShapeElement;
        let shapeObject: fabric.Object | null = null;

        switch (shapeElement.shapeType) {
          case 'rectangle':
            shapeObject = new fabric.Rect({
              left: shapeElement.position.x,
              top: shapeElement.position.y,
              width: shapeElement.size.width,
              height: shapeElement.size.height,
              fill: shapeElement.style.fill,
              stroke: shapeElement.style.stroke,
              strokeWidth: shapeElement.style.strokeWidth,
              angle: shapeElement.rotation || 0,
              opacity: shapeElement.opacity || 1,
              visible: element.visible !== false,
              selectable: !element.locked,
              evented: !element.locked,
              id: shapeElement.id
            } as any);
            break;
          case 'circle':
            shapeObject = new fabric.Circle({
              left: shapeElement.position.x,
              top: shapeElement.position.y,
              radius: Math.min(shapeElement.size.width, shapeElement.size.height) / 2,
              fill: shapeElement.style.fill,
              stroke: shapeElement.style.stroke,
              strokeWidth: shapeElement.style.strokeWidth,
              angle: shapeElement.rotation || 0,
              opacity: shapeElement.opacity || 1,
              visible: element.visible !== false,
              selectable: !element.locked,
              evented: !element.locked,
              id: shapeElement.id
            } as any);
            break;
          case 'triangle':
            shapeObject = new fabric.Triangle({
              left: shapeElement.position.x,
              top: shapeElement.position.y,
              width: shapeElement.size.width,
              height: shapeElement.size.height,
              fill: shapeElement.style.fill,
              stroke: shapeElement.style.stroke,
              strokeWidth: shapeElement.style.strokeWidth,
              angle: shapeElement.rotation || 0,
              opacity: shapeElement.opacity || 1,
              visible: element.visible !== false,
              selectable: !element.locked,
              evented: !element.locked,
              id: shapeElement.id
            } as any);
            break;
        }

        if (shapeObject) {
          canvas.add(shapeObject);
        }
      } else if (element.type === 'image') {
        const imgElement = element as ImageElement;
        const absoluteUrl = imgElement.src.startsWith('http') ? imgElement.src : `http://localhost:3003${imgElement.src}`;
        
        fabric.Image.fromURL(absoluteUrl, (fabricImg) => {
          // Check canvas validity but don't check fabricImg as it might be a special object
          if (!canvas || !canvas.getContext()) {
            console.error('Canvas invalid for image:', imgElement.src);
            return;
          }
          
          if (!fabricImg) {
            console.error('Fabric image creation failed:', imgElement.src);
            return;
          }
          
          fabricImg.set({
            left: imgElement.position.x,
            top: imgElement.position.y,
            scaleX: imgElement.size.width / (fabricImg.width || 300),
            scaleY: imgElement.size.height / (fabricImg.height || 200),
            angle: imgElement.rotation || 0,
            opacity: imgElement.opacity || 1,
            id: imgElement.id,
            visible: element.visible !== false,
            selectable: !element.locked,
            evented: !element.locked
          } as any);
          
          canvas.add(fabricImg);
          canvas.requestRenderAll();
          
          console.log('Loaded image from template:', {
            url: absoluteUrl,
            id: imgElement.id,
            position: imgElement.position,
            size: imgElement.size
          });
        }, {
          crossOrigin: 'anonymous'
        });
      }
    });

    canvas.renderAll();
  };

  const saveCanvasState = (canvas: fabric.Canvas) => {
    const objects = canvas.getObjects();
    const elements: Element[] = objects.map((obj, index) => {
      const elementId = (obj as any).id;
      const existingElement = safeTemplate.pages[0].elements.find(el => el.id === elementId);
      
      if (!existingElement) return null;

      // Calculate actual size based on object type and scale
      let width = obj.width || 100;
      let height = obj.height || 50;
      
      if (obj.scaleX) width *= obj.scaleX;
      if (obj.scaleY) height *= obj.scaleY;

      return {
        ...existingElement,
        position: {
          x: obj.left || 0,
          y: obj.top || 0
        },
        size: {
          width,
          height
        },
        rotation: obj.angle || 0,
        opacity: obj.opacity || 1,
        layer: index
      };
    }).filter(Boolean) as Element[];

    const updatedTemplate = {
      ...safeTemplate,
      pages: [{
        ...safeTemplate.pages[0],
        elements
      }]
    };

    onUpdate(updatedTemplate);
  };

  const handleSelectElement = (elementId: string) => {
    if (!canvas) return;
    
    const obj = canvas.getObjects().find(o => (o as any).id === elementId);
    if (obj) {
      canvas.setActiveObject(obj);
      canvas.renderAll();
    }
  };

  const handleToggleVisibility = (elementId: string) => {
    const updatedElements = safeTemplate.pages[0].elements.map(el => 
      el.id === elementId ? { ...el, visible: !el.visible } : el
    );
    
    updateTemplate(updatedElements);
    
    // Update fabric object
    if (canvas) {
      const obj = canvas.getObjects().find(o => (o as any).id === elementId);
      if (obj) {
        obj.visible = !obj.visible;
        canvas.renderAll();
      }
    }
  };

  const handleToggleLock = (elementId: string) => {
    const updatedElements = safeTemplate.pages[0].elements.map(el => 
      el.id === elementId ? { ...el, locked: !el.locked } : el
    );
    
    updateTemplate(updatedElements);
    
    // Update fabric object
    if (canvas) {
      const obj = canvas.getObjects().find(o => (o as any).id === elementId);
      if (obj) {
        obj.selectable = !(obj as any).locked;
        obj.evented = !(obj as any).locked;
        canvas.renderAll();
      }
    }
  };

  const handleMoveLayer = (elementId: string, direction: 'up' | 'down') => {
    const elements = [...safeTemplate.pages[0].elements];
    const index = elements.findIndex(el => el.id === elementId);
    
    if (index === -1) return;
    
    if (direction === 'up' && index < elements.length - 1) {
      // Swap layers
      const temp = elements[index].layer;
      elements[index].layer = elements[index + 1].layer;
      elements[index + 1].layer = temp;
      
      // Swap array positions
      [elements[index], elements[index + 1]] = [elements[index + 1], elements[index]];
    } else if (direction === 'down' && index > 0) {
      // Swap layers
      const temp = elements[index].layer;
      elements[index].layer = elements[index - 1].layer;
      elements[index - 1].layer = temp;
      
      // Swap array positions
      [elements[index], elements[index - 1]] = [elements[index - 1], elements[index]];
    }
    
    updateTemplate(elements);
    
    // Reorder fabric objects
    if (canvas) {
      canvas.clear();
      loadElements(canvas, { ...safeTemplate, pages: [{ ...safeTemplate.pages[0], elements }] });
    }
  };

  const updateTemplate = (elements: Element[]) => {
    const updatedTemplate = {
      ...safeTemplate,
      pages: [{
        ...safeTemplate.pages[0],
        elements
      }]
    };
    onUpdate(updatedTemplate);
  };

  return (
    <div className="flex h-full">
      {/* Toolbar */}
      <div className="w-16 bg-gray-100 border-r p-2 flex flex-col gap-2">
        <button
          onClick={addText}
          className="p-3 hover:bg-gray-200 rounded flex items-center justify-center"
          title="Add Text"
        >
          <Type className="h-5 w-5" />
        </button>
        
        <button
          onClick={() => addShape('rectangle')}
          className="p-3 hover:bg-gray-200 rounded flex items-center justify-center"
          title="Add Rectangle"
        >
          <Square className="h-5 w-5" />
        </button>
        
        <button
          onClick={() => addShape('circle')}
          className="p-3 hover:bg-gray-200 rounded flex items-center justify-center"
          title="Add Circle"
        >
          <Circle className="h-5 w-5" />
        </button>
        
        <button
          onClick={() => addShape('triangle')}
          className="p-3 hover:bg-gray-200 rounded flex items-center justify-center"
          title="Add Triangle"
        >
          <Triangle className="h-5 w-5" />
        </button>
        
        <button
          onClick={() => setShowImageUploader(true)}
          className="p-3 hover:bg-gray-200 rounded flex items-center justify-center"
          title="Add Image"
        >
          <ImageIcon className="h-5 w-5" />
        </button>
        
        <div className="border-t mt-2 pt-2">
          <button
            onClick={() => setShowLayers(!showLayers)}
            className={`p-3 hover:bg-gray-200 rounded flex items-center justify-center ${showLayers ? 'bg-gray-200' : ''}`}
            title="Toggle Layers"
          >
            <Layers className="h-5 w-5" />
          </button>
          
          {/* Zoom controls */}
          <button
            onClick={() => {
              if (!canvas) return;
              const zoom = canvas.getZoom();
              const newZoom = zoom * 0.9;
              canvas.setZoom(newZoom);
              setCurrentZoom(newZoom);
              canvas.renderAll();
            }}
            className="p-3 hover:bg-gray-200 rounded flex items-center justify-center"
            title="Zoom Out"
          >
            −
          </button>
          
          <button
            onClick={() => {
              if (!canvas) return;
              canvas.setZoom(1);
              canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
              setCurrentZoom(1);
              canvas.renderAll();
            }}
            className="p-3 hover:bg-gray-200 rounded flex items-center justify-center"
            title="Reset Zoom"
          >
            ⟲
          </button>
          
          <button
            onClick={() => {
              if (!canvas) return;
              // Fit all objects in view
              const objects = canvas.getObjects();
              if (objects.length === 0) return;
              
              // Calculate bounding box of all objects
              let minX = Infinity, minY = Infinity;
              let maxX = -Infinity, maxY = -Infinity;
              
              objects.forEach(obj => {
                const bound = obj.getBoundingRect();
                minX = Math.min(minX, bound.left);
                minY = Math.min(minY, bound.top);
                maxX = Math.max(maxX, bound.left + bound.width);
                maxY = Math.max(maxY, bound.top + bound.height);
              });
              
              // Calculate zoom to fit
              const canvasWidth = canvas.getWidth();
              const canvasHeight = canvas.getHeight();
              const contentWidth = maxX - minX;
              const contentHeight = maxY - minY;
              
              const scaleX = canvasWidth / contentWidth;
              const scaleY = canvasHeight / contentHeight;
              const zoom = Math.min(scaleX, scaleY) * 0.9; // 90% to add padding
              
              canvas.setZoom(zoom);
              setCurrentZoom(zoom);
              
              // Center the content
              const centerX = (minX + maxX) / 2;
              const centerY = (minY + maxY) / 2;
              const vpt = canvas.viewportTransform!;
              vpt[4] = canvasWidth / 2 - centerX * zoom;
              vpt[5] = canvasHeight / 2 - centerY * zoom;
              canvas.setViewportTransform(vpt);
              canvas.renderAll();
            }}
            className="p-3 hover:bg-gray-200 rounded flex items-center justify-center"
            title="Fit to Screen"
          >
            ⊡
          </button>
          
          <button
            onClick={() => {
              if (!canvas) return;
              const zoom = canvas.getZoom();
              const newZoom = zoom * 1.1;
              canvas.setZoom(newZoom);
              setCurrentZoom(newZoom);
              canvas.renderAll();
            }}
            className="p-3 hover:bg-gray-200 rounded flex items-center justify-center"
            title="Zoom In"
          >
            +
          </button>
        </div>

        {selectedObject && (
          <>
            <div className="border-t mt-2 pt-2">
              <button
                onClick={duplicateSelected}
                className="p-3 hover:bg-gray-200 rounded flex items-center justify-center"
                title="Duplicate"
              >
                <Copy className="h-5 w-5" />
              </button>
              
              <button
                onClick={deleteSelected}
                className="p-3 hover:bg-gray-200 rounded flex items-center justify-center text-red-500"
                title="Delete"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Canvas Container */}
      <div className="flex-1 relative overflow-auto bg-gray-50">
        {/* Instructions and Zoom Level */}
        <div className="absolute top-2 left-2 bg-white p-2 rounded shadow text-xs text-gray-600 z-10">
          <div>Scroll: Zoom | Alt+Drag: Pan</div>
          <div>Double-click text to edit</div>
          <div className="mt-1 font-semibold">Zoom: {Math.round(currentZoom * 100)}%</div>
        </div>
        
        <div className="flex items-center justify-center min-h-full p-8">
          <div className="shadow-lg bg-white border border-gray-300">
            <canvas ref={canvasRef} style={{ display: 'block' }} />
          </div>
        </div>

        {/* Text Editor */}
        {showTextEditor && selectedElement && selectedElement.type === 'text' && (
          <div 
            className="absolute z-50"
            style={{
              left: `${textEditorPosition.x}px`,
              top: `${textEditorPosition.y}px`
            }}
          >
            <RichTextEditor
              element={selectedElement as EnhancedTextElement}
              onChange={updateTextElement}
              onClose={() => setShowTextEditor(false)}
            />
          </div>
        )}

        {/* Image Uploader Modal */}
        {showImageUploader && (
          <ImageUploader
            onImageSelected={addImage}
            onClose={() => setShowImageUploader(false)}
          />
        )}
      </div>

      {/* Layers Panel */}
      {showLayers && (
        <LayersPanel
          elements={safeTemplate.pages[0].elements}
          selectedElementId={selectedElement?.id || null}
          onSelectElement={handleSelectElement}
          onToggleVisibility={handleToggleVisibility}
          onToggleLock={handleToggleLock}
          onMoveLayer={handleMoveLayer}
          onDeleteElement={(id) => {
            const element = safeTemplate.pages[0].elements.find(el => el.id === id);
            if (element) {
              setSelectedElement(element);
              const obj = canvas?.getObjects().find(o => (o as any).id === id);
              if (obj) {
                setSelectedObject(obj);
                deleteSelected();
              }
            }
          }}
        />
      )}
    </div>
  );
};