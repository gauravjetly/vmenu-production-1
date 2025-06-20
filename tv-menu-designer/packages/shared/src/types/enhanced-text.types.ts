import { z } from 'zod';
import { TextElementSchema } from './menu.types';

// Text effect schemas
export const TextShadowSchema = z.object({
  color: z.string(),
  blur: z.number().min(0),
  offsetX: z.number(),
  offsetY: z.number()
});

export const TextOutlineSchema = z.object({
  color: z.string(),
  width: z.number().min(0)
});

export const TextGradientSchema = z.object({
  type: z.enum(['linear', 'radial']),
  colors: z.array(z.string()).min(2),
  angle: z.number().optional(), // For linear gradients
  centerX: z.number().optional(), // For radial gradients
  centerY: z.number().optional(), // For radial gradients
  radius: z.number().optional() // For radial gradients
});

export const TextGlowSchema = z.object({
  color: z.string(),
  intensity: z.number().min(0).max(100),
  spread: z.number().min(0)
});

// Enhanced text element schema
export const EnhancedTextElementSchema = TextElementSchema.extend({
  style: TextElementSchema.shape.style.extend({
    // Advanced typography
    textTransform: z.enum(['none', 'uppercase', 'lowercase', 'capitalize']).optional(),
    wordSpacing: z.number().optional(),
    textIndent: z.number().optional(),
    whiteSpace: z.enum(['normal', 'nowrap', 'pre', 'pre-wrap', 'pre-line']).optional(),
    
    // Advanced effects
    textStroke: TextOutlineSchema.optional(),
    textGradient: TextGradientSchema.optional(),
    textGlow: TextGlowSchema.optional(),
    multipleShadows: z.array(TextShadowSchema).optional(),
    
    // Background effects
    backgroundColor: z.string().optional(),
    backgroundGradient: TextGradientSchema.optional(),
    backgroundPadding: z.object({
      top: z.number(),
      right: z.number(),
      bottom: z.number(),
      left: z.number()
    }).optional(),
    backgroundBorderRadius: z.number().optional(),
    
    // Advanced styling
    writingMode: z.enum(['horizontal-tb', 'vertical-rl', 'vertical-lr']).optional(),
    textOrientation: z.enum(['mixed', 'upright', 'sideways']).optional(),
    direction: z.enum(['ltr', 'rtl']).optional()
  }),
  
  // Rich text content with formatting
  richContent: z.object({
    blocks: z.array(z.object({
      id: z.string(),
      type: z.enum(['paragraph', 'heading', 'list']),
      content: z.array(z.object({
        text: z.string(),
        marks: z.array(z.enum(['bold', 'italic', 'underline', 'strikethrough', 'code', 'superscript', 'subscript'])).optional(),
        color: z.string().optional(),
        backgroundColor: z.string().optional(),
        fontSize: z.number().optional(),
        fontFamily: z.string().optional()
      }))
    }))
  }).optional()
});

// Font configuration
export const FontConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  family: z.string(),
  category: z.enum(['serif', 'sans-serif', 'display', 'handwriting', 'monospace']),
  variants: z.array(z.object({
    weight: z.number(),
    style: z.enum(['normal', 'italic']),
    src: z.string() // URL or local path
  })),
  fallback: z.array(z.string()).optional(),
  source: z.enum(['google', 'adobe', 'custom', 'system']),
  license: z.string().optional()
});

// Preset text styles
export const TextStylePresetSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum(['heading', 'body', 'accent', 'special']),
  style: EnhancedTextElementSchema.shape.style,
  thumbnail: z.string().optional()
});

// Type exports
export type EnhancedTextElement = z.infer<typeof EnhancedTextElementSchema>;
export type TextShadow = z.infer<typeof TextShadowSchema>;
export type TextOutline = z.infer<typeof TextOutlineSchema>;
export type TextGradient = z.infer<typeof TextGradientSchema>;
export type TextGlow = z.infer<typeof TextGlowSchema>;
export type FontConfig = z.infer<typeof FontConfigSchema>;
export type TextStylePreset = z.infer<typeof TextStylePresetSchema>;

// Default fonts collection
export const DEFAULT_FONTS: FontConfig[] = [
  // Serif fonts
  {
    id: 'playfair-display',
    name: 'Playfair Display',
    family: 'Playfair Display',
    category: 'serif',
    source: 'google',
    variants: [
      { weight: 400, style: 'normal', src: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400' },
      { weight: 700, style: 'normal', src: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700' },
      { weight: 400, style: 'italic', src: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1' }
    ],
    fallback: ['Georgia', 'serif']
  },
  {
    id: 'merriweather',
    name: 'Merriweather',
    family: 'Merriweather',
    category: 'serif',
    source: 'google',
    variants: [
      { weight: 300, style: 'normal', src: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300' },
      { weight: 400, style: 'normal', src: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@400' },
      { weight: 700, style: 'normal', src: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@700' }
    ],
    fallback: ['Georgia', 'serif']
  },
  
  // Sans-serif fonts
  {
    id: 'montserrat',
    name: 'Montserrat',
    family: 'Montserrat',
    category: 'sans-serif',
    source: 'google',
    variants: [
      { weight: 300, style: 'normal', src: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300' },
      { weight: 400, style: 'normal', src: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400' },
      { weight: 600, style: 'normal', src: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600' },
      { weight: 700, style: 'normal', src: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700' }
    ],
    fallback: ['Arial', 'sans-serif']
  },
  {
    id: 'raleway',
    name: 'Raleway',
    family: 'Raleway',
    category: 'sans-serif',
    source: 'google',
    variants: [
      { weight: 300, style: 'normal', src: 'https://fonts.googleapis.com/css2?family=Raleway:wght@300' },
      { weight: 400, style: 'normal', src: 'https://fonts.googleapis.com/css2?family=Raleway:wght@400' },
      { weight: 600, style: 'normal', src: 'https://fonts.googleapis.com/css2?family=Raleway:wght@600' }
    ],
    fallback: ['Arial', 'sans-serif']
  },
  
  // Display fonts
  {
    id: 'bebas-neue',
    name: 'Bebas Neue',
    family: 'Bebas Neue',
    category: 'display',
    source: 'google',
    variants: [
      { weight: 400, style: 'normal', src: 'https://fonts.googleapis.com/css2?family=Bebas+Neue' }
    ],
    fallback: ['Impact', 'sans-serif']
  },
  {
    id: 'lobster',
    name: 'Lobster',
    family: 'Lobster',
    category: 'display',
    source: 'google',
    variants: [
      { weight: 400, style: 'normal', src: 'https://fonts.googleapis.com/css2?family=Lobster' }
    ],
    fallback: ['cursive']
  },
  
  // Handwriting fonts
  {
    id: 'dancing-script',
    name: 'Dancing Script',
    family: 'Dancing Script',
    category: 'handwriting',
    source: 'google',
    variants: [
      { weight: 400, style: 'normal', src: 'https://fonts.googleapis.com/css2?family=Dancing+Script' },
      { weight: 700, style: 'normal', src: 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700' }
    ],
    fallback: ['cursive']
  },
  {
    id: 'pacifico',
    name: 'Pacifico',
    family: 'Pacifico',
    category: 'handwriting',
    source: 'google',
    variants: [
      { weight: 400, style: 'normal', src: 'https://fonts.googleapis.com/css2?family=Pacifico' }
    ],
    fallback: ['cursive']
  }
];

// Text style presets
export const TEXT_STYLE_PRESETS: TextStylePreset[] = [
  {
    id: 'elegant-heading',
    name: 'Elegant Heading',
    category: 'heading',
    style: {
      fontFamily: 'Playfair Display',
      fontSize: 48,
      fontWeight: '700',
      color: '#2c3e50',
      letterSpacing: -0.5,
      textShadow: {
        x: 2,
        y: 2,
        blur: 4,
        color: 'rgba(0,0,0,0.1)'
      }
    }
  },
  {
    id: 'modern-subtitle',
    name: 'Modern Subtitle',
    category: 'heading',
    style: {
      fontFamily: 'Montserrat',
      fontSize: 24,
      fontWeight: '600',
      color: '#34495e',
      textTransform: 'uppercase',
      letterSpacing: 2
    }
  },
  {
    id: 'casual-body',
    name: 'Casual Body',
    category: 'body',
    style: {
      fontFamily: 'Raleway',
      fontSize: 16,
      fontWeight: '400',
      color: '#555555',
      lineHeight: 1.6
    }
  },
  {
    id: 'price-accent',
    name: 'Price Accent',
    category: 'accent',
    style: {
      fontFamily: 'Bebas Neue',
      fontSize: 36,
      fontWeight: '400',
      color: '#e74c3c',
      letterSpacing: 1
    }
  },
  {
    id: 'handwritten-special',
    name: 'Handwritten Special',
    category: 'special',
    style: {
      fontFamily: 'Dancing Script',
      fontSize: 28,
      fontWeight: '400',
      color: '#8e44ad',
      fontStyle: 'italic'
    }
  }
];