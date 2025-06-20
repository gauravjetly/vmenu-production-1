import { Model, snakeCaseMappers } from 'objection';
import { MenuTemplate } from '@tv-menu-designer/shared';

export class Menu extends Model {
  static tableName = 'menus';

  id!: string;
  organizationId!: string;
  name!: string;
  description?: string;
  version!: string;
  status!: 'draft' | 'published' | 'archived';
  template!: MenuTemplate;
  settings!: Record<string, any>;
  createdBy?: string;
  updatedBy?: string;
  createdAt!: Date;
  updatedAt!: Date;
  publishedAt?: Date;

  static get columnNameMappers() {
    return snakeCaseMappers();
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
        createdAt: { type: 'object' },
        updatedAt: { type: 'object' },
        publishedAt: { type: ['object', 'null'] }
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