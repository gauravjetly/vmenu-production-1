import { IMenuRepository } from '../../repositories/MenuRepository';
import { MenuDomain, CreateMenuParams } from '../../domain/menu/MenuDomain';
import { ILogger } from '../../utils/ILogger';
import { ValidationError } from '../../errors/ApplicationErrors';
import { sanitizeInput } from '../../utils/sanitizer';

/**
 * Create Menu Use Case
 * Orchestrates the creation of a new menu
 */
export class CreateMenuUseCase {
  constructor(
    private readonly menuRepository: IMenuRepository,
    private readonly logger: ILogger
  ) {}

  async execute(params: CreateMenuRequest): Promise<CreateMenuResponse> {
    this.logger.info('Creating new menu', { 
      organizationId: params.organizationId,
      name: params.name 
    });

    try {
      // Validate and sanitize inputs
      const sanitizedParams = this.validateAndSanitize(params);

      // Create domain entity
      const menu = MenuDomain.create({
        organizationId: sanitizedParams.organizationId,
        name: sanitizedParams.name,
        description: sanitizedParams.description,
        template: sanitizedParams.template,
        settings: sanitizedParams.settings,
        createdBy: sanitizedParams.userId
      });

      // Persist to database
      await this.menuRepository.save(menu);

      this.logger.info('Menu created successfully', { 
        menuId: menu.id,
        organizationId: menu.organizationId 
      });

      return {
        id: menu.id,
        name: menu.name,
        description: menu.description,
        status: menu.status,
        createdAt: menu.createdAt
      };
    } catch (error) {
      this.logger.error('Failed to create menu', error as Error, {
        organizationId: params.organizationId,
        name: params.name
      });
      throw error;
    }
  }

  private validateAndSanitize(params: CreateMenuRequest): SanitizedCreateMenuParams {
    // Validate required fields
    if (!params.organizationId || !params.userId) {
      throw new ValidationError('Organization ID and User ID are required');
    }

    if (!params.name || params.name.trim().length === 0) {
      throw new ValidationError('Menu name is required');
    }

    // Sanitize inputs to prevent XSS
    return {
      organizationId: params.organizationId,
      userId: params.userId,
      name: sanitizeInput(params.name),
      description: params.description ? sanitizeInput(params.description) : undefined,
      template: params.template,
      settings: params.settings
    };
  }
}

// Request/Response DTOs
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

interface SanitizedCreateMenuParams extends CreateMenuRequest {
  name: string;
  description?: string;
}