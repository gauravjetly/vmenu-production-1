import { Menu } from '../models/Menu';
import { MenuDomain, MenuPersistenceData } from '../domain/menu/MenuDomain';
import { Transaction } from 'objection';

/**
 * Menu Repository Interface
 * Defines the contract for menu data access
 */
export interface IMenuRepository {
  findById(id: string, organizationId?: string): Promise<MenuDomain | null>;
  findByOrganization(organizationId: string): Promise<MenuDomain[]>;
  save(menu: MenuDomain, trx?: Transaction): Promise<void>;
  delete(id: string, organizationId: string, trx?: Transaction): Promise<void>;
  exists(id: string, organizationId: string): Promise<boolean>;
}

/**
 * Menu Repository Implementation
 * Handles data persistence using Objection.js
 */
export class MenuRepository implements IMenuRepository {
  /**
   * Find menu by ID
   */
  async findById(id: string, organizationId?: string): Promise<MenuDomain | null> {
    let query = Menu.query().findById(id);
    
    if (organizationId) {
      query = query.where('organization_id', organizationId);
    }
    
    const menu = await query;
    
    if (!menu) {
      return null;
    }

    return this.toDomain(menu);
  }

  /**
   * Find all menus for an organization
   */
  async findByOrganization(organizationId: string): Promise<MenuDomain[]> {
    const menus = await Menu.query()
      .where('organization_id', organizationId)
      .orderBy('updated_at', 'desc');

    return menus.map(menu => this.toDomain(menu));
  }

  /**
   * Save menu (insert or update)
   */
  async save(menu: MenuDomain, trx?: Transaction): Promise<void> {
    const data = menu.toPersistence();
    const exists = await this.exists(data.id, data.organizationId);

    if (exists) {
      await Menu.query(trx)
        .findById(data.id)
        .patch({
          name: data.name,
          description: data.description,
          template: data.template,
          settings: data.settings,
          status: data.status as any,
          updatedBy: data.updatedBy,
          updatedAt: data.updatedAt,
          publishedAt: data.publishedAt
        });
    } else {
      await Menu.query(trx).insert({
        id: data.id,
        organizationId: data.organizationId,
        name: data.name,
        description: data.description,
        version: data.version,
        status: data.status as any,
        template: data.template,
        settings: data.settings,
        createdBy: data.createdBy,
        updatedBy: data.updatedBy,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        publishedAt: data.publishedAt
      } as any);
    }
  }

  /**
   * Delete menu
   */
  async delete(id: string, organizationId: string, trx?: Transaction): Promise<void> {
    const deleted = await Menu.query(trx)
      .where('id', id)
      .where('organization_id', organizationId)
      .delete();

    if (deleted === 0) {
      throw new Error('Menu not found or unauthorized');
    }
  }

  /**
   * Check if menu exists
   */
  async exists(id: string, organizationId: string): Promise<boolean> {
    const result = await Menu.query()
      .where('id', id)
      .where('organization_id', organizationId)
      .resultSize();

    return result > 0;
  }

  /**
   * Convert database model to domain entity
   */
  private toDomain(menu: Menu): MenuDomain {
    return MenuDomain.fromPersistence({
      id: menu.id,
      organizationId: menu.organizationId,
      name: menu.name,
      description: menu.description,
      version: menu.version,
      status: menu.status,
      template: menu.template,
      settings: menu.settings,
      createdBy: menu.createdBy!,
      updatedBy: menu.updatedBy!,
      createdAt: menu.createdAt,
      updatedAt: menu.updatedAt,
      publishedAt: menu.publishedAt
    });
  }
}