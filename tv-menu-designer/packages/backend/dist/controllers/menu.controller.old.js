"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenus = getMenus;
exports.getMenuById = getMenuById;
exports.createMenu = createMenu;
exports.updateMenu = updateMenu;
exports.publishMenu = publishMenu;
exports.deleteMenu = deleteMenu;
exports.getPublishedMenu = getPublishedMenu;
const menuService_1 = require("../services/menuService");
const logger_1 = require("../utils/logger");
async function getMenus(req, res) {
    try {
        const organizationId = req.user?.organizationId || '';
        const menus = await menuService_1.menuService.getMenus(organizationId);
        res.json({
            success: true,
            data: menus
        });
    }
    catch (error) {
        logger_1.logger.error('Get menus error:', error);
        throw error;
    }
}
async function getMenuById(req, res) {
    try {
        const { id } = req.params;
        const organizationId = req.user?.organizationId || '';
        const menu = await menuService_1.menuService.getMenuById(id, organizationId);
        res.json({
            success: true,
            data: menu
        });
    }
    catch (error) {
        logger_1.logger.error('Get menu error:', error);
        throw error;
    }
}
async function createMenu(req, res) {
    try {
        const { name, description, template } = req.body;
        const organizationId = req.user?.organizationId || '';
        const userId = req.user?.id || '';
        const menu = await menuService_1.menuService.createMenu({
            organizationId,
            name,
            description,
            template,
            createdBy: userId
        });
        res.status(201).json({
            success: true,
            data: menu
        });
    }
    catch (error) {
        logger_1.logger.error('Create menu error:', error);
        throw error;
    }
}
async function updateMenu(req, res) {
    try {
        const { id } = req.params;
        const { name, description, template } = req.body;
        const organizationId = req.user?.organizationId || '';
        const userId = req.user?.id || '';
        const menu = await menuService_1.menuService.updateMenu(id, organizationId, {
            name,
            description,
            template,
            updatedBy: userId
        });
        res.json({
            success: true,
            data: menu
        });
    }
    catch (error) {
        logger_1.logger.error('Update menu error:', error);
        throw error;
    }
}
async function publishMenu(req, res) {
    try {
        const { id } = req.params;
        const organizationId = req.user?.organizationId || '';
        const userId = req.user?.id || '';
        const menu = await menuService_1.menuService.publishMenu(id, organizationId, userId);
        res.json({
            success: true,
            data: menu
        });
    }
    catch (error) {
        logger_1.logger.error('Publish menu error:', error);
        throw error;
    }
}
async function deleteMenu(req, res) {
    try {
        const { id } = req.params;
        const organizationId = req.user?.organizationId || '';
        await menuService_1.menuService.deleteMenu(id, organizationId);
        res.json({
            success: true,
            message: 'Menu deleted successfully'
        });
    }
    catch (error) {
        logger_1.logger.error('Delete menu error:', error);
        throw error;
    }
}
// Public endpoint for TV display
async function getPublishedMenu(req, res) {
    try {
        const { id } = req.params;
        // For MVP, just get the menu without auth
        const menu = await menuService_1.menuService.getMenuById(id, '');
        if (menu.status !== 'published') {
            return res.status(404).json({
                success: false,
                message: 'Menu not published'
            });
        }
        res.json({
            success: true,
            data: menu
        });
    }
    catch (error) {
        logger_1.logger.error('Get published menu error:', error);
        throw error;
    }
}
//# sourceMappingURL=menu.controller.old.js.map