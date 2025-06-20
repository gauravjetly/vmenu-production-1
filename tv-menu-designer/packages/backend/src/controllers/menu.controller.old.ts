import { Request, Response } from 'express';
import { menuService } from '../services/menuService';
import { AuthRequest } from '../middleware/auth';
import { logger } from '../utils/logger';

export async function getMenus(req: AuthRequest, res: Response) {
  try {
    const organizationId = req.user?.organizationId || '';
    const menus = await menuService.getMenus(organizationId);
    
    res.json({
      success: true,
      data: menus
    });
  } catch (error) {
    logger.error('Get menus error:', error);
    throw error;
  }
}

export async function getMenuById(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const organizationId = req.user?.organizationId || '';
    const menu = await menuService.getMenuById(id, organizationId);
    
    res.json({
      success: true,
      data: menu
    });
  } catch (error) {
    logger.error('Get menu error:', error);
    throw error;
  }
}

export async function createMenu(req: AuthRequest, res: Response) {
  try {
    const { name, description, template } = req.body;
    const organizationId = req.user?.organizationId || '';
    const userId = req.user?.id || '';

    const menu = await menuService.createMenu({
      organizationId,
      name,
      description,
      template,
      createdBy: userId
    });

    res.status(201).json({
      success: true,
      data: menu
    });
  } catch (error) {
    logger.error('Create menu error:', error);
    throw error;
  }
}

export async function updateMenu(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const { name, description, template } = req.body;
    const organizationId = req.user?.organizationId || '';
    const userId = req.user?.id || '';

    const menu = await menuService.updateMenu(id, organizationId, {
      name,
      description,
      template,
      updatedBy: userId
    });

    res.json({
      success: true,
      data: menu
    });
  } catch (error) {
    logger.error('Update menu error:', error);
    throw error;
  }
}

export async function publishMenu(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const organizationId = req.user?.organizationId || '';
    const userId = req.user?.id || '';

    const menu = await menuService.publishMenu(id, organizationId, userId);

    res.json({
      success: true,
      data: menu
    });
  } catch (error) {
    logger.error('Publish menu error:', error);
    throw error;
  }
}

export async function deleteMenu(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const organizationId = req.user?.organizationId || '';

    await menuService.deleteMenu(id, organizationId);

    res.json({
      success: true,
      message: 'Menu deleted successfully'
    });
  } catch (error) {
    logger.error('Delete menu error:', error);
    throw error;
  }
}

// Public endpoint for TV display
export async function getPublishedMenu(req: Request, res: Response) {
  try {
    const { id } = req.params;
    
    // For MVP, just get the menu without auth
    const menu = await menuService.getMenuById(id, '');
    
    if (menu.status !== 'published') {
      return res.status(404).json({
        success: false,
        message: 'Menu not published'
      });
    }

    res.json({
      success: true,
      data: menu
    });
  } catch (error) {
    logger.error('Get published menu error:', error);
    throw error;
  }
}