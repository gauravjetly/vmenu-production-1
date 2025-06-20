import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import * as menuController from '../controllers/menu.controller';

const router = Router();

// Protected routes
router.get('/', authenticate, menuController.getMenus);
router.post('/', authenticate, menuController.createMenu);
router.get('/:id', authenticate, menuController.getMenuById);
router.put('/:id', authenticate, menuController.updateMenu);
router.delete('/:id', authenticate, menuController.deleteMenu);
router.post('/:id/publish', authenticate, menuController.publishMenu);

// Public route for TV display
router.get('/:id/display', menuController.getPublishedMenu);

// TODO: Implement remaining routes
// - POST /api/menus/:id/items - Add item to menu
// - PUT /api/menus/:id/items/:itemId - Update menu item
// - DELETE /api/menus/:id/items/:itemId - Remove item from menu
// - GET /api/menus/:id/preview - Get menu preview

export { router as menuRoutes };