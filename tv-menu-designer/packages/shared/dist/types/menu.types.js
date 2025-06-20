"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuTemplateSchema = exports.PageSchema = exports.ElementSchema = exports.SectionElementSchema = exports.ShapeElementSchema = exports.MenuItemElementSchema = exports.VideoElementSchema = exports.ImageElementSchema = exports.TextElementSchema = exports.BaseElementSchema = void 0;
const zod_1 = require("zod");
// Base element schema
exports.BaseElementSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    type: zod_1.z.enum(['section', 'text', 'image', 'video', 'menuItem', 'shape', 'widget']),
    layer: zod_1.z.number().int().min(0),
    locked: zod_1.z.boolean().default(false),
    visible: zod_1.z.boolean().default(true),
    position: zod_1.z.object({
        x: zod_1.z.number(),
        y: zod_1.z.number()
    }),
    size: zod_1.z.object({
        width: zod_1.z.number().positive(),
        height: zod_1.z.number().positive()
    }),
    rotation: zod_1.z.number().default(0),
    opacity: zod_1.z.number().min(0).max(1).default(1),
    animation: zod_1.z.object({
        enter: zod_1.z.object({
            type: zod_1.z.string().optional(),
            duration: zod_1.z.number().optional(),
            delay: zod_1.z.number().optional(),
            easing: zod_1.z.string().optional()
        }).optional(),
        exit: zod_1.z.object({
            type: zod_1.z.string().optional(),
            duration: zod_1.z.number().optional(),
            delay: zod_1.z.number().optional(),
            easing: zod_1.z.string().optional()
        }).optional(),
        loop: zod_1.z.object({
            type: zod_1.z.string().optional(),
            duration: zod_1.z.number().optional(),
            repeat: zod_1.z.number().optional()
        }).optional()
    }).optional()
});
// Text element schema
exports.TextElementSchema = exports.BaseElementSchema.extend({
    type: zod_1.z.literal('text'),
    content: zod_1.z.string(),
    style: zod_1.z.object({
        fontFamily: zod_1.z.string(),
        fontSize: zod_1.z.number(),
        fontWeight: zod_1.z.string().optional(),
        fontStyle: zod_1.z.string().optional(),
        textAlign: zod_1.z.enum(['left', 'center', 'right', 'justify']).optional(),
        color: zod_1.z.string(),
        lineHeight: zod_1.z.number().optional(),
        letterSpacing: zod_1.z.number().optional(),
        textDecoration: zod_1.z.string().optional(),
        textShadow: zod_1.z.object({
            x: zod_1.z.number(),
            y: zod_1.z.number(),
            blur: zod_1.z.number(),
            color: zod_1.z.string()
        }).optional()
    })
});
// Image element schema
exports.ImageElementSchema = exports.BaseElementSchema.extend({
    type: zod_1.z.literal('image'),
    src: zod_1.z.string().url(),
    alt: zod_1.z.string().optional(),
    style: zod_1.z.object({
        objectFit: zod_1.z.enum(['contain', 'cover', 'fill', 'none', 'scale-down']).optional(),
        borderRadius: zod_1.z.number().optional(),
        filter: zod_1.z.object({
            brightness: zod_1.z.number().optional(),
            contrast: zod_1.z.number().optional(),
            grayscale: zod_1.z.number().optional(),
            blur: zod_1.z.number().optional()
        }).optional()
    }).optional()
});
// Video element schema
exports.VideoElementSchema = exports.BaseElementSchema.extend({
    type: zod_1.z.literal('video'),
    src: zod_1.z.string().url(),
    poster: zod_1.z.string().url().optional(),
    settings: zod_1.z.object({
        autoplay: zod_1.z.boolean().default(true),
        loop: zod_1.z.boolean().default(true),
        muted: zod_1.z.boolean().default(true),
        controls: zod_1.z.boolean().default(false)
    })
});
// Menu item element schema
exports.MenuItemElementSchema = exports.BaseElementSchema.extend({
    type: zod_1.z.literal('menuItem'),
    data: zod_1.z.object({
        name: zod_1.z.string(),
        description: zod_1.z.string().optional(),
        price: zod_1.z.string(),
        image: zod_1.z.string().url().optional(),
        tags: zod_1.z.array(zod_1.z.string()).default([]),
        dietary: zod_1.z.array(zod_1.z.enum(['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'halal', 'kosher'])).default([]),
        spiceLevel: zod_1.z.number().int().min(0).max(5).optional()
    }),
    layout: zod_1.z.enum(['horizontal', 'vertical', 'card', 'list']).default('horizontal'),
    style: zod_1.z.object({
        nameStyle: zod_1.z.any(), // TextElement style
        descriptionStyle: zod_1.z.any().optional(),
        priceStyle: zod_1.z.any(),
        backgroundColor: zod_1.z.string().optional(),
        borderColor: zod_1.z.string().optional(),
        padding: zod_1.z.number().optional()
    })
});
// Shape element schema
exports.ShapeElementSchema = exports.BaseElementSchema.extend({
    type: zod_1.z.literal('shape'),
    shapeType: zod_1.z.enum(['rectangle', 'circle', 'triangle', 'line', 'polygon', 'star']),
    style: zod_1.z.object({
        fill: zod_1.z.string().optional(),
        stroke: zod_1.z.string().optional(),
        strokeWidth: zod_1.z.number().optional(),
        strokeDasharray: zod_1.z.string().optional()
    })
});
// Section element schema
exports.SectionElementSchema = exports.BaseElementSchema.extend({
    type: zod_1.z.literal('section'),
    style: zod_1.z.object({
        backgroundColor: zod_1.z.string().optional(),
        backgroundImage: zod_1.z.string().url().optional(),
        backgroundSize: zod_1.z.string().optional(),
        backgroundPosition: zod_1.z.string().optional(),
        borderRadius: zod_1.z.number().optional(),
        borderWidth: zod_1.z.number().optional(),
        borderColor: zod_1.z.string().optional(),
        shadow: zod_1.z.object({
            x: zod_1.z.number(),
            y: zod_1.z.number(),
            blur: zod_1.z.number(),
            color: zod_1.z.string()
        }).optional()
    }),
    children: zod_1.z.array(zod_1.z.string()) // IDs of child elements
});
// Combined element schema
exports.ElementSchema = zod_1.z.discriminatedUnion('type', [
    exports.SectionElementSchema,
    exports.TextElementSchema,
    exports.ImageElementSchema,
    exports.VideoElementSchema,
    exports.MenuItemElementSchema,
    exports.ShapeElementSchema
]);
// Page schema
exports.PageSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    duration: zod_1.z.number().positive().optional(),
    transition: zod_1.z.object({
        type: zod_1.z.string(),
        duration: zod_1.z.number(),
        easing: zod_1.z.string()
    }).optional(),
    elements: zod_1.z.array(exports.ElementSchema)
});
// Menu template schema
exports.MenuTemplateSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    version: zod_1.z.string().regex(/^\d+\.\d+\.\d+$/),
    metadata: zod_1.z.object({
        name: zod_1.z.string(),
        description: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
        organization: zod_1.z.string().optional(),
        createdAt: zod_1.z.string().datetime(),
        updatedAt: zod_1.z.string().datetime(),
        tags: zod_1.z.array(zod_1.z.string()).default([]),
        category: zod_1.z.enum(['restaurant', 'cafe', 'bar', 'retail', 'healthcare', 'education', 'corporate']).optional()
    }),
    settings: zod_1.z.object({
        canvas: zod_1.z.object({
            width: zod_1.z.number().default(1920),
            height: zod_1.z.number().default(1080),
            backgroundColor: zod_1.z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
            backgroundImage: zod_1.z.string().url().optional(),
            aspectRatio: zod_1.z.enum(['16:9', '9:16', '1:1', '4:3', '3:4', 'custom']).default('16:9')
        }),
        theme: zod_1.z.object({
            primaryColor: zod_1.z.string(),
            secondaryColor: zod_1.z.string().optional(),
            accentColor: zod_1.z.string().optional(),
            textColor: zod_1.z.string().optional(),
            fonts: zod_1.z.object({
                heading: zod_1.z.string().optional(),
                body: zod_1.z.string().optional(),
                price: zod_1.z.string().optional()
            }).optional()
        }).optional(),
        animations: zod_1.z.object({
            pageTransition: zod_1.z.enum(['none', 'fade', 'slide', 'zoom', 'flip', 'cube']).default('fade'),
            elementAnimation: zod_1.z.boolean().default(true),
            autoPlayDuration: zod_1.z.number().min(0).optional()
        }).optional()
    }),
    pages: zod_1.z.array(exports.PageSchema).min(1)
});
//# sourceMappingURL=menu.types.js.map