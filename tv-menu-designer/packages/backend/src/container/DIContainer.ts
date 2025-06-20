import { IMenuRepository, MenuRepository } from '../repositories/MenuRepository';
import { ILogger } from '../utils/ILogger';
import { loggerImpl } from '../utils/LoggerImpl';
import { CreateMenuUseCase } from '../application/menu/CreateMenuUseCase';
import { GetMenusUseCase } from '../application/menu/GetMenusUseCase';
import { UpdateMenuUseCase } from '../application/menu/UpdateMenuUseCase';

/**
 * Dependency Injection Container
 * Manages object creation and dependencies
 */
export class DIContainer {
  private static instance: DIContainer;
  private services: Map<string, any> = new Map();

  private constructor() {
    this.registerServices();
  }

  static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  /**
   * Register all services
   */
  private registerServices(): void {
    // Register infrastructure services
    this.services.set('logger', loggerImpl);
    this.services.set('menuRepository', new MenuRepository());

    // Register use cases
    this.services.set('createMenuUseCase', new CreateMenuUseCase(
      this.get<IMenuRepository>('menuRepository'),
      this.get<ILogger>('logger')
    ));

    this.services.set('getMenusUseCase', new GetMenusUseCase(
      this.get<IMenuRepository>('menuRepository'),
      this.get<ILogger>('logger')
    ));

    this.services.set('updateMenuUseCase', new UpdateMenuUseCase(
      this.get<IMenuRepository>('menuRepository'),
      this.get<ILogger>('logger')
    ));
  }

  /**
   * Get a service from the container
   */
  get<T>(serviceName: string): T {
    const service = this.services.get(serviceName);
    if (!service) {
      throw new Error(`Service ${serviceName} not found in container`);
    }
    return service as T;
  }

  /**
   * Register a custom service
   */
  register<T>(serviceName: string, service: T): void {
    this.services.set(serviceName, service);
  }
}

// Export convenience getters
export const container = DIContainer.getInstance();

export const getLogger = (): ILogger => container.get<ILogger>('logger');
export const getMenuRepository = (): IMenuRepository => container.get<IMenuRepository>('menuRepository');
export const getCreateMenuUseCase = (): CreateMenuUseCase => container.get<CreateMenuUseCase>('createMenuUseCase');
export const getGetMenusUseCase = (): GetMenusUseCase => container.get<GetMenusUseCase>('getMenusUseCase');
export const getUpdateMenuUseCase = (): UpdateMenuUseCase => container.get<UpdateMenuUseCase>('updateMenuUseCase');