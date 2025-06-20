import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types/auth';
import { 
  getCreateMenuUseCase, 
  getGetMenusUseCase, 
  getUpdateMenuUseCase,
  getLogger 
} from '../container/DIContainer';
import { ApplicationError } from '../errors/ApplicationErrors';

const logger = getLogger();

/**
 * Refactored Menu Controller
 * Uses clean architecture with use cases
 */

export async function getMenus(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const useCase = getGetMenusUseCase();
    const result = await useCase.execute({
      organizationId: req.user!.organizationId!,
      userId: req.user!.id
    });

    res.json({
      success: true,
      data: result.menus,
      meta: {
        total: result.total
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function getMenuById(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    // TODO: Create GetMenuByIdUseCase
    const { id } = req.params;
    
    // For now, using the repository directly
    const menuRepository = await import('../repositories/MenuRepository');
    const repo = new menuRepository.MenuRepository();
    const menu = await repo.findById(id, req.user!.organizationId);
    
    if (!menu) {
      return res.status(404).json({
        success: false,
        error: 'Menu not found'
      });
    }

    res.json({
      success: true,
      data: menu.toPersistence()
    });
  } catch (error) {
    next(error);
  }
}

export async function createMenu(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const useCase = getCreateMenuUseCase();
    const result = await useCase.execute({
      organizationId: req.user!.organizationId!,
      userId: req.user!.id,
      name: req.body.name,
      description: req.body.description,
      template: req.body.template,
      settings: req.body.settings
    });

    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    if (error instanceof ApplicationError) {
      return res.status(error.statusCode).json({
        success: false,
        error: error.message,
        code: error.code
      });
    }
    next(error);
  }
}

export async function updateMenu(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const useCase = getUpdateMenuUseCase();
    const result = await useCase.execute({
      menuId: req.params.id,
      organizationId: req.user!.organizationId!,
      userId: req.user!.id,
      name: req.body.name,
      description: req.body.description,
      template: req.body.template,
      settings: req.body.settings
    });

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    if (error instanceof ApplicationError) {
      return res.status(error.statusCode).json({
        success: false,
        error: error.message,
        code: error.code
      });
    }
    next(error);
  }
}

export async function publishMenu(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    
    // TODO: Create PublishMenuUseCase
    const menuRepository = await import('../repositories/MenuRepository');
    const repo = new menuRepository.MenuRepository();
    const menu = await repo.findById(id, req.user!.organizationId);
    
    if (!menu) {
      return res.status(404).json({
        success: false,
        error: 'Menu not found'
      });
    }

    try {
      menu.publish(req.user!.id);
      await repo.save(menu);
    } catch (publishError: any) {
      logger.error(`Failed to publish menu ${id}. Template has ${menu.template.pages?.length || 0} pages`, publishError);
      throw publishError;
    }

    res.json({
      success: true,
      data: {
        id: menu.id,
        status: menu.status,
        publishedAt: menu.publishedAt
      }
    });
  } catch (error) {
    if (error instanceof ApplicationError) {
      return res.status(error.statusCode).json({
        success: false,
        error: error.message,
        code: error.code
      });
    }
    // Return detailed error for any other errors
    return res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to publish menu',
      details: error instanceof Error ? error.stack : undefined
    });
  }
}

export async function deleteMenu(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    
    // TODO: Create DeleteMenuUseCase
    const menuRepository = await import('../repositories/MenuRepository');
    const repo = new menuRepository.MenuRepository();
    
    await repo.delete(id, req.user!.organizationId!);

    res.json({
      success: true,
      message: 'Menu deleted successfully'
    });
  } catch (error) {
    next(error);
  }
}

export async function getPublishedMenu(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    
    // TODO: Create GetPublishedMenuUseCase
    const menuRepository = await import('../repositories/MenuRepository');
    const repo = new menuRepository.MenuRepository();
    const menu = await repo.findById(id);
    
    if (!menu) {
      return res.status(404).json({
        success: false,
        error: 'Menu not found'
      });
    }

    if (menu.status !== 'published') {
      return res.status(403).json({
        success: false,
        error: 'Menu is not published'
      });
    }

    res.json({
      success: true,
      data: menu.toPersistence()
    });
  } catch (error) {
    next(error);
  }
}