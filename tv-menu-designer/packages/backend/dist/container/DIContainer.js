"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpdateMenuUseCase = exports.getGetMenusUseCase = exports.getCreateMenuUseCase = exports.getMenuRepository = exports.getLogger = exports.container = exports.DIContainer = void 0;
const MenuRepository_1 = require("../repositories/MenuRepository");
const LoggerImpl_1 = require("../utils/LoggerImpl");
const CreateMenuUseCase_1 = require("../application/menu/CreateMenuUseCase");
const GetMenusUseCase_1 = require("../application/menu/GetMenusUseCase");
const UpdateMenuUseCase_1 = require("../application/menu/UpdateMenuUseCase");
/**
 * Dependency Injection Container
 * Manages object creation and dependencies
 */
class DIContainer {
    static instance;
    services = new Map();
    constructor() {
        this.registerServices();
    }
    static getInstance() {
        if (!DIContainer.instance) {
            DIContainer.instance = new DIContainer();
        }
        return DIContainer.instance;
    }
    /**
     * Register all services
     */
    registerServices() {
        // Register infrastructure services
        this.services.set('logger', LoggerImpl_1.loggerImpl);
        this.services.set('menuRepository', new MenuRepository_1.MenuRepository());
        // Register use cases
        this.services.set('createMenuUseCase', new CreateMenuUseCase_1.CreateMenuUseCase(this.get('menuRepository'), this.get('logger')));
        this.services.set('getMenusUseCase', new GetMenusUseCase_1.GetMenusUseCase(this.get('menuRepository'), this.get('logger')));
        this.services.set('updateMenuUseCase', new UpdateMenuUseCase_1.UpdateMenuUseCase(this.get('menuRepository'), this.get('logger')));
    }
    /**
     * Get a service from the container
     */
    get(serviceName) {
        const service = this.services.get(serviceName);
        if (!service) {
            throw new Error(`Service ${serviceName} not found in container`);
        }
        return service;
    }
    /**
     * Register a custom service
     */
    register(serviceName, service) {
        this.services.set(serviceName, service);
    }
}
exports.DIContainer = DIContainer;
// Export convenience getters
exports.container = DIContainer.getInstance();
const getLogger = () => exports.container.get('logger');
exports.getLogger = getLogger;
const getMenuRepository = () => exports.container.get('menuRepository');
exports.getMenuRepository = getMenuRepository;
const getCreateMenuUseCase = () => exports.container.get('createMenuUseCase');
exports.getCreateMenuUseCase = getCreateMenuUseCase;
const getGetMenusUseCase = () => exports.container.get('getMenusUseCase');
exports.getGetMenusUseCase = getGetMenusUseCase;
const getUpdateMenuUseCase = () => exports.container.get('updateMenuUseCase');
exports.getUpdateMenuUseCase = getUpdateMenuUseCase;
//# sourceMappingURL=DIContainer.js.map