import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { 
  MenuTemplate, 
  TextElement,
  EnhancedTextElement, 
  ImageElement, 
  VideoElement, 
  MenuItemElement, 
  ShapeElement,
  SectionElement,
  Element 
} from '@tv-menu-designer/shared';
import { Loader2 } from 'lucide-react';

interface Menu {
  id: string;
  name: string;
  template: MenuTemplate;
  status: string;
}

const TVDisplayPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [menu, setMenu] = useState<Menu | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    if (id) {
      loadMenu();
      // Auto-refresh every 30 seconds to get updates
      const interval = setInterval(loadMenu, 30000);
      return () => clearInterval(interval);
    }
  }, [id]);

  useEffect(() => {
    if (menu) {
      const calculateScale = () => {
        const canvasSettings = menu.template.settings.canvas;
        const scaleX = window.innerWidth / canvasSettings.width;
        const scaleY = window.innerHeight / canvasSettings.height;
        setScale(Math.min(scaleX, scaleY));
      };

      calculateScale();
      window.addEventListener('resize', calculateScale);
      
      // Enter fullscreen on mount
      document.documentElement.requestFullscreen?.().catch(() => {});
      
      return () => {
        window.removeEventListener('resize', calculateScale);
      };
    }
  }, [menu]);

  const loadMenu = async () => {
    try {
      const response = await api.get(`/api/menus/${id}`);
      const menuData = response.data.data;
      
      // Allow preview of unpublished menus when accessed from the designer
      // Check if we're in preview mode by checking the referrer or URL params
      const urlParams = new URLSearchParams(window.location.search);
      const previewMode = urlParams.get('preview') === 'true' || document.referrer.includes('/menus/');
      setIsPreview(previewMode);
      
      if (menuData.status !== 'published' && !previewMode) {
        setError('This menu is not published yet');
      } else {
        setMenu(menuData);
      }
    } catch (error: any) {
      console.error('Error loading menu:', error);
      if (error.response?.status === 429) {
        setError('Too many requests. Please wait a moment and try again.');
      } else if (error.response?.status === 404) {
        setError('Menu not found');
      } else {
        setError('Failed to load menu. Please refresh the page.');
      }
    } finally {
      setLoading(false);
    }
  };

  const renderElement = (element: Element) => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      left: `${element.position.x}px`,
      top: `${element.position.y}px`,
      width: `${element.size.width}px`,
      height: `${element.size.height}px`,
      transform: `rotate(${element.rotation || 0}deg)`,
      opacity: element.opacity || 1,
    };

    switch (element.type) {
      case 'text': {
        const textElement = element as TextElement | EnhancedTextElement;
        const style = textElement.style;
        
        // Build text shadow string
        let textShadow = 'none';
        if ('multipleShadows' in style && style.multipleShadows && style.multipleShadows.length > 0) {
          textShadow = style.multipleShadows
            .map(shadow => `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px ${shadow.color}`)
            .join(', ');
        } else if (style.textShadow) {
          textShadow = `${style.textShadow.x}px ${style.textShadow.y}px ${style.textShadow.blur}px ${style.textShadow.color}`;
        }
        
        // Build text stroke style
        const strokeStyle: React.CSSProperties = {};
        if ('textStroke' in style && style.textStroke) {
          strokeStyle.WebkitTextStroke = `${style.textStroke.width}px ${style.textStroke.color}`;
          strokeStyle.textStroke = `${style.textStroke.width}px ${style.textStroke.color}`;
        }
        
        return (
          <div
            key={element.id}
            style={{
              ...baseStyle,
              fontFamily: style.fontFamily || 'Arial',
              fontSize: `${style.fontSize || 16}px`,
              fontWeight: style.fontWeight || 'normal',
              fontStyle: style.fontStyle || 'normal',
              color: style.color || '#000000',
              textAlign: style.textAlign || 'left',
              lineHeight: style.lineHeight || 1.2,
              letterSpacing: style.letterSpacing ? `${style.letterSpacing}px` : 'normal',
              textDecoration: style.textDecoration || 'none',
              textShadow,
              backgroundColor: style.backgroundColor || 'transparent',
              ...strokeStyle,
              display: 'flex',
              alignItems: 'center',
              justifyContent: style.textAlign || 'left',
            }}
          >
            {textElement.content}
          </div>
        );
      }

      case 'image': {
        const imageElement = element as ImageElement;
        // Ensure URL is absolute
        const imageUrl = imageElement.src.startsWith('http') 
          ? imageElement.src 
          : `http://localhost:3003${imageElement.src}`;
        
        return (
          <img
            key={element.id}
            src={imageUrl}
            alt={imageElement.alt || ''}
            style={{
              ...baseStyle,
              objectFit: imageElement.style?.objectFit || 'contain',
              borderRadius: imageElement.style?.borderRadius ? `${imageElement.style.borderRadius}px` : '0',
              filter: imageElement.style?.filter
                ? `brightness(${imageElement.style.filter.brightness || 100}%) contrast(${imageElement.style.filter.contrast || 100}%) grayscale(${imageElement.style.filter.grayscale || 0}%) blur(${imageElement.style.filter.blur || 0}px)`
                : 'none',
            }}
            crossOrigin="anonymous"
          />
        );
      }

      case 'video': {
        const videoElement = element as VideoElement;
        return (
          <video
            key={element.id}
            src={videoElement.src}
            poster={videoElement.poster}
            autoPlay={videoElement.settings.autoplay}
            loop={videoElement.settings.loop}
            muted={videoElement.settings.muted}
            controls={videoElement.settings.controls}
            style={baseStyle}
          />
        );
      }

      case 'menuItem': {
        const menuItemElement = element as MenuItemElement;
        const isHorizontal = menuItemElement.layout === 'horizontal';
        return (
          <div
            key={element.id}
            style={{
              ...baseStyle,
              backgroundColor: menuItemElement.style.backgroundColor || 'transparent',
              border: menuItemElement.style.borderColor ? `1px solid ${menuItemElement.style.borderColor}` : 'none',
              padding: menuItemElement.style.padding ? `${menuItemElement.style.padding}px` : '0',
              display: 'flex',
              flexDirection: isHorizontal ? 'row' : 'column',
              alignItems: isHorizontal ? 'center' : 'flex-start',
              gap: '10px',
            }}
          >
            {menuItemElement.data.image && (
              <img
                src={menuItemElement.data.image.startsWith('http') 
                  ? menuItemElement.data.image 
                  : `http://localhost:3003${menuItemElement.data.image}`}
                alt={menuItemElement.data.name}
                style={{
                  width: isHorizontal ? '100px' : '100%',
                  height: isHorizontal ? '100px' : '150px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
                crossOrigin="anonymous"
              />
            )}
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, ...menuItemElement.style.nameStyle }}>
                {menuItemElement.data.name}
              </h3>
              {menuItemElement.data.description && (
                <p style={{ margin: '5px 0', ...menuItemElement.style.descriptionStyle }}>
                  {menuItemElement.data.description}
                </p>
              )}
              <p style={{ margin: 0, ...menuItemElement.style.priceStyle }}>
                {menuItemElement.data.price}
              </p>
            </div>
          </div>
        );
      }

      case 'shape': {
        const shapeElement = element as ShapeElement;
        const svgStyle = {
          ...baseStyle,
          overflow: 'visible',
        };

        switch (shapeElement.shapeType) {
          case 'rectangle':
            return (
              <svg key={element.id} style={svgStyle}>
                <rect
                  x="0"
                  y="0"
                  width={element.size.width}
                  height={element.size.height}
                  fill={shapeElement.style.fill || 'none'}
                  stroke={shapeElement.style.stroke || 'none'}
                  strokeWidth={shapeElement.style.strokeWidth || 1}
                  strokeDasharray={shapeElement.style.strokeDasharray || ''}
                />
              </svg>
            );
          case 'circle':
            return (
              <svg key={element.id} style={svgStyle}>
                <circle
                  cx={element.size.width / 2}
                  cy={element.size.height / 2}
                  r={Math.min(element.size.width, element.size.height) / 2}
                  fill={shapeElement.style.fill || 'none'}
                  stroke={shapeElement.style.stroke || 'none'}
                  strokeWidth={shapeElement.style.strokeWidth || 1}
                  strokeDasharray={shapeElement.style.strokeDasharray || ''}
                />
              </svg>
            );
          case 'triangle':
            return (
              <svg key={element.id} style={svgStyle}>
                <polygon
                  points={`${element.size.width / 2},0 ${element.size.width},${element.size.height} 0,${element.size.height}`}
                  fill={shapeElement.style.fill || 'none'}
                  stroke={shapeElement.style.stroke || 'none'}
                  strokeWidth={shapeElement.style.strokeWidth || 1}
                  strokeDasharray={shapeElement.style.strokeDasharray || ''}
                />
              </svg>
            );
          default:
            return null;
        }
      }

      case 'section': {
        const sectionElement = element as SectionElement;
        return (
          <div
            key={element.id}
            style={{
              ...baseStyle,
              backgroundColor: sectionElement.style.backgroundColor || 'transparent',
              backgroundImage: sectionElement.style.backgroundImage ? `url(${sectionElement.style.backgroundImage})` : 'none',
              backgroundSize: sectionElement.style.backgroundSize || 'cover',
              backgroundPosition: sectionElement.style.backgroundPosition || 'center',
              borderRadius: sectionElement.style.borderRadius ? `${sectionElement.style.borderRadius}px` : '0',
              border: sectionElement.style.borderWidth && sectionElement.style.borderColor
                ? `${sectionElement.style.borderWidth}px solid ${sectionElement.style.borderColor}`
                : 'none',
              boxShadow: sectionElement.style.shadow
                ? `${sectionElement.style.shadow.x}px ${sectionElement.style.shadow.y}px ${sectionElement.style.shadow.blur}px ${sectionElement.style.shadow.color}`
                : 'none',
            }}
          />
        );
      }

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <Loader2 className="animate-spin h-12 w-12 text-white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-3xl font-bold mb-4">Error</h1>
          <p className="text-xl">{error}</p>
        </div>
      </div>
    );
  }

  if (!menu) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-3xl font-bold">Menu not found</h1>
        </div>
      </div>
    );
  }

  const canvasSettings = menu.template.settings.canvas;
  const currentPage = menu.template.pages && menu.template.pages.length > 0 ? menu.template.pages[0] : null;
  
  if (!currentPage) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-3xl font-bold">No pages in this menu</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      {/* Preview Mode Indicator */}
      {isPreview && (
        <div className="absolute top-4 right-4 bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold z-50">
          Preview Mode
        </div>
      )}
      
      {/* TV Display Canvas */}
      <div
        className="relative"
        style={{
          width: `${canvasSettings.width}px`,
          height: `${canvasSettings.height}px`,
          backgroundColor: canvasSettings.backgroundColor || '#ffffff',
          transform: `scale(${scale})`,
          transformOrigin: 'center',
        }}
      >
        {currentPage && currentPage.elements
          .filter(element => element.visible !== false)
          .sort((a, b) => (a.layer || 0) - (b.layer || 0))
          .map(renderElement)}
      </div>
    </div>
  );
};

export default TVDisplayPage;