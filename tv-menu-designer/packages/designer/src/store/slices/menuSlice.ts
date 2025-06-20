import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuTemplate, Page, Element } from '@tv-menu-designer/shared';

interface MenuState {
  currentMenu: MenuTemplate | null;
  currentPageId: string | null;
  unsavedChanges: boolean;
  loading: boolean;
  saving: boolean;
  error: string | null;
  templates: MenuTemplate[];
  recentMenus: MenuTemplate[];
}

const initialState: MenuState = {
  currentMenu: null,
  currentPageId: null,
  unsavedChanges: false,
  loading: false,
  saving: false,
  error: null,
  templates: [],
  recentMenus: [],
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    // Menu loading
    loadMenuStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loadMenuSuccess: (state, action: PayloadAction<MenuTemplate>) => {
      state.currentMenu = action.payload;
      state.currentPageId = action.payload.pages[0]?.id || null;
      state.loading = false;
      state.unsavedChanges = false;
    },
    loadMenuFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Menu saving
    saveMenuStart: (state) => {
      state.saving = true;
      state.error = null;
    },
    saveMenuSuccess: (state) => {
      state.saving = false;
      state.unsavedChanges = false;
    },
    saveMenuFailure: (state, action: PayloadAction<string>) => {
      state.saving = false;
      state.error = action.payload;
    },
    // Menu creation
    createNewMenu: (state, action: PayloadAction<MenuTemplate>) => {
      state.currentMenu = action.payload;
      state.currentPageId = action.payload.pages[0]?.id || null;
      state.unsavedChanges = false;
    },
    clearMenu: (state) => {
      state.currentMenu = null;
      state.currentPageId = null;
      state.unsavedChanges = false;
    },
    // Menu metadata
    updateMenuMetadata: (state, action: PayloadAction<Partial<MenuTemplate['metadata']>>) => {
      if (state.currentMenu) {
        state.currentMenu.metadata = {
          ...state.currentMenu.metadata,
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
        state.unsavedChanges = true;
      }
    },
    // Menu settings
    updateMenuSettings: (state, action: PayloadAction<Partial<MenuTemplate['settings']>>) => {
      if (state.currentMenu) {
        state.currentMenu.settings = {
          ...state.currentMenu.settings,
          ...action.payload,
        };
        state.unsavedChanges = true;
      }
    },
    updateCanvasSettings: (state, action: PayloadAction<Partial<MenuTemplate['settings']['canvas']>>) => {
      if (state.currentMenu) {
        state.currentMenu.settings.canvas = {
          ...state.currentMenu.settings.canvas,
          ...action.payload,
        };
        state.unsavedChanges = true;
      }
    },
    updateThemeSettings: (state, action: PayloadAction<Partial<MenuTemplate['settings']['theme']>>) => {
      if (state.currentMenu && state.currentMenu.settings.theme) {
        state.currentMenu.settings.theme = {
          ...state.currentMenu.settings.theme,
          ...action.payload,
        };
        state.unsavedChanges = true;
      }
    },
    // Page management
    setCurrentPage: (state, action: PayloadAction<string>) => {
      if (state.currentMenu?.pages.find(p => p.id === action.payload)) {
        state.currentPageId = action.payload;
      }
    },
    addPage: (state, action: PayloadAction<Page>) => {
      if (state.currentMenu) {
        state.currentMenu.pages.push(action.payload);
        state.unsavedChanges = true;
      }
    },
    updatePage: (state, action: PayloadAction<{ pageId: string; updates: Partial<Page> }>) => {
      if (state.currentMenu) {
        const pageIndex = state.currentMenu.pages.findIndex(p => p.id === action.payload.pageId);
        if (pageIndex !== -1) {
          state.currentMenu.pages[pageIndex] = {
            ...state.currentMenu.pages[pageIndex],
            ...action.payload.updates,
          };
          state.unsavedChanges = true;
        }
      }
    },
    deletePage: (state, action: PayloadAction<string>) => {
      if (state.currentMenu && state.currentMenu.pages.length > 1) {
        const pageIndex = state.currentMenu.pages.findIndex(p => p.id === action.payload);
        if (pageIndex !== -1) {
          state.currentMenu.pages.splice(pageIndex, 1);
          if (state.currentPageId === action.payload) {
            state.currentPageId = state.currentMenu.pages[0].id;
          }
          state.unsavedChanges = true;
        }
      }
    },
    reorderPages: (state, action: PayloadAction<{ oldIndex: number; newIndex: number }>) => {
      if (state.currentMenu) {
        const { oldIndex, newIndex } = action.payload;
        const [removed] = state.currentMenu.pages.splice(oldIndex, 1);
        state.currentMenu.pages.splice(newIndex, 0, removed);
        state.unsavedChanges = true;
      }
    },
    duplicatePage: (state, action: PayloadAction<string>) => {
      if (state.currentMenu) {
        const pageToDuplicate = state.currentMenu.pages.find(p => p.id === action.payload);
        if (pageToDuplicate) {
          const duplicatedPage: Page = {
            ...pageToDuplicate,
            id: crypto.randomUUID(),
            name: `${pageToDuplicate.name} (Copy)`,
            elements: pageToDuplicate.elements.map(element => ({
              ...element,
              id: crypto.randomUUID(),
            })),
          };
          const pageIndex = state.currentMenu.pages.findIndex(p => p.id === action.payload);
          state.currentMenu.pages.splice(pageIndex + 1, 0, duplicatedPage);
          state.unsavedChanges = true;
        }
      }
    },
    // Element management
    addElement: (state, action: PayloadAction<{ pageId: string; element: Element }>) => {
      if (state.currentMenu) {
        const page = state.currentMenu.pages.find(p => p.id === action.payload.pageId);
        if (page) {
          page.elements.push(action.payload.element);
          state.unsavedChanges = true;
        }
      }
    },
    updateElement: (state, action: PayloadAction<{ pageId: string; elementId: string; updates: Partial<Element> }>) => {
      if (state.currentMenu) {
        const page = state.currentMenu.pages.find(p => p.id === action.payload.pageId);
        if (page) {
          const elementIndex = page.elements.findIndex(e => e.id === action.payload.elementId);
          if (elementIndex !== -1) {
            page.elements[elementIndex] = {
              ...page.elements[elementIndex],
              ...action.payload.updates,
            } as Element;
            state.unsavedChanges = true;
          }
        }
      }
    },
    deleteElements: (state, action: PayloadAction<{ pageId: string; elementIds: string[] }>) => {
      if (state.currentMenu) {
        const page = state.currentMenu.pages.find(p => p.id === action.payload.pageId);
        if (page) {
          page.elements = page.elements.filter(e => !action.payload.elementIds.includes(e.id));
          state.unsavedChanges = true;
        }
      }
    },
    reorderElements: (state, action: PayloadAction<{ pageId: string; elementIds: string[]; direction: 'forward' | 'backward' | 'front' | 'back' }>) => {
      if (state.currentMenu) {
        const page = state.currentMenu.pages.find(p => p.id === action.payload.pageId);
        if (page) {
          const { elementIds, direction } = action.payload;
          const selectedElements = page.elements.filter(e => elementIds.includes(e.id));
          const otherElements = page.elements.filter(e => !elementIds.includes(e.id));
          
          switch (direction) {
            case 'front':
              page.elements = [...otherElements, ...selectedElements];
              break;
            case 'back':
              page.elements = [...selectedElements, ...otherElements];
              break;
            case 'forward':
            case 'backward':
              // These would require more complex logic based on current positions
              // For now, just mark as changed
              break;
          }
          state.unsavedChanges = true;
        }
      }
    },
    // Templates
    setTemplates: (state, action: PayloadAction<MenuTemplate[]>) => {
      state.templates = action.payload;
    },
    addToRecentMenus: (state, action: PayloadAction<MenuTemplate>) => {
      state.recentMenus = [
        action.payload,
        ...state.recentMenus.filter(m => m.id !== action.payload.id),
      ].slice(0, 10); // Keep only 10 most recent
    },
    // Error handling
    clearError: (state) => {
      state.error = null;
    },
    // Unsaved changes
    setUnsavedChanges: (state, action: PayloadAction<boolean>) => {
      state.unsavedChanges = action.payload;
    },
  },
});

export const {
  loadMenuStart,
  loadMenuSuccess,
  loadMenuFailure,
  saveMenuStart,
  saveMenuSuccess,
  saveMenuFailure,
  createNewMenu,
  clearMenu,
  updateMenuMetadata,
  updateMenuSettings,
  updateCanvasSettings,
  updateThemeSettings,
  setCurrentPage,
  addPage,
  updatePage,
  deletePage,
  reorderPages,
  duplicatePage,
  addElement,
  updateElement,
  deleteElements,
  reorderElements,
  setTemplates,
  addToRecentMenus,
  clearError,
  setUnsavedChanges,
} = menuSlice.actions;

export default menuSlice.reducer;