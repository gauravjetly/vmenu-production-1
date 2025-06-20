"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const objection_1 = require("objection");
class Menu extends objection_1.Model {
    static tableName = 'menus';
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
    static get columnNameMappers() {
        return (0, objection_1.snakeCaseMappers)();
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['organizationId', 'name', 'version', 'template'],
            properties: {
                id: { type: 'string', format: 'uuid' },
                organizationId: { type: 'string', format: 'uuid' },
                name: { type: 'string', minLength: 1, maxLength: 100 },
                description: { type: ['string', 'null'] },
                version: { type: 'string' },
                status: { type: 'string', enum: ['draft', 'published', 'archived'] },
                template: { type: 'object' },
                settings: { type: 'object' },
                createdBy: { type: ['string', 'null'], format: 'uuid' },
                updatedBy: { type: ['string', 'null'], format: 'uuid' },
                publishedAt: { type: ['string', 'null'], format: 'date-time' }
            }
        };
    }
    $beforeInsert() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.version = '1.0.0';
        this.status = this.status || 'draft';
        this.settings = this.settings || {};
    }
    $beforeUpdate() {
        this.updatedAt = new Date();
    }
}
exports.Menu = Menu;
//# sourceMappingURL=Menu.js.map