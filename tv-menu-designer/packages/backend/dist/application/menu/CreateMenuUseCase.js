"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMenuUseCase = void 0;
const MenuDomain_1 = require("../../domain/menu/MenuDomain");
const ApplicationErrors_1 = require("../../errors/ApplicationErrors");
const sanitizer_1 = require("../../utils/sanitizer");
/**
 * Create Menu Use Case
 * Orchestrates the creation of a new menu
 */
class CreateMenuUseCase {
    menuRepository;
    logger;
    constructor(menuRepository, logger) {
        this.menuRepository = menuRepository;
        this.logger = logger;
    }
    async execute(params) {
        this.logger.info('Creating new menu', {
            organizationId: params.organizationId,
            name: params.name
        });
        try {
            // Validate and sanitize inputs
            const sanitizedParams = this.validateAndSanitize(params);
            // Create domain entity
            const menu = MenuDomain_1.MenuDomain.create({
                organizationId: sanitizedParams.organizationId,
                name: sanitizedParams.name,
                description: sanitizedParams.description,
                template: sanitizedParams.template,
                settings: sanitizedParams.settings,
                createdBy: sanitizedParams.userId
            });
            // Persist to database
            await this.menuRepository.save(menu);
            this.logger.info('Menu created successfully', {
                menuId: menu.id,
                organizationId: menu.organizationId
            });
            return {
                id: menu.id,
                name: menu.name,
                description: menu.description,
                status: menu.status,
                createdAt: menu.createdAt
            };
        }
        catch (error) {
            this.logger.error('Failed to create menu', error, {
                organizationId: params.organizationId,
                name: params.name
            });
            throw error;
        }
    }
    validateAndSanitize(params) {
        // Validate required fields
        if (!params.organizationId || !params.userId) {
            throw new ApplicationErrors_1.ValidationError('Organization ID and User ID are required');
        }
        if (!params.name || params.name.trim().length === 0) {
            throw new ApplicationErrors_1.ValidationError('Menu name is required');
        }
        // Sanitize inputs to prevent XSS
        return {
            organizationId: params.organizationId,
            userId: params.userId,
            name: (0, sanitizer_1.sanitizeInput)(params.name),
            description: params.description ? (0, sanitizer_1.sanitizeInput)(params.description) : undefined,
            template: params.template,
            settings: params.settings
        };
    }
}
exports.CreateMenuUseCase = CreateMenuUseCase;
//# sourceMappingURL=CreateMenuUseCase.js.map