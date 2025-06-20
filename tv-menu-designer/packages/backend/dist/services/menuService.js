"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuService = exports.MenuService = void 0;
const Menu_1 = require("../models/Menu");
const uuid_1 = require("uuid");
const errorHandler_1 = require("../middleware/errorHandler");
class MenuService {
    async createMenu(data) {
        // Create default template if not provided
        const defaultTemplate = {
            id: (0, uuid_1.v4)(),
            version: '1.0.0',
            metadata: {
                name: data.name,
                description: data.description,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                tags: [],
            },
            settings: {
                canvas: {
                    width: 1920,
                    height: 1080,
                    backgroundColor: '#ffffff',
                    aspectRatio: '16:9'
                }
            },
            pages: [{
                    id: (0, uuid_1.v4)(),
                    name: 'Page 1',
                    elements: []
                }]
        };
        const menu = await Menu_1.Menu.query().insert({
            id: (0, uuid_1.v4)(),
            organizationId: data.organizationId,
            name: data.name,
            description: data.description,
            version: '1.0.0',
            template: data.template || defaultTemplate,
            settings: {},
            createdBy: data.createdBy,
            updatedBy: data.createdBy
        });
        return menu;
    }
    async getMenus(organizationId) {
        return Menu_1.Menu.query()
            .where('organizationId', organizationId)
            .orderBy('updatedAt', 'desc');
    }
    async getMenuById(id, organizationId) {
        let query = Menu_1.Menu.query().findById(id);
        if (organizationId) {
            query = query.where('organizationId', organizationId);
        }
        const menu = await query;
        if (!menu) {
            throw new errorHandler_1.AppError('Menu not found', 404);
        }
        return menu;
    }
    async updateMenu(id, organizationId, data) {
        const menu = await Menu_1.Menu.query()
            .findById(id)
            .where('organizationId', organizationId);
        if (!menu) {
            throw new errorHandler_1.AppError('Menu not found', 404);
        }
        return menu.$query().patchAndFetch({
            ...data,
            updatedAt: new Date()
        });
    }
    async publishMenu(id, organizationId, userId) {
        const menu = await Menu_1.Menu.query()
            .findById(id)
            .where('organizationId', organizationId);
        if (!menu) {
            throw new errorHandler_1.AppError('Menu not found', 404);
        }
        return menu.$query().patchAndFetch({
            status: 'published',
            publishedAt: new Date(),
            updatedBy: userId
        });
    }
    async deleteMenu(id, organizationId) {
        const menu = await Menu_1.Menu.query()
            .findById(id)
            .where('organizationId', organizationId);
        if (!menu) {
            throw new errorHandler_1.AppError('Menu not found', 404);
        }
        await menu.$query().delete();
        return { success: true };
    }
}
exports.MenuService = MenuService;
exports.menuService = new MenuService();
//# sourceMappingURL=menuService.js.map