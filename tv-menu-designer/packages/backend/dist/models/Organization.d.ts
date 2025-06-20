import { Model } from 'objection';
export declare class Organization extends Model {
    static tableName: string;
    id: string;
    name: string;
    slug: string;
    description?: string;
    logo?: string;
    website?: string;
    status: 'active' | 'inactive' | 'suspended' | 'trial';
    plan: Record<string, any>;
    settings: Record<string, any>;
    metadata?: Record<string, any>;
    limits: Record<string, any>;
    trialEndsAt?: Date;
    deletedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    static get columnNameMappers(): import("objection").ColumnNameMappers;
    static get jsonSchema(): {
        type: string;
        required: string[];
        properties: {
            id: {
                type: string;
                format: string;
            };
            name: {
                type: string;
                minLength: number;
                maxLength: number;
            };
            slug: {
                type: string;
                minLength: number;
                maxLength: number;
            };
            description: {
                type: string[];
            };
            logo: {
                type: string[];
            };
            website: {
                type: string[];
            };
            status: {
                type: string;
                enum: string[];
                default: string;
            };
            plan: {
                type: string;
            };
            settings: {
                type: string;
                default: {};
            };
            metadata: {
                type: string[];
            };
            limits: {
                type: string;
            };
            trialEndsAt: {
                type: string[];
                format: string;
            };
            deletedAt: {
                type: string[];
                format: string;
            };
        };
    };
    $beforeInsert(): void;
    $beforeUpdate(): void;
}
//# sourceMappingURL=Organization.d.ts.map