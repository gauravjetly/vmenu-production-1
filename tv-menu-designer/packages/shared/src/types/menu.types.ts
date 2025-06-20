import { z } from 'zod';

// Base element schema
export const BaseElementSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(['section', 'text', 'image', 'video', 'menuItem', 'shape', 'widget']),
  layer: z.number().int().min(0),
  locked: z.boolean().default(false),
  visible: z.boolean().default(true),
  position: z.object({
    x: z.number(),
    y: z.number()
  }),
  size: z.object({
    width: z.number().positive(),
    height: z.number().positive()
  }),
  rotation: z.number().default(0),
  opacity: z.number().min(0).max(1).default(1),
  animation: z.object({
    enter: z.object({
      type: z.string().optional(),
      duration: z.number().optional(),
      delay: z.number().optional(),
      easing: z.string().optional()
    }).optional(),
    exit: z.object({
      type: z.string().optional(),
      duration: z.number().optional(),
      delay: z.number().optional(),
      easing: z.string().optional()
    }).optional(),
    loop: z.object({
      type: z.string().optional(),
      duration: z.number().optional(),
      repeat: z.number().optional()
    }).optional()
  }).optional()
});

// Text element schema
export const TextElementSchema = BaseElementSchema.extend({
  type: z.literal('text'),
  content: z.string(),
  style: z.object({
    fontFamily: z.string(),
    fontSize: z.number(),
    fontWeight: z.string().optional(),
    fontStyle: z.string().optional(),
    textAlign: z.enum(['left', 'center', 'right', 'justify']).optional(),
    color: z.string(),
    lineHeight: z.number().optional(),
    letterSpacing: z.number().optional(),
    textDecoration: z.string().optional(),
    textShadow: z.object({
      x: z.number(),
      y: z.number(),
      blur: z.number(),
      color: z.string()
    }).optional()
  })
});

// Image element schema
export const ImageElementSchema = BaseElementSchema.extend({
  type: z.literal('image'),
  src: z.string().url(),
  alt: z.string().optional(),
  style: z.object({
    objectFit: z.enum(['contain', 'cover', 'fill', 'none', 'scale-down']).optional(),
    borderRadius: z.number().optional(),
    filter: z.object({
      brightness: z.number().optional(),
      contrast: z.number().optional(),
      grayscale: z.number().optional(),
      blur: z.number().optional()
    }).optional()
  }).optional()
});

// Video element schema
export const VideoElementSchema = BaseElementSchema.extend({
  type: z.literal('video'),
  src: z.string().url(),
  poster: z.string().url().optional(),
  settings: z.object({
    autoplay: z.boolean().default(true),
    loop: z.boolean().default(true),
    muted: z.boolean().default(true),
    controls: z.boolean().default(false)
  })
});

// Menu item element schema
export const MenuItemElementSchema = BaseElementSchema.extend({
  type: z.literal('menuItem'),
  data: z.object({
    name: z.string(),
    description: z.string().optional(),
    price: z.string(),
    image: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    dietary: z.array(z.enum(['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'halal', 'kosher'])).default([]),
    spiceLevel: z.number().int().min(0).max(5).optional()
  }),
  layout: z.enum(['horizontal', 'vertical', 'card', 'list']).default('horizontal'),
  style: z.object({
    nameStyle: z.any(), // TextElement style
    descriptionStyle: z.any().optional(),
    priceStyle: z.any(),
    backgroundColor: z.string().optional(),
    borderColor: z.string().optional(),
    padding: z.number().optional()
  })
});

// Shape element schema
export const ShapeElementSchema = BaseElementSchema.extend({
  type: z.literal('shape'),
  shapeType: z.enum(['rectangle', 'circle', 'triangle', 'line', 'polygon', 'star']),
  style: z.object({
    fill: z.string().optional(),
    stroke: z.string().optional(),
    strokeWidth: z.number().optional(),
    strokeDasharray: z.string().optional()
  })
});

// Section element schema
export const SectionElementSchema = BaseElementSchema.extend({
  type: z.literal('section'),
  style: z.object({
    backgroundColor: z.string().optional(),
    backgroundImage: z.string().url().optional(),
    backgroundSize: z.string().optional(),
    backgroundPosition: z.string().optional(),
    borderRadius: z.number().optional(),
    borderWidth: z.number().optional(),
    borderColor: z.string().optional(),
    shadow: z.object({
      x: z.number(),
      y: z.number(),
      blur: z.number(),
      color: z.string()
    }).optional()
  }),
  children: z.array(z.string()) // IDs of child elements
});

// Combined element schema
export const ElementSchema = z.discriminatedUnion('type', [
  SectionElementSchema,
  TextElementSchema,
  ImageElementSchema,
  VideoElementSchema,
  MenuItemElementSchema,
  ShapeElementSchema
]);

// Page schema
export const PageSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  duration: z.number().positive().optional(),
  transition: z.object({
    type: z.string(),
    duration: z.number(),
    easing: z.string()
  }).optional(),
  elements: z.array(ElementSchema)
});

// Menu template schema
export const MenuTemplateSchema = z.object({
  id: z.string().uuid(),
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  metadata: z.object({
    name: z.string(),
    description: z.string().optional(),
    author: z.string().optional(),
    organization: z.string().optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    tags: z.array(z.string()).default([]),
    category: z.enum(['restaurant', 'cafe', 'bar', 'retail', 'healthcare', 'education', 'corporate']).optional()
  }),
  settings: z.object({
    canvas: z.object({
      width: z.number().default(1920),
      height: z.number().default(1080),
      backgroundColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
      backgroundImage: z.string().url().optional(),
      aspectRatio: z.enum(['16:9', '9:16', '1:1', '4:3', '3:4', 'custom']).default('16:9')
    }),
    theme: z.object({
      primaryColor: z.string(),
      secondaryColor: z.string().optional(),
      accentColor: z.string().optional(),
      textColor: z.string().optional(),
      fonts: z.object({
        heading: z.string().optional(),
        body: z.string().optional(),
        price: z.string().optional()
      }).optional()
    }).optional(),
    animations: z.object({
      pageTransition: z.enum(['none', 'fade', 'slide', 'zoom', 'flip', 'cube']).default('fade'),
      elementAnimation: z.boolean().default(true),
      autoPlayDuration: z.number().min(0).optional()
    }).optional()
  }),
  pages: z.array(PageSchema).min(1)
});

// Type exports
export type BaseElement = z.infer<typeof BaseElementSchema>;
export type TextElement = z.infer<typeof TextElementSchema>;
export type ImageElement = z.infer<typeof ImageElementSchema>;
export type VideoElement = z.infer<typeof VideoElementSchema>;
export type MenuItemElement = z.infer<typeof MenuItemElementSchema>;
export type ShapeElement = z.infer<typeof ShapeElementSchema>;
export type SectionElement = z.infer<typeof SectionElementSchema>;
export type Element = z.infer<typeof ElementSchema>;
export type Page = z.infer<typeof PageSchema>;
export type MenuTemplate = z.infer<typeof MenuTemplateSchema>;

// Animation types
export type AnimationType = 'fadeIn' | 'fadeOut' | 'slideIn' | 'slideOut' | 'zoomIn' | 'zoomOut' | 'rotate' | 'bounce' | 'pulse';
export type EasingType = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad' | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic';

// Canvas types
export interface CanvasState {
  zoom: number;
  pan: { x: number; y: number };
  gridEnabled: boolean;
  snapEnabled: boolean;
  rulerEnabled: boolean;
  selectedElements: string[];
  clipboard: Element[];
}