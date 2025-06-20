"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuBusinessError = exports.MenuValidationError = exports.MenuStatus = exports.MenuDomain = void 0;
const uuid_1 = require("uuid");
/**
 * Menu Domain Entity
 * Encapsulates business logic and invariants for menus
 */
class MenuDomain {
    id;
    organizationId;
    name;
    description;
    version;
    status;
    template;
    settings;
    createdBy;
    updatedBy;
    createdAt;
    updatedAt;
    publishedAt;
    constructor(id, organizationId, name, description, version, status, template, settings, createdBy, updatedBy, createdAt, updatedAt, publishedAt) {
        this.id = id;
        this.organizationId = organizationId;
        this.name = name;
        this.description = description;
        this.version = version;
        this.status = status;
        this.template = template;
        this.settings = settings;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.publishedAt = publishedAt;
    }
    /**
     * Factory method to create a new menu
     */
    static create(params) {
        // Validate business rules
        if (!params.name || params.name.trim().length === 0) {
            throw new MenuValidationError('Menu name is required');
        }
        if (params.name.length > 100) {
            throw new MenuValidationError('Menu name must be less than 100 characters');
        }
        const id = (0, uuid_1.v4)();
        const now = new Date();
        const defaultTemplate = MenuDomain.createDefaultTemplate(params.name, params.description);
        return new MenuDomain(id, params.organizationId, params.name.trim(), params.description?.trim(), '1.0.0', MenuStatus.DRAFT, params.template || defaultTemplate, params.settings || {}, params.createdBy, params.createdBy, now, now, undefined);
    }
    /**
     * Factory method to reconstitute from persistence
     */
    static fromPersistence(data) {
        // Heal template to ensure it always has pages
        const healedTemplate = MenuDomain.healTemplate(data.template);
        return new MenuDomain(data.id, data.organizationId, data.name, data.description, data.version, data.status, healedTemplate, data.settings, data.createdBy, data.updatedBy, data.createdAt, data.updatedAt, data.publishedAt);
    }
    /**
     * Update menu properties
     */
    update(params) {
        if (params.name !== undefined) {
            if (!params.name || params.name.trim().length === 0) {
                throw new MenuValidationError('Menu name cannot be empty');
            }
            if (params.name.length > 100) {
                throw new MenuValidationError('Menu name must be less than 100 characters');
            }
            this.name = params.name.trim();
        }
        if (params.description !== undefined) {
            this.description = params.description?.trim();
        }
        if (params.template !== undefined) {
            this.validateTemplate(params.template);
            this.template = params.template;
        }
        if (params.settings !== undefined) {
            this.settings = params.settings;
        }
        this.updatedBy = params.updatedBy;
        this.updatedAt = new Date();
    }
    /**
     * Publish the menu
     */
    publish(userId) {
        if (this.status === MenuStatus.PUBLISHED) {
            throw new MenuBusinessError('Menu is already published');
        }
        if (!this.template.pages || this.template.pages.length === 0) {
            throw new MenuBusinessError('Cannot publish menu without any pages');
        }
        this.status = MenuStatus.PUBLISHED;
        this.publishedAt = new Date();
        this.updatedBy = userId;
        this.updatedAt = new Date();
    }
    /**
     * Unpublish the menu
     */
    unpublish(userId) {
        if (this.status !== MenuStatus.PUBLISHED) {
            throw new MenuBusinessError('Menu is not published');
        }
        this.status = MenuStatus.DRAFT;
        this.updatedBy = userId;
        this.updatedAt = new Date();
    }
    /**
     * Archive the menu
     */
    archive(userId) {
        if (this.status === MenuStatus.ARCHIVED) {
            throw new MenuBusinessError('Menu is already archived');
        }
        this.status = MenuStatus.ARCHIVED;
        this.updatedBy = userId;
        this.updatedAt = new Date();
    }
    /**
     * Restore archived menu
     */
    restore(userId) {
        if (this.status !== MenuStatus.ARCHIVED) {
            throw new MenuBusinessError('Menu is not archived');
        }
        this.status = MenuStatus.DRAFT;
        this.updatedBy = userId;
        this.updatedAt = new Date();
    }
    /**
     * Validate template structure
     */
    validateTemplate(template) {
        if (!template.id || !template.version) {
            throw new MenuValidationError('Invalid template structure');
        }
        if (!template.settings?.canvas) {
            throw new MenuValidationError('Template must have canvas settings');
        }
        if (!template.pages || template.pages.length === 0) {
            throw new MenuValidationError('Template must have at least one page');
        }
    }
    /**
     * Create default template
     */
    static createDefaultTemplate(name, description) {
        return {
            id: (0, uuid_1.v4)(),
            version: '1.0.0',
            metadata: {
                name,
                description,
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
    }
    /**
     * Heal template to ensure it has valid structure and pages
     */
    static healTemplate(template) {
        // Create a deep copy to avoid mutating the original
        const healedTemplate = JSON.parse(JSON.stringify(template));
        // Ensure template has required fields
        if (!healedTemplate.id) {
            healedTemplate.id = (0, uuid_1.v4)();
        }
        if (!healedTemplate.version) {
            healedTemplate.version = '1.0.0';
        }
        // Ensure metadata exists
        if (!healedTemplate.metadata) {
            healedTemplate.metadata = {
                name: 'Healed Template',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                tags: []
            };
        }
        // Ensure settings exist with canvas
        if (!healedTemplate.settings) {
            healedTemplate.settings = {
                canvas: {
                    width: 1920,
                    height: 1080,
                    backgroundColor: '#ffffff',
                    aspectRatio: '16:9'
                }
            };
        }
        else if (!healedTemplate.settings.canvas) {
            healedTemplate.settings.canvas = {
                width: 1920,
                height: 1080,
                backgroundColor: '#ffffff',
                aspectRatio: '16:9'
            };
        }
        // Most importantly: ensure pages array exists and has at least one page
        if (!healedTemplate.pages || !Array.isArray(healedTemplate.pages)) {
            healedTemplate.pages = [];
        }
        if (healedTemplate.pages.length === 0) {
            healedTemplate.pages.push({
                id: (0, uuid_1.v4)(),
                name: 'Page 1',
                elements: []
            });
        }
        else {
            // Ensure each existing page has required fields
            healedTemplate.pages = healedTemplate.pages.map((page, index) => ({
                id: page.id || (0, uuid_1.v4)(),
                name: page.name || `Page ${index + 1}`,
                elements: Array.isArray(page.elements) ? page.elements : []
            }));
        }
        return healedTemplate;
    }
    /**
     * Convert to persistence format
     */
    toPersistence() {
        return {
            id: this.id,
            organizationId: this.organizationId,
            name: this.name,
            description: this.description,
            version: this.version,
            status: this.status,
            template: this.template,
            settings: this.settings,
            createdBy: this.createdBy,
            updatedBy: this.updatedBy,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            publishedAt: this.publishedAt
        };
    }
}
exports.MenuDomain = MenuDomain;
// Types
var MenuStatus;
(function (MenuStatus) {
    MenuStatus["DRAFT"] = "draft";
    MenuStatus["PUBLISHED"] = "published";
    MenuStatus["ARCHIVED"] = "archived";
})(MenuStatus || (exports.MenuStatus = MenuStatus = {}));
// Custom Errors
class MenuValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'MenuValidationError';
    }
}
exports.MenuValidationError = MenuValidationError;
class MenuBusinessError extends Error {
    constructor(message) {
        super(message);
        this.name = 'MenuBusinessError';
    }
}
exports.MenuBusinessError = MenuBusinessError;
//# sourceMappingURL=MenuDomain.js.map