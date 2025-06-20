import { Menu } from '../models/Menu';
import { MenuTemplate } from '@tv-menu-designer/shared';
export declare class MenuService {
    createMenu(data: {
        organizationId: string;
        name: string;
        description?: string;
        template?: MenuTemplate;
        createdBy: string;
    }): Promise<Menu>;
    getMenus(organizationId: string): Promise<Menu[]>;
    getMenuById(id: string, organizationId?: string): Promise<Menu>;
    updateMenu(id: string, organizationId: string, data: {
        name?: string;
        description?: string;
        template?: MenuTemplate;
        updatedBy: string;
    }): Promise<Menu>;
    publishMenu(id: string, organizationId: string, userId: string): Promise<Menu>;
    deleteMenu(id: string, organizationId: string): Promise<{
        success: boolean;
    }>;
}
export declare const menuService: MenuService;
//# sourceMappingURL=menuService.d.ts.map