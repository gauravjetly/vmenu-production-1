import { Model } from 'objection';
import { MenuTemplate } from '@tv-menu-designer/shared';
export declare class Menu extends Model {
    static tableName: string;
    id: string;
    organizationId: string;
    name: string;
    description?: string;
    version: string;
    status: 'draft' | 'published' | 'archived';
    template: MenuTemplate;
    settings: Record<string, any>;
    createdBy?: string;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    static get columnNameMappers(): import("objection").ColumnNameMappers;
    static get jsonSchema(): {
        type: string;
        required: string[];
        properties: {
            id: {
                type: string;
                format: string;
            };
            organizationId: {
                type: string;
                format: string;
            };
            name: {
                type: string;
                minLength: number;
                maxLength: number;
            };
            description: {
                type: string[];
            };
            version: {
                type: string;
            };
            status: {
                type: string;
                enum: string[];
            };
            template: {
                type: string;
            };
            settings: {
                type: string;
            };
            createdBy: {
                type: string[];
                format: string;
            };
            updatedBy: {
                type: string[];
                format: string;
            };
            publishedAt: {
                type: string[];
                format: string;
            };
        };
    };
    $beforeInsert(): void;
    $beforeUpdate(): void;
}
//# sourceMappingURL=Menu.d.ts.map