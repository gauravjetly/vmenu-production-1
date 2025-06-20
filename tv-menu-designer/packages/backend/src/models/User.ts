import { Model, snakeCaseMappers } from 'objection';

export class User extends Model {
  static tableName = 'users';

  id!: string;
  email!: string;
  username?: string;
  passwordHash!: string;
  firstName!: string;
  lastName!: string;
  role!: 'super_admin' | 'organization_owner' | 'organization_admin' | 'designer' | 'viewer';
  status!: 'active' | 'inactive' | 'pending' | 'suspended';
  organizationId?: string;
  permissions!: string[];
  profile!: Record<string, any>;
  metadata!: Record<string, any>;
  createdAt!: Date;
  updatedAt!: Date;

  static get columnNameMappers() {
    return snakeCaseMappers();
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
  $formatJson(json: any) {
    json = super.$formatJson(json);
    delete json.passwordHash;
    return json;
  }
}