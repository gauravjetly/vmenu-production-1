"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenus = getMenus;
exports.getMenuById = getMenuById;
exports.createMenu = createMenu;
exports.updateMenu = updateMenu;
exports.publishMenu = publishMenu;
exports.deleteMenu = deleteMenu;
exports.getPublishedMenu = getPublishedMenu;
const DIContainer_1 = require("../container/DIContainer");
const ApplicationErrors_1 = require("../errors/ApplicationErrors");
const logger = (0, DIContainer_1.getLogger)();
/**
 * Refactored Menu Controller
 * Uses clean architecture with use cases
 */
async function getMenus(req, res, next) {
    try {
        const useCase = (0, DIContainer_1.getGetMenusUseCase)();
        const result = await useCase.execute({
            organizationId: req.user.organizationId,
            userId: req.user.id
        });
        res.json({
            success: true,
            data: result.menus,
            meta: {
                total: result.total
            }
        });
    }
    catch (error) {
        next(error);
    }
}
async function getMenuById(req, res, next) {
    try {
        // TODO: Create GetMenuByIdUseCase
        const { id } = req.params;
        // For now, using the repository directly
        const menuRepository = await Promise.resolve().then(() => __importStar(require('../repositories/MenuRepository')));
        const repo = new menuRepository.MenuRepository();
        const menu = await repo.findById(id, req.user.organizationId);
        if (!menu) {
            return res.status(404).json({
                success: false,
                error: 'Menu not found'
            });
        }
        res.json({
            success: true,
            data: menu.toPersistence()
        });
    }
    catch (error) {
        next(error);
    }
}
async function createMenu(req, res, next) {
    try {
        const useCase = (0, DIContainer_1.getCreateMenuUseCase)();
        const result = await useCase.execute({
            organizationId: req.user.organizationId,
            userId: req.user.id,
            name: req.body.name,
            description: req.body.description,
            template: req.body.template,
            settings: req.body.settings
        });
        res.status(201).json({
            success: true,
            data: result
        });
    }
    catch (error) {
        if (error instanceof ApplicationErrors_1.ApplicationError) {
            return res.status(error.statusCode).json({
                success: false,
                error: error.message,
                code: error.code
            });
        }
        next(error);
    }
}
async function updateMenu(req, res, next) {
    try {
        const useCase = (0, DIContainer_1.getUpdateMenuUseCase)();
        const result = await useCase.execute({
            menuId: req.params.id,
            organizationId: req.user.organizationId,
            userId: req.user.id,
            name: req.body.name,
            description: req.body.description,
            template: req.body.template,
            settings: req.body.settings
        });
        res.json({
            success: true,
            data: result
        });
    }
    catch (error) {
        if (error instanceof ApplicationErrors_1.ApplicationError) {
            return res.status(error.statusCode).json({
                success: false,
                error: error.message,
                code: error.code
            });
        }
        next(error);
    }
}
async function publishMenu(req, res, next) {
    try {
        const { id } = req.params;
        // TODO: Create PublishMenuUseCase
        const menuRepository = await Promise.resolve().then(() => __importStar(require('../repositories/MenuRepository')));
        const repo = new menuRepository.MenuRepository();
        const menu = await repo.findById(id, req.user.organizationId);
        if (!menu) {
            return res.status(404).json({
                success: false,
                error: 'Menu not found'
            });
        }
        try {
            menu.publish(req.user.id);
            await repo.save(menu);
        }
        catch (publishError) {
            logger.error(`Failed to publish menu ${id}. Template has ${menu.template.pages?.length || 0} pages`, publishError);
            throw publishError;
        }
        res.json({
            success: true,
            data: {
                id: menu.id,
                status: menu.status,
                publishedAt: menu.publishedAt
            }
        });
    }
    catch (error) {
        if (error instanceof ApplicationErrors_1.ApplicationError) {
            return res.status(error.statusCode).json({
                success: false,
                error: error.message,
                code: error.code
            });
        }
        next(error);
    }
}
async function deleteMenu(req, res, next) {
    try {
        const { id } = req.params;
        // TODO: Create DeleteMenuUseCase
        const menuRepository = await Promise.resolve().then(() => __importStar(require('../repositories/MenuRepository')));
        const repo = new menuRepository.MenuRepository();
        await repo.delete(id, req.user.organizationId);
        res.json({
            success: true,
            message: 'Menu deleted successfully'
        });
    }
    catch (error) {
        next(error);
    }
}
async function getPublishedMenu(req, res, next) {
    try {
        const { id } = req.params;
        // TODO: Create GetPublishedMenuUseCase
        const menuRepository = await Promise.resolve().then(() => __importStar(require('../repositories/MenuRepository')));
        const repo = new menuRepository.MenuRepository();
        const menu = await repo.findById(id);
        if (!menu) {
            return res.status(404).json({
                success: false,
                error: 'Menu not found'
            });
        }
        if (menu.status !== 'published') {
            return res.status(403).json({
                success: false,
                error: 'Menu is not published'
            });
        }
        res.json({
            success: true,
            data: menu.toPersistence()
        });
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=menu.controller.js.map