"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMenusUseCase = void 0;
/**
 * Get Menus Use Case
 * Retrieves menus for an organization
 */
class GetMenusUseCase {
    menuRepository;
    logger;
    constructor(menuRepository, logger) {
        this.menuRepository = menuRepository;
        this.logger = logger;
    }
    async execute(params) {
        this.logger.info('Fetching menus', {
            organizationId: params.organizationId
        });
        try {
            const menus = await this.menuRepository.findByOrganization(params.organizationId);
            const menuDtos = menus.map(menu => this.toDto(menu));
            this.logger.info('Menus fetched successfully', {
                organizationId: params.organizationId,
                count: menuDtos.length
            });
            return {
                menus: menuDtos,
                total: menuDtos.length
            };
        }
        catch (error) {
            this.logger.error('Failed to fetch menus', error, {
                organizationId: params.organizationId
            });
            throw error;
        }
    }
    toDto(menu) {
        return {
            id: menu.id,
            name: menu.name,
            description: menu.description,
            status: menu.status,
            template: menu.template,
            settings: menu.settings,
            createdAt: menu.createdAt,
            updatedAt: menu.updatedAt,
            publishedAt: menu.publishedAt
        };
    }
}
exports.GetMenusUseCase = GetMenusUseCase;
//# sourceMappingURL=GetMenusUseCase.js.map