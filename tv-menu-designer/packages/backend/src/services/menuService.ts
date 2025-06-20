import { Menu } from '../models/Menu';
import { MenuTemplate } from '@tv-menu-designer/shared';
import { v4 as uuidv4 } from 'uuid';
import { AppError } from '../middleware/errorHandler';

export class MenuService {
  async createMenu(data: {
    organizationId: string;
    name: string;
    description?: string;
    template?: MenuTemplate;
    createdBy: string;
  }) {
    // Create default template if not provided
    const defaultTemplate: MenuTemplate = {
      id: uuidv4(),
      version: '1.0.0',
      metadata: {
        name: data.name,
        description: data.description,
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

    const menu = await Menu.query().insert({
      id: uuidv4(),
      organizationId: data.organizationId,
      name: data.name,
      description: data.description,
      version: '1.0.0',
      template: data.template || defaultTemplate,
      settings: {},
      createdBy: data.createdBy,
      updatedBy: data.createdBy
    });

    return menu;
  }

  async getMenus(organizationId: string) {
    return Menu.query()
      .where('organizationId', organizationId)
      .orderBy('updatedAt', 'desc');
  }

  async getMenuById(id: string, organizationId?: string) {
    let query = Menu.query().findById(id);
    
    if (organizationId) {
      query = query.where('organizationId', organizationId);
    }
    
    const menu = await query;

    if (!menu) {
      throw new AppError('Menu not found', 404);
    }

    return menu;
  }

  async updateMenu(id: string, organizationId: string, data: {
    name?: string;
    description?: string;
    template?: MenuTemplate;
    updatedBy: string;
  }) {
    const menu = await Menu.query()
      .findById(id)
      .where('organizationId', organizationId);

    if (!menu) {
      throw new AppError('Menu not found', 404);
    }

    return menu.$query().patchAndFetch({
      ...data,
      updatedAt: new Date()
    });
  }

  async publishMenu(id: string, organizationId: string, userId: string) {
    const menu = await Menu.query()
      .findById(id)
      .where('organizationId', organizationId);

    if (!menu) {
      throw new AppError('Menu not found', 404);
    }

    return menu.$query().patchAndFetch({
      status: 'published',
      publishedAt: new Date(),
      updatedBy: userId
    });
  }

  async deleteMenu(id: string, organizationId: string) {
    const menu = await Menu.query()
      .findById(id)
      .where('organizationId', organizationId);

    if (!menu) {
      throw new AppError('Menu not found', 404);
    }

    await menu.$query().delete();
    return { success: true };
  }
}

export const menuService = new MenuService();