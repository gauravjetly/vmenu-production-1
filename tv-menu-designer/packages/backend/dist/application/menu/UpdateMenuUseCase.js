"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMenuUseCase = void 0;
const ApplicationErrors_1 = require("../../errors/ApplicationErrors");
const sanitizer_1 = require("../../utils/sanitizer");
/**
 * Update Menu Use Case
 * Handles menu updates with proper validation and authorization
 */
class UpdateMenuUseCase {
    menuRepository;
    logger;
    constructor(menuRepository, logger) {
        this.menuRepository = menuRepository;
        this.logger = logger;
    }
    async execute(params) {
        this.logger.info('Updating menu', {
            menuId: params.menuId,
            organizationId: params.organizationId
        });
        try {
            // Validate inputs
            this.validateRequest(params);
            // Fetch existing menu
            const menu = await this.menuRepository.findById(params.menuId, params.organizationId);
            if (!menu) {
                throw new ApplicationErrors_1.NotFoundError('Menu not found');
            }
            // Sanitize inputs
            const sanitizedParams = this.sanitizeInputs(params);
            // Update domain entity
            menu.update({
                name: sanitizedParams.name,
                description: sanitizedParams.description,
                template: sanitizedParams.template,
                settings: sanitizedParams.settings,
                updatedBy: params.userId
            });
            // Persist changes
            await this.menuRepository.save(menu);
            this.logger.info('Menu updated successfully', {
                menuId: menu.id,
                organizationId: menu.organizationId
            });
            return {
                id: menu.id,
                name: menu.name,
                description: menu.description,
                status: menu.status,
                updatedAt: menu.updatedAt
            };
        }
        catch (error) {
            this.logger.error('Failed to update menu', error, {
                menuId: params.menuId,
                organizationId: params.organizationId
            });
            throw error;
        }
    }
    validateRequest(params) {
        if (!params.menuId || !params.organizationId || !params.userId) {
            throw new ApplicationErrors_1.ValidationError('Menu ID, Organization ID, and User ID are required');
        }
        // At least one field must be provided for update
        if (!params.name && params.description === undefined && !params.template && !params.settings) {
            throw new ApplicationErrors_1.ValidationError('No fields provided for update');
        }
        // Validate template if provided
        if (params.template) {
            this.validateTemplate(params.template);
        }
    }
    validateTemplate(template) {
        if (!template.id || !template.version) {
            throw new ApplicationErrors_1.ValidationError('Invalid template structure: missing id or version');
        }
        if (!template.settings?.canvas) {
            throw new ApplicationErrors_1.ValidationError('Template must have canvas settings');
        }
        // Ensure template has at least one page
        if (!template.pages || !Array.isArray(template.pages) || template.pages.length === 0) {
            throw new ApplicationErrors_1.ValidationError('Template must have at least one page');
        }
        // Validate each page has required properties
        template.pages.forEach((page, index) => {
            if (!page.id) {
                throw new ApplicationErrors_1.ValidationError(`Page at index ${index} is missing an id`);
            }
            if (!page.name) {
                throw new ApplicationErrors_1.ValidationError(`Page at index ${index} is missing a name`);
            }
            if (!Array.isArray(page.elements)) {
                throw new ApplicationErrors_1.ValidationError(`Page at index ${index} must have an elements array`);
            }
        });
    }
    sanitizeInputs(params) {
        return {
            name: params.name ? (0, sanitizer_1.sanitizeInput)(params.name) : undefined,
            description: params.description !== undefined ?
                (params.description ? (0, sanitizer_1.sanitizeInput)(params.description) : undefined) :
                undefined,
            template: params.template,
            settings: params.settings
        };
    }
}
exports.UpdateMenuUseCase = UpdateMenuUseCase;
//# sourceMappingURL=UpdateMenuUseCase.js.map