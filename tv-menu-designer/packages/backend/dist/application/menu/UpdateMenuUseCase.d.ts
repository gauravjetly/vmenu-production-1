import { IMenuRepository } from '../../repositories/MenuRepository';
import { ILogger } from '../../utils/ILogger';
/**
 * Update Menu Use Case
 * Handles menu updates with proper validation and authorization
 */
export declare class UpdateMenuUseCase {
    private readonly menuRepository;
    private readonly logger;
    constructor(menuRepository: IMenuRepository, logger: ILogger);
    execute(params: UpdateMenuRequest): Promise<UpdateMenuResponse>;
    private validateRequest;
    private validateTemplate;
    private sanitizeInputs;
}
export interface UpdateMenuRequest {
    menuId: string;
    organizationId: string;
    userId: string;
    name?: string;
    description?: string;
    template?: any;
    settings?: any;
}
export interface UpdateMenuResponse {
    id: string;
    name: string;
    description?: string;
    status: string;
    updatedAt: Date;
}
//# sourceMappingURL=UpdateMenuUseCase.d.ts.map