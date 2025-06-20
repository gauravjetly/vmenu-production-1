import { IMenuRepository } from '../../repositories/MenuRepository';
import { ILogger } from '../../utils/ILogger';
/**
 * Create Menu Use Case
 * Orchestrates the creation of a new menu
 */
export declare class CreateMenuUseCase {
    private readonly menuRepository;
    private readonly logger;
    constructor(menuRepository: IMenuRepository, logger: ILogger);
    execute(params: CreateMenuRequest): Promise<CreateMenuResponse>;
    private validateAndSanitize;
}
export interface CreateMenuRequest {
    organizationId: string;
    userId: string;
    name: string;
    description?: string;
    template?: any;
    settings?: any;
}
export interface CreateMenuResponse {
    id: string;
    name: string;
    description?: string;
    status: string;
    createdAt: Date;
}
//# sourceMappingURL=CreateMenuUseCase.d.ts.map