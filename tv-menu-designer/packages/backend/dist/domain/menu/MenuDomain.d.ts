import { MenuTemplate } from '@tv-menu-designer/shared';
/**
 * Menu Domain Entity
 * Encapsulates business logic and invariants for menus
 */
export declare class MenuDomain {
    readonly id: string;
    readonly organizationId: string;
    name: string;
    description: string | undefined;
    version: string;
    status: MenuStatus;
    template: MenuTemplate;
    settings: MenuSettings;
    readonly createdBy: string;
    updatedBy: string;
    readonly createdAt: Date;
    updatedAt: Date;
    publishedAt: Date | undefined;
    private constructor();
    /**
     * Factory method to create a new menu
     */
    static create(params: CreateMenuParams): MenuDomain;
    /**
     * Factory method to reconstitute from persistence
     */
    static fromPersistence(data: MenuPersistenceData): MenuDomain;
    /**
     * Update menu properties
     */
    update(params: UpdateMenuParams): void;
    /**
     * Publish the menu
     */
    publish(userId: string): void;
    /**
     * Unpublish the menu
     */
    unpublish(userId: string): void;
    /**
     * Archive the menu
     */
    archive(userId: string): void;
    /**
     * Restore archived menu
     */
    restore(userId: string): void;
    /**
     * Validate template structure
     */
    private validateTemplate;
    /**
     * Create default template
     */
    private static createDefaultTemplate;
    /**
     * Heal template to ensure it has valid structure and pages
     */
    private static healTemplate;
    /**
     * Convert to persistence format
     */
    toPersistence(): MenuPersistenceData;
}
export declare enum MenuStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
    ARCHIVED = "archived"
}
export interface MenuSettings {
    autoPlay?: boolean;
    transitionDuration?: number;
    loop?: boolean;
}
export interface CreateMenuParams {
    organizationId: string;
    name: string;
    description?: string;
    template?: MenuTemplate;
    settings?: MenuSettings;
    createdBy: string;
}
export interface UpdateMenuParams {
    name?: string;
    description?: string;
    template?: MenuTemplate;
    settings?: MenuSettings;
    updatedBy: string;
}
export interface MenuPersistenceData {
    id: string;
    organizationId: string;
    name: string;
    description?: string;
    version: string;
    status: string;
    template: MenuTemplate;
    settings: MenuSettings;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
}
export declare class MenuValidationError extends Error {
    constructor(message: string);
}
export declare class MenuBusinessError extends Error {
    constructor(message: string);
}
//# sourceMappingURL=MenuDomain.d.ts.map