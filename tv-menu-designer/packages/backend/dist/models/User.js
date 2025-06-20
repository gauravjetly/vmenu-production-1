"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const objection_1 = require("objection");
class User extends objection_1.Model {
    static tableName = 'users';
    id;
    email;
    username;
    passwordHash;
    firstName;
    lastName;
    role;
    status;
    organizationId;
    permissions;
    profile;
    metadata;
    createdAt;
    updatedAt;
    static get columnNameMappers() {
        return (0, objection_1.snakeCaseMappers)();
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['email', 'passwordHash', 'firstName', 'lastName', 'role'],
            properties: {
                id: { type: 'string', format: 'uuid' },
                email: { type: 'string', format: 'email' },
                username: { type: ['string', 'null'], minLength: 3, maxLength: 50 },
                passwordHash: { type: 'string' },
                firstName: { type: 'string', minLength: 1, maxLength: 50 },
                lastName: { type: 'string', minLength: 1, maxLength: 50 },
                role: {
                    type: 'string',
                    enum: ['super_admin', 'organization_owner', 'organization_admin', 'designer', 'viewer']
                },
                status: {
                    type: 'string',
                    enum: ['active', 'inactive', 'pending', 'suspended'],
                    default: 'active'
                },
                organizationId: { type: ['string', 'null'], format: 'uuid' },
                permissions: { type: 'array', items: { type: 'string' }, default: [] },
                profile: { type: 'object', default: {} },
                metadata: { type: 'object', default: {} }
            }
        };
    }
    $beforeInsert() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.status = this.status || 'active';
        this.permissions = this.permissions || [];
        this.profile = this.profile || {};
        this.metadata = this.metadata || {};
    }
    $beforeUpdate() {
        this.updatedAt = new Date();
    }
    // Don't return password hash in JSON
    $formatJson(json) {
        json = super.$formatJson(json);
        delete json.passwordHash;
        return json;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map