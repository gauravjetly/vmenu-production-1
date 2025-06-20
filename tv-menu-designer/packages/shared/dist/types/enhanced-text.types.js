"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEXT_STYLE_PRESETS = exports.DEFAULT_FONTS = exports.TextStylePresetSchema = exports.FontConfigSchema = exports.EnhancedTextElementSchema = exports.TextGlowSchema = exports.TextGradientSchema = exports.TextOutlineSchema = exports.TextShadowSchema = void 0;
const zod_1 = require("zod");
const menu_types_1 = require("./menu.types");
// Text effect schemas
exports.TextShadowSchema = zod_1.z.object({
    color: zod_1.z.string(),
    blur: zod_1.z.number().min(0),
    offsetX: zod_1.z.number(),
    offsetY: zod_1.z.number()
});
exports.TextOutlineSchema = zod_1.z.object({
    color: zod_1.z.string(),
    width: zod_1.z.number().min(0)
});
exports.TextGradientSchema = zod_1.z.object({
    type: zod_1.z.enum(['linear', 'radial']),
    colors: zod_1.z.array(zod_1.z.string()).min(2),
    angle: zod_1.z.number().optional(), // For linear gradients
    centerX: zod_1.z.number().optional(), // For radial gradients
    centerY: zod_1.z.number().optional(), // For radial gradients
    radius: zod_1.z.number().optional() // For radial gradients
});
exports.TextGlowSchema = zod_1.z.object({
    color: zod_1.z.string(),
    intensity: zod_1.z.number().min(0).max(100),
    spread: zod_1.z.number().min(0)
});
// Enhanced text element schema
exports.EnhancedTextElementSchema = menu_types_1.TextElementSchema.extend({
    style: menu_types_1.TextElementSchema.shape.style.extend({
        // Advanced typography
        textTransform: zod_1.z.enum(['none', 'uppercase', 'lowercase', 'capitalize']).optional(),
        wordSpacing: zod_1.z.number().optional(),
        textIndent: zod_1.z.number().optional(),
        whiteSpace: zod_1.z.enum(['normal', 'nowrap', 'pre', 'pre-wrap', 'pre-line']).optional(),
        // Advanced effects
        textStroke: exports.TextOutlineSchema.optional(),
        textGradient: exports.TextGradientSchema.optional(),
        textGlow: exports.TextGlowSchema.optional(),
        multipleShadows: zod_1.z.array(exports.TextShadowSchema).optional(),
        // Background effects
        backgroundColor: zod_1.z.string().optional(),
        backgroundGradient: exports.TextGradientSchema.optional(),
        backgroundPadding: zod_1.z.object({
            top: zod_1.z.number(),
            right: zod_1.z.number(),
            bottom: zod_1.z.number(),
            left: zod_1.z.number()
        }).optional(),
        backgroundBorderRadius: zod_1.z.number().optional(),
        // Advanced styling
        writingMode: zod_1.z.enum(['horizontal-tb', 'vertical-rl', 'vertical-lr']).optional(),
        textOrientation: zod_1.z.enum(['mixed', 'upright', 'sideways']).optional(),
        direction: zod_1.z.enum(['ltr', 'rtl']).optional()
    }),
    // Rich text content with formatting
    richContent: zod_1.z.object({
        blocks: zod_1.z.array(zod_1.z.object({
            id: zod_1.z.string(),
            type: zod_1.z.enum(['paragraph', 'heading', 'list']),
            content: zod_1.z.array(zod_1.z.object({
                text: zod_1.z.string(),
                marks: zod_1.z.array(zod_1.z.enum(['bold', 'italic', 'underline', 'strikethrough', 'code', 'superscript', 'subscript'])).optional(),
                color: zod_1.z.string().optional(),
                backgroundColor: zod_1.z.string().optional(),
                fontSize: zod_1.z.number().optional(),
                fontFamily: zod_1.z.string().optional()
            }))
        }))
    }).optional()
});
// Font configuration
exports.FontConfigSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    family: zod_1.z.string(),
    category: zod_1.z.enum(['serif', 'sans-serif', 'display', 'handwriting', 'monospace']),
    variants: zod_1.z.array(zod_1.z.object({
        weight: zod_1.z.number(),
        style: zod_1.z.enum(['normal', 'italic']),
        src: zod_1.z.string() // URL or local path
    })),
    fallback: zod_1.z.array(zod_1.z.string()).optional(),
    source: zod_1.z.enum(['google', 'adobe', 'custom', 'system']),
    license: zod_1.z.string().optional()
});
// Preset text styles
exports.TextStylePresetSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    category: zod_1.z.enum(['heading', 'body', 'accent', 'special']),
    style: exports.EnhancedTextElementSchema.shape.style,
    thumbnail: zod_1.z.string().optional()
});
// Default fonts collection
exports.DEFAULT_FONTS = [
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
exports.TEXT_STYLE_PRESETS = [
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
//# sourceMappingURL=enhanced-text.types.js.map