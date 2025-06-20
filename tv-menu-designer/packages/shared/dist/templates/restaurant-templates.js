"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantTemplates = void 0;
exports.getRestaurantTemplates = getRestaurantTemplates;
exports.getTemplateById = getTemplateById;
const uuid_1 = require("uuid");
exports.restaurantTemplates = [
    {
        id: (0, uuid_1.v4)(),
        version: '1.0.0',
        metadata: {
            name: 'Classic Restaurant Menu',
            description: 'Traditional restaurant menu with sections for appetizers, mains, and desserts',
            author: 'TV Menu Designer',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            tags: ['restaurant', 'classic', 'elegant'],
            category: 'restaurant'
        },
        settings: {
            canvas: {
                width: 1920,
                height: 1080,
                backgroundColor: '#F5F5DC',
                aspectRatio: '16:9'
            },
            theme: {
                primaryColor: '#8B4513',
                secondaryColor: '#D2691E',
                accentColor: '#FFD700',
                textColor: '#2F1B14',
                fonts: {
                    heading: 'Playfair Display',
                    body: 'Georgia',
                    price: 'Roboto'
                }
            },
            animations: {
                pageTransition: 'fade',
                elementAnimation: true,
                autoPlayDuration: 30
            }
        },
        pages: [
            {
                id: (0, uuid_1.v4)(),
                name: 'Main Menu',
                elements: [
                    {
                        id: (0, uuid_1.v4)(),
                        type: 'text',
                        content: 'Our Menu',
                        position: { x: 960, y: 80 },
                        size: { width: 400, height: 80 },
                        layer: 1,
                        locked: false,
                        visible: true,
                        rotation: 0,
                        opacity: 1,
                        style: {
                            fontFamily: 'Playfair Display',
                            fontSize: 64,
                            fontWeight: 'bold',
                            color: '#8B4513',
                            textAlign: 'center'
                        }
                    },
                    {
                        id: (0, uuid_1.v4)(),
                        type: 'shape',
                        shapeType: 'rectangle',
                        position: { x: 100, y: 200 },
                        size: { width: 560, height: 700 },
                        layer: 0,
                        locked: false,
                        visible: true,
                        rotation: 0,
                        opacity: 0.9,
                        style: {
                            fill: '#FFFFFF',
                            stroke: '#8B4513',
                            strokeWidth: 2
                        }
                    },
                    {
                        id: (0, uuid_1.v4)(),
                        type: 'text',
                        content: 'Appetizers',
                        position: { x: 380, y: 240 },
                        size: { width: 200, height: 50 },
                        layer: 2,
                        locked: false,
                        visible: true,
                        rotation: 0,
                        opacity: 1,
                        style: {
                            fontFamily: 'Playfair Display',
                            fontSize: 36,
                            fontWeight: 'bold',
                            color: '#8B4513',
                            textAlign: 'center'
                        }
                    },
                    {
                        id: (0, uuid_1.v4)(),
                        type: 'shape',
                        shapeType: 'rectangle',
                        position: { x: 680, y: 200 },
                        size: { width: 560, height: 700 },
                        layer: 0,
                        locked: false,
                        visible: true,
                        rotation: 0,
                        opacity: 0.9,
                        style: {
                            fill: '#FFFFFF',
                            stroke: '#8B4513',
                            strokeWidth: 2
                        }
                    },
                    {
                        id: (0, uuid_1.v4)(),
                        type: 'text',
                        content: 'Main Courses',
                        position: { x: 960, y: 240 },
                        size: { width: 200, height: 50 },
                        layer: 2,
                        locked: false,
                        visible: true,
                        rotation: 0,
                        opacity: 1,
                        style: {
                            fontFamily: 'Playfair Display',
                            fontSize: 36,
                            fontWeight: 'bold',
                            color: '#8B4513',
                            textAlign: 'center'
                        }
                    },
                    {
                        id: (0, uuid_1.v4)(),
                        type: 'shape',
                        shapeType: 'rectangle',
                        position: { x: 1260, y: 200 },
                        size: { width: 560, height: 700 },
                        layer: 0,
                        locked: false,
                        visible: true,
                        rotation: 0,
                        opacity: 0.9,
                        style: {
                            fill: '#FFFFFF',
                            stroke: '#8B4513',
                            strokeWidth: 2
                        }
                    },
                    {
                        id: (0, uuid_1.v4)(),
                        type: 'text',
                        content: 'Desserts',
                        position: { x: 1540, y: 240 },
                        size: { width: 200, height: 50 },
                        layer: 2,
                        locked: false,
                        visible: true,
                        rotation: 0,
                        opacity: 1,
                        style: {
                            fontFamily: 'Playfair Display',
                            fontSize: 36,
                            fontWeight: 'bold',
                            color: '#8B4513',
                            textAlign: 'center'
                        }
                    }
                ]
            }
        ]
    },
    {
        id: (0, uuid_1.v4)(),
        version: '1.0.0',
        metadata: {
            name: 'Modern Cafe Menu',
            description: 'Clean and modern cafe menu with minimalist design',
            author: 'TV Menu Designer',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            tags: ['cafe', 'modern', 'minimalist'],
            category: 'cafe'
        },
        settings: {
            canvas: {
                width: 1920,
                height: 1080,
                backgroundColor: '#FFFFFF',
                aspectRatio: '16:9'
            },
            theme: {
                primaryColor: '#2C3E50',
                secondaryColor: '#E74C3C',
                accentColor: '#3498DB',
                textColor: '#2C3E50',
                fonts: {
                    heading: 'Montserrat',
                    body: 'Open Sans',
                    price: 'Roboto Mono'
                }
            },
            animations: {
                pageTransition: 'slide',
                elementAnimation: true,
                autoPlayDuration: 25
            }
        },
        pages: [
            {
                id: (0, uuid_1.v4)(),
                name: 'Coffee & Beverages',
                elements: [
                    {
                        id: (0, uuid_1.v4)(),
                        type: 'shape',
                        shapeType: 'rectangle',
                        position: { x: 0, y: 0 },
                        size: { width: 1920, height: 120 },
                        layer: 0,
                        locked: false,
                        visible: true,
                        rotation: 0,
                        opacity: 1,
                        style: {
                            fill: '#2C3E50'
                        }
                    },
                    {
                        id: (0, uuid_1.v4)(),
                        type: 'text',
                        content: 'CAFE MENU',
                        position: { x: 960, y: 40 },
                        size: { width: 400, height: 60 },
                        layer: 1,
                        locked: false,
                        visible: true,
                        rotation: 0,
                        opacity: 1,
                        style: {
                            fontFamily: 'Montserrat',
                            fontSize: 48,
                            fontWeight: '300',
                            color: '#FFFFFF',
                            textAlign: 'center',
                            letterSpacing: 8
                        }
                    },
                    {
                        id: (0, uuid_1.v4)(),
                        type: 'shape',
                        shapeType: 'rectangle',
                        position: { x: 100, y: 200 },
                        size: { width: 880, height: 400 },
                        layer: 0,
                        locked: false,
                        visible: true,
                        rotation: 0,
                        opacity: 1,
                        style: {
                            fill: '#F8F9FA',
                            stroke: '#E9ECEF',
                            strokeWidth: 1
                        }
                    },
                    {
                        id: (0, uuid_1.v4)(),
                        type: 'text',
                        content: 'HOT BEVERAGES',
                        position: { x: 540, y: 240 },
                        size: { width: 300, height: 40 },
                        layer: 1,
                        locked: false,
                        visible: true,
                        rotation: 0,
                        opacity: 1,
                        style: {
                            fontFamily: 'Montserrat',
                            fontSize: 24,
                            fontWeight: '600',
                            color: '#E74C3C',
                            textAlign: 'center',
                            letterSpacing: 2
                        }
                    },
                    {
                        id: (0, uuid_1.v4)(),
                        type: 'shape',
                        shapeType: 'rectangle',
                        position: { x: 1040, y: 200 },
                        size: { width: 780, height: 400 },
                        layer: 0,
                        locked: false,
                        visible: true,
                        rotation: 0,
                        opacity: 1,
                        style: {
                            fill: '#F8F9FA',
                            stroke: '#E9ECEF',
                            strokeWidth: 1
                        }
                    },
                    {
                        id: (0, uuid_1.v4)(),
                        type: 'text',
                        content: 'COLD BEVERAGES',
                        position: { x: 1430, y: 240 },
                        size: { width: 300, height: 40 },
                        layer: 1,
                        locked: false,
                        visible: true,
                        rotation: 0,
                        opacity: 1,
                        style: {
                            fontFamily: 'Montserrat',
                            fontSize: 24,
                            fontWeight: '600',
                            color: '#3498DB',
                            textAlign: 'center',
                            letterSpacing: 2
                        }
                    }
                ]
            }
        ]
    }
];
function getRestaurantTemplates() {
    return exports.restaurantTemplates;
}
function getTemplateById(id) {
    return exports.restaurantTemplates.find(template => template.id === id);
}
//# sourceMappingURL=restaurant-templates.js.map