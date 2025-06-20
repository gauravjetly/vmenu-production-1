import { IMenuRepository } from '../../repositories/MenuRepository';
import { ILogger } from '../../utils/ILogger';
/**
 * Get Menus Use Case
 * Retrieves menus for an organization
 */
export declare class GetMenusUseCase {
    private readonly menuRepository;
    private readonly logger;
    constructor(menuRepository: IMenuRepository, logger: ILogger);
    execute(params: GetMenusRequest): Promise<GetMenusResponse>;
    private toDto;
}
export interface GetMenusRequest {
    organizationId: string;
    userId: string;
}
export interface GetMenusResponse {
    menus: MenuDto[];
    total: number;
}
export interface MenuDto {
    id: string;
    name: string;
    description?: string;
    status: string;
    template: any;
    settings: any;
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
}
//# sourceMappingURL=GetMenusUseCase.d.ts.map