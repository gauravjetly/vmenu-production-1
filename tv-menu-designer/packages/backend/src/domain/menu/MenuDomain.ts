import { MenuTemplate } from '@tv-menu-designer/shared';
import { v4 as uuidv4 } from 'uuid';

/**
 * Menu Domain Entity
 * Encapsulates business logic and invariants for menus
 */
export class MenuDomain {
  private constructor(
    public readonly id: string,
    public readonly organizationId: string,
    public name: string,
    public description: string | undefined,
    public version: string,
    public status: MenuStatus,
    public template: MenuTemplate,
    public settings: MenuSettings,
    public readonly createdBy: string,
    public updatedBy: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public publishedAt: Date | undefined
  ) {}

  /**
   * Factory method to create a new menu
   */
  static create(params: CreateMenuParams): MenuDomain {
    // Validate business rules
    if (!params.name || params.name.trim().length === 0) {
      throw new MenuValidationError('Menu name is required');
    }

    if (params.name.length > 100) {
      throw new MenuValidationError('Menu name must be less than 100 characters');
    }

    const id = uuidv4();
    const now = new Date();
    
    const defaultTemplate = MenuDomain.createDefaultTemplate(params.name, params.description);

    return new MenuDomain(
      id,
      params.organizationId,
      params.name.trim(),
      params.description?.trim(),
      '1.0.0',
      MenuStatus.DRAFT,
      params.template || defaultTemplate,
      params.settings || {},
      params.createdBy,
      params.createdBy,
      now,
      now,
      undefined
    );
  }

  /**
   * Factory method to reconstitute from persistence
   */
  static fromPersistence(data: MenuPersistenceData): MenuDomain {
    // Heal template to ensure it always has pages
    const healedTemplate = MenuDomain.healTemplate(data.template);
    
    return new MenuDomain(
      data.id,
      data.organizationId,
      data.name,
      data.description,
      data.version,
      data.status as MenuStatus,
      healedTemplate,
      data.settings,
      data.createdBy,
      data.updatedBy,
      data.createdAt,
      data.updatedAt,
      data.publishedAt
    );
  }

  /**
   * Update menu properties
   */
  update(params: UpdateMenuParams): void {
    if (params.name !== undefined) {
      if (!params.name || params.name.trim().length === 0) {
        throw new MenuValidationError('Menu name cannot be empty');
      }
      if (params.name.length > 100) {
        throw new MenuValidationError('Menu name must be less than 100 characters');
      }
      this.name = params.name.trim();
    }

    if (params.description !== undefined) {
      this.description = params.description?.trim();
    }

    if (params.template !== undefined) {
      this.validateTemplate(params.template);
      this.template = params.template;
    }

    if (params.settings !== undefined) {
      this.settings = params.settings;
    }

    this.updatedBy = params.updatedBy;
    this.updatedAt = new Date();
  }

  /**
   * Publish the menu
   */
  publish(userId: string): void {
    if (this.status === MenuStatus.PUBLISHED) {
      throw new MenuBusinessError('Menu is already published');
    }

    if (!this.template.pages || this.template.pages.length === 0) {
      throw new MenuBusinessError('Cannot publish menu without any pages');
    }

    this.status = MenuStatus.PUBLISHED;
    this.publishedAt = new Date();
    this.updatedBy = userId;
    this.updatedAt = new Date();
  }

  /**
   * Unpublish the menu
   */
  unpublish(userId: string): void {
    if (this.status !== MenuStatus.PUBLISHED) {
      throw new MenuBusinessError('Menu is not published');
    }

    this.status = MenuStatus.DRAFT;
    this.updatedBy = userId;
    this.updatedAt = new Date();
  }

  /**
   * Archive the menu
   */
  archive(userId: string): void {
    if (this.status === MenuStatus.ARCHIVED) {
      throw new MenuBusinessError('Menu is already archived');
    }

    this.status = MenuStatus.ARCHIVED;
    this.updatedBy = userId;
    this.updatedAt = new Date();
  }

  /**
   * Restore archived menu
   */
  restore(userId: string): void {
    if (this.status !== MenuStatus.ARCHIVED) {
      throw new MenuBusinessError('Menu is not archived');
    }

    this.status = MenuStatus.DRAFT;
    this.updatedBy = userId;
    this.updatedAt = new Date();
  }

  /**
   * Validate template structure
   */
  private validateTemplate(template: MenuTemplate): void {
    if (!template.id || !template.version) {
      throw new MenuValidationError('Invalid template structure');
    }

    if (!template.settings?.canvas) {
      throw new MenuValidationError('Template must have canvas settings');
    }

    if (!template.pages || template.pages.length === 0) {
      throw new MenuValidationError('Template must have at least one page');
    }
  }

  /**
   * Create default template
   */
  private static createDefaultTemplate(name: string, description?: string): MenuTemplate {
    return {
      id: uuidv4(),
      version: '1.0.0',
      metadata: {
        name,
        description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: [],
      },
      settings: {
        canvas: {
          width: 1920,
          height: 1080,
          backgroundColor: '#ffffff',
          aspectRatio: '16:9'
        }
      },
      pages: [{
        id: uuidv4(),
        name: 'Page 1',
        elements: []
      }]
    };
  }

  /**
   * Heal template to ensure it has valid structure and pages
   */
  private static healTemplate(template: MenuTemplate): MenuTemplate {
    // Create a deep copy to avoid mutating the original
    const healedTemplate = JSON.parse(JSON.stringify(template)) as MenuTemplate;

    // Ensure template has required fields
    if (!healedTemplate.id) {
      healedTemplate.id = uuidv4();
    }

    if (!healedTemplate.version) {
      healedTemplate.version = '1.0.0';
    }

    // Ensure metadata exists
    if (!healedTemplate.metadata) {
      healedTemplate.metadata = {
        name: 'Healed Template',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: []
      };
    }

    // Ensure settings exist with canvas
    if (!healedTemplate.settings) {
      healedTemplate.settings = {
        canvas: {
          width: 1920,
          height: 1080,
          backgroundColor: '#ffffff',
          aspectRatio: '16:9'
        }
      };
    } else if (!healedTemplate.settings.canvas) {
      healedTemplate.settings.canvas = {
        width: 1920,
        height: 1080,
        backgroundColor: '#ffffff',
        aspectRatio: '16:9'
      };
    }

    // Most importantly: ensure pages array exists and has at least one page
    if (!healedTemplate.pages || !Array.isArray(healedTemplate.pages)) {
      healedTemplate.pages = [];
    }

    if (healedTemplate.pages.length === 0) {
      healedTemplate.pages.push({
        id: uuidv4(),
        name: 'Page 1',
        elements: []
      });
    } else {
      // Ensure each existing page has required fields
      healedTemplate.pages = healedTemplate.pages.map((page, index) => ({
        id: page.id || uuidv4(),
        name: page.name || `Page ${index + 1}`,
        elements: Array.isArray(page.elements) ? page.elements : []
      }));
    }

    return healedTemplate;
  }

  /**
   * Convert to persistence format
   */
  toPersistence(): MenuPersistenceData {
    return {
      id: this.id,
      organizationId: this.organizationId,
      name: this.name,
      description: this.description,
      version: this.version,
      status: this.status,
      template: this.template,
      settings: this.settings,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      publishedAt: this.publishedAt
    };
  }
}

// Types
export enum MenuStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
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

// Custom Errors
export class MenuValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MenuValidationError';
  }
}

export class MenuBusinessError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MenuBusinessError';
  }
}