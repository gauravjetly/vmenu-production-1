import { Model } from 'objection';
export declare class User extends Model {
    static tableName: string;
    id: string;
    email: string;
    username?: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role: 'super_admin' | 'organization_owner' | 'organization_admin' | 'designer' | 'viewer';
    status: 'active' | 'inactive' | 'pending' | 'suspended';
    organizationId?: string;
    permissions: string[];
    profile: Record<string, any>;
    metadata: Record<string, any>;
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
            email: {
                type: string;
                format: string;
            };
            username: {
                type: string[];
                minLength: number;
                maxLength: number;
            };
            passwordHash: {
                type: string;
            };
            firstName: {
                type: string;
                minLength: number;
                maxLength: number;
            };
            lastName: {
                type: string;
                minLength: number;
                maxLength: number;
            };
            role: {
                type: string;
                enum: string[];
            };
            status: {
                type: string;
                enum: string[];
                default: string;
            };
            organizationId: {
                type: string[];
                format: string;
            };
            permissions: {
                type: string;
                items: {
                    type: string;
                };
                default: never[];
            };
            profile: {
                type: string;
                default: {};
            };
            metadata: {
                type: string;
                default: {};
            };
        };
    };
    $beforeInsert(): void;
    $beforeUpdate(): void;
    $formatJson(json: any): any;
}
//# sourceMappingURL=User.d.ts.map