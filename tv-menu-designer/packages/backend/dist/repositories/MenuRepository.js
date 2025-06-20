"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuRepository = void 0;
const Menu_1 = require("../models/Menu");
const MenuDomain_1 = require("../domain/menu/MenuDomain");
/**
 * Menu Repository Implementation
 * Handles data persistence using Objection.js
 */
class MenuRepository {
    /**
     * Find menu by ID
     */
    async findById(id, organizationId) {
        let query = Menu_1.Menu.query().findById(id);
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
    async findByOrganization(organizationId) {
        const menus = await Menu_1.Menu.query()
            .where('organization_id', organizationId)
            .orderBy('updated_at', 'desc');
        return menus.map(menu => this.toDomain(menu));
    }
    /**
     * Save menu (insert or update)
     */
    async save(menu, trx) {
        const data = menu.toPersistence();
        const exists = await this.exists(data.id, data.organizationId);
        if (exists) {
            await Menu_1.Menu.query(trx)
                .findById(data.id)
                .patch({
                name: data.name,
                description: data.description,
                template: data.template,
                settings: data.settings,
                status: data.status,
                updatedBy: data.updatedBy,
                updatedAt: data.updatedAt,
                publishedAt: data.publishedAt
            });
        }
        else {
            await Menu_1.Menu.query(trx).insert({
                id: data.id,
                organizationId: data.organizationId,
                name: data.name,
                description: data.description,
                version: data.version,
                status: data.status,
                template: data.template,
                settings: data.settings,
                createdBy: data.createdBy,
                updatedBy: data.updatedBy,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
                publishedAt: data.publishedAt
            });
        }
    }
    /**
     * Delete menu
     */
    async delete(id, organizationId, trx) {
        const deleted = await Menu_1.Menu.query(trx)
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
    async exists(id, organizationId) {
        const result = await Menu_1.Menu.query()
            .where('id', id)
            .where('organization_id', organizationId)
            .resultSize();
        return result > 0;
    }
    /**
     * Convert database model to domain entity
     */
    toDomain(menu) {
        return MenuDomain_1.MenuDomain.fromPersistence({
            id: menu.id,
            organizationId: menu.organizationId,
            name: menu.name,
            description: menu.description,
            version: menu.version,
            status: menu.status,
            template: menu.template,
            settings: menu.settings,
            createdBy: menu.createdBy,
            updatedBy: menu.updatedBy,
            createdAt: menu.createdAt,
            updatedAt: menu.updatedAt,
            publishedAt: menu.publishedAt
        });
    }
}
exports.MenuRepository = MenuRepository;
//# sourceMappingURL=MenuRepository.js.map