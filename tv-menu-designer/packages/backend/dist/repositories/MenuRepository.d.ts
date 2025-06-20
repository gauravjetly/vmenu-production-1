import { MenuDomain } from '../domain/menu/MenuDomain';
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
export declare class MenuRepository implements IMenuRepository {
    /**
     * Find menu by ID
     */
    findById(id: string, organizationId?: string): Promise<MenuDomain | null>;
    /**
     * Find all menus for an organization
     */
    findByOrganization(organizationId: string): Promise<MenuDomain[]>;
    /**
     * Save menu (insert or update)
     */
    save(menu: MenuDomain, trx?: Transaction): Promise<void>;
    /**
     * Delete menu
     */
    delete(id: string, organizationId: string, trx?: Transaction): Promise<void>;
    /**
     * Check if menu exists
     */
    exists(id: string, organizationId: string): Promise<boolean>;
    /**
     * Convert database model to domain entity
     */
    private toDomain;
}
//# sourceMappingURL=MenuRepository.d.ts.map