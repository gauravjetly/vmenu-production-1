import { IMenuRepository } from '../../repositories/MenuRepository';
import { ILogger } from '../../utils/ILogger';
import { MenuDomain } from '../../domain/menu/MenuDomain';

/**
 * Get Menus Use Case
 * Retrieves menus for an organization
 */
export class GetMenusUseCase {
  constructor(
    private readonly menuRepository: IMenuRepository,
    private readonly logger: ILogger
  ) {}

  async execute(params: GetMenusRequest): Promise<GetMenusResponse> {
    this.logger.info('Fetching menus', { 
      organizationId: params.organizationId 
    });

    try {
      const menus = await this.menuRepository.findByOrganization(params.organizationId);

      const menuDtos = menus.map(menu => this.toDto(menu));

      this.logger.info('Menus fetched successfully', { 
        organizationId: params.organizationId,
        count: menuDtos.length 
      });

      return {
        menus: menuDtos,
        total: menuDtos.length
      };
    } catch (error) {
      this.logger.error('Failed to fetch menus', error as Error, {
        organizationId: params.organizationId
      });
      throw error;
    }
  }

  private toDto(menu: MenuDomain): MenuDto {
    return {
      id: menu.id,
      name: menu.name,
      description: menu.description,
      status: menu.status,
      template: menu.template,
      settings: menu.settings,
      createdAt: menu.createdAt,
      updatedAt: menu.updatedAt,
      publishedAt: menu.publishedAt
    };
  }
}

// Request/Response DTOs
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