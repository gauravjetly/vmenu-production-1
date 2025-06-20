"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organization = void 0;
const objection_1 = require("objection");
class Organization extends objection_1.Model {
    static tableName = 'organizations';
    id;
    name;
    slug;
    description;
    logo;
    website;
    status;
    plan;
    settings;
    metadata;
    limits;
    trialEndsAt;
    deletedAt;
    createdAt;
    updatedAt;
    static get columnNameMappers() {
        return (0, objection_1.snakeCaseMappers)();
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'slug', 'plan', 'limits'],
            properties: {
                id: { type: 'string', format: 'uuid' },
                name: { type: 'string', minLength: 1, maxLength: 100 },
                slug: { type: 'string', minLength: 1, maxLength: 100 },
                description: { type: ['string', 'null'] },
                logo: { type: ['string', 'null'] },
                website: { type: ['string', 'null'] },
                status: {
                    type: 'string',
                    enum: ['active', 'inactive', 'suspended', 'trial'],
                    default: 'trial'
                },
                plan: { type: 'object' },
                settings: { type: 'object', default: {} },
                metadata: { type: ['object', 'null'] },
                limits: { type: 'object' },
                trialEndsAt: { type: ['string', 'null'], format: 'date-time' },
                deletedAt: { type: ['string', 'null'], format: 'date-time' }
            }
        };
    }
    $beforeInsert() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.status = this.status || 'trial';
        this.settings = this.settings || {};
    }
    $beforeUpdate() {
        this.updatedAt = new Date();
    }
}
exports.Organization = Organization;
//# sourceMappingURL=Organization.js.map