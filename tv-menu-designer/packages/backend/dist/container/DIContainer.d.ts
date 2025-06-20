import { IMenuRepository } from '../repositories/MenuRepository';
import { ILogger } from '../utils/ILogger';
import { CreateMenuUseCase } from '../application/menu/CreateMenuUseCase';
import { GetMenusUseCase } from '../application/menu/GetMenusUseCase';
import { UpdateMenuUseCase } from '../application/menu/UpdateMenuUseCase';
/**
 * Dependency Injection Container
 * Manages object creation and dependencies
 */
export declare class DIContainer {
    private static instance;
    private services;
    private constructor();
    static getInstance(): DIContainer;
    /**
     * Register all services
     */
    private registerServices;
    /**
     * Get a service from the container
     */
    get<T>(serviceName: string): T;
    /**
     * Register a custom service
     */
    register<T>(serviceName: string, service: T): void;
}
export declare const container: DIContainer;
export declare const getLogger: () => ILogger;
export declare const getMenuRepository: () => IMenuRepository;
export declare const getCreateMenuUseCase: () => CreateMenuUseCase;
export declare const getGetMenusUseCase: () => GetMenusUseCase;
export declare const getUpdateMenuUseCase: () => UpdateMenuUseCase;
//# sourceMappingURL=DIContainer.d.ts.map