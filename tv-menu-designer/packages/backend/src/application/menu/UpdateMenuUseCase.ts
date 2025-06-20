import { IMenuRepository } from '../../repositories/MenuRepository';
import { ILogger } from '../../utils/ILogger';
import { ValidationError, NotFoundError, UnauthorizedError } from '../../errors/ApplicationErrors';
import { sanitizeInput } from '../../utils/sanitizer';

/**
 * Update Menu Use Case
 * Handles menu updates with proper validation and authorization
 */
export class UpdateMenuUseCase {
  constructor(
    private readonly menuRepository: IMenuRepository,
    private readonly logger: ILogger
  ) {}

  async execute(params: UpdateMenuRequest): Promise<UpdateMenuResponse> {
    this.logger.info('Updating menu', { 
      menuId: params.menuId,
      organizationId: params.organizationId 
    });

    try {
      // Validate inputs
      this.validateRequest(params);

      // Fetch existing menu
      const menu = await this.menuRepository.findById(params.menuId, params.organizationId);
      
      if (!menu) {
        throw new NotFoundError('Menu not found');
      }

      // Sanitize inputs
      const sanitizedParams = this.sanitizeInputs(params);

      // Update domain entity
      menu.update({
        name: sanitizedParams.name,
        description: sanitizedParams.description,
        template: sanitizedParams.template,
        settings: sanitizedParams.settings,
        updatedBy: params.userId
      });

      // Persist changes
      await this.menuRepository.save(menu);

      this.logger.info('Menu updated successfully', { 
        menuId: menu.id,
        organizationId: menu.organizationId 
      });

      return {
        id: menu.id,
        name: menu.name,
        description: menu.description,
        status: menu.status,
        updatedAt: menu.updatedAt
      };
    } catch (error) {
      this.logger.error('Failed to update menu', error as Error, {
        menuId: params.menuId,
        organizationId: params.organizationId
      });
      throw error;
    }
  }

  private validateRequest(params: UpdateMenuRequest): void {
    if (!params.menuId || !params.organizationId || !params.userId) {
      throw new ValidationError('Menu ID, Organization ID, and User ID are required');
    }

    // At least one field must be provided for update
    if (!params.name && params.description === undefined && !params.template && !params.settings) {
      throw new ValidationError('No fields provided for update');
    }

    // Validate template if provided
    if (params.template) {
      this.validateTemplate(params.template);
    }
  }

  private validateTemplate(template: any): void {
    if (!template.id || !template.version) {
      throw new ValidationError('Invalid template structure: missing id or version');
    }

    if (!template.settings?.canvas) {
      throw new ValidationError('Template must have canvas settings');
    }

    // Ensure template has at least one page
    if (!template.pages || !Array.isArray(template.pages) || template.pages.length === 0) {
      throw new ValidationError('Template must have at least one page');
    }

    // Validate each page has required properties
    template.pages.forEach((page: any, index: number) => {
      if (!page.id) {
        throw new ValidationError(`Page at index ${index} is missing an id`);
      }
      if (!page.name) {
        throw new ValidationError(`Page at index ${index} is missing a name`);
      }
      if (!Array.isArray(page.elements)) {
        throw new ValidationError(`Page at index ${index} must have an elements array`);
      }
    });
  }

  private sanitizeInputs(params: UpdateMenuRequest): SanitizedUpdateParams {
    return {
      name: params.name ? sanitizeInput(params.name) : undefined,
      description: params.description !== undefined ? 
        (params.description ? sanitizeInput(params.description) : undefined) : 
        undefined,
      template: params.template,
      settings: params.settings
    };
  }
}

// Request/Response DTOs
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

interface SanitizedUpdateParams {
  name?: string;
  description?: string;
  template?: any;
  settings?: any;
}