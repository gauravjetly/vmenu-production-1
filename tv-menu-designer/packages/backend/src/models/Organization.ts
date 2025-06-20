import { Model, snakeCaseMappers } from 'objection';

export class Organization extends Model {
  static tableName = 'organizations';

  id!: string;
  name!: string;
  slug!: string;
  description?: string;
  logo?: string;
  website?: string;
  status!: 'active' | 'inactive' | 'suspended' | 'trial';
  plan!: Record<string, any>;
  settings!: Record<string, any>;
  metadata?: Record<string, any>;
  limits!: Record<string, any>;
  trialEndsAt?: Date;
  deletedAt?: Date;
  createdAt!: Date;
  updatedAt!: Date;

  static get columnNameMappers() {
    return snakeCaseMappers();
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