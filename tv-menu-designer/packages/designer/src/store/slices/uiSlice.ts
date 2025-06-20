import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PanelType = 'layers' | 'properties' | 'assets' | 'templates' | 'pages' | 'settings';
type ModalType = 'newMenu' | 'openMenu' | 'saveAs' | 'export' | 'import' | 'settings' | 'help' | 'about' | null;
type ToolType = 'select' | 'text' | 'shape' | 'image' | 'video' | 'menuItem' | 'section' | 'pan' | 'zoom';
type ViewMode = 'design' | 'preview' | 'presentation';
type Theme = 'light' | 'dark' | 'system';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface UIState {
  // Panels
  leftPanelOpen: boolean;
  rightPanelOpen: boolean;
  bottomPanelOpen: boolean;
  activeLeftPanel: PanelType;
  activeRightPanel: PanelType;
  panelSizes: {
    left: number;
    right: number;
    bottom: number;
  };
  
  // Tools
  activeTool: ToolType;
  toolSettings: {
    text: {
      fontFamily: string;
      fontSize: number;
      fontWeight: string;
      color: string;
    };
    shape: {
      type: 'rectangle' | 'circle' | 'triangle' | 'line' | 'polygon' | 'star';
      fill: string;
      stroke: string;
      strokeWidth: number;
    };
  };
  
  // Modals
  activeModal: ModalType;
  modalData: any;
  
  // View
  viewMode: ViewMode;
  showGrid: boolean;
  showRulers: boolean;
  showGuides: boolean;
  showOutlines: boolean;
  
  // UI Preferences
  theme: Theme;
  autoSave: boolean;
  autoSaveInterval: number;
  showTooltips: boolean;
  compactMode: boolean;
  
  // Notifications
  notifications: Notification[];
  
  // Loading states
  isLoading: boolean;
  loadingMessage: string;
  
  // Context menus
  contextMenu: {
    visible: boolean;
    x: number;
    y: number;
    items: Array<{
      label: string;
      icon?: string;
      shortcut?: string;
      disabled?: boolean;
      divider?: boolean;
      onClick?: () => void;
      submenu?: Array<any>;
    }>;
  };
  
  // Keyboard shortcuts
  shortcutsEnabled: boolean;
  activeShortcuts: string[];
}

const initialState: UIState = {
  // Panels
  leftPanelOpen: true,
  rightPanelOpen: true,
  bottomPanelOpen: false,
  activeLeftPanel: 'layers',
  activeRightPanel: 'properties',
  panelSizes: {
    left: 300,
    right: 350,
    bottom: 200,
  },
  
  // Tools
  activeTool: 'select',
  toolSettings: {
    text: {
      fontFamily: 'Inter',
      fontSize: 16,
      fontWeight: 'normal',
      color: '#000000',
    },
    shape: {
      type: 'rectangle',
      fill: '#3B82F6',
      stroke: '#1E40AF',
      strokeWidth: 2,
    },
  },
  
  // Modals
  activeModal: null,
  modalData: null,
  
  // View
  viewMode: 'design',
  showGrid: true,
  showRulers: true,
  showGuides: true,
  showOutlines: false,
  
  // UI Preferences
  theme: 'system',
  autoSave: true,
  autoSaveInterval: 60000, // 1 minute
  showTooltips: true,
  compactMode: false,
  
  // Notifications
  notifications: [],
  
  // Loading states
  isLoading: false,
  loadingMessage: '',
  
  // Context menus
  contextMenu: {
    visible: false,
    x: 0,
    y: 0,
    items: [],
  },
  
  // Keyboard shortcuts
  shortcutsEnabled: true,
  activeShortcuts: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Panel management
    toggleLeftPanel: (state) => {
      state.leftPanelOpen = !state.leftPanelOpen;
    },
    toggleRightPanel: (state) => {
      state.rightPanelOpen = !state.rightPanelOpen;
    },
    toggleBottomPanel: (state) => {
      state.bottomPanelOpen = !state.bottomPanelOpen;
    },
    setActiveLeftPanel: (state, action: PayloadAction<PanelType>) => {
      state.activeLeftPanel = action.payload;
      state.leftPanelOpen = true;
    },
    setActiveRightPanel: (state, action: PayloadAction<PanelType>) => {
      state.activeRightPanel = action.payload;
      state.rightPanelOpen = true;
    },
    setPanelSize: (state, action: PayloadAction<{ panel: 'left' | 'right' | 'bottom'; size: number }>) => {
      state.panelSizes[action.payload.panel] = action.payload.size;
    },
    
    // Tool management
    setActiveTool: (state, action: PayloadAction<ToolType>) => {
      state.activeTool = action.payload;
    },
    updateToolSettings: (state, action: PayloadAction<{ tool: 'text' | 'shape'; settings: any }>) => {
      state.toolSettings[action.payload.tool] = {
        ...state.toolSettings[action.payload.tool],
        ...action.payload.settings,
      };
    },
    
    // Modal management
    openModal: (state, action: PayloadAction<{ type: ModalType; data?: any }>) => {
      state.activeModal = action.payload.type;
      state.modalData = action.payload.data || null;
    },
    closeModal: (state) => {
      state.activeModal = null;
      state.modalData = null;
    },
    
    // View management
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload;
    },
    toggleGrid: (state) => {
      state.showGrid = !state.showGrid;
    },
    toggleRulers: (state) => {
      state.showRulers = !state.showRulers;
    },
    toggleGuides: (state) => {
      state.showGuides = !state.showGuides;
    },
    toggleOutlines: (state) => {
      state.showOutlines = !state.showOutlines;
    },
    
    // UI Preferences
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    toggleAutoSave: (state) => {
      state.autoSave = !state.autoSave;
    },
    setAutoSaveInterval: (state, action: PayloadAction<number>) => {
      state.autoSaveInterval = action.payload;
    },
    toggleTooltips: (state) => {
      state.showTooltips = !state.showTooltips;
    },
    toggleCompactMode: (state) => {
      state.compactMode = !state.compactMode;
    },
    
    // Notifications
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
      const notification: Notification = {
        ...action.payload,
        id: crypto.randomUUID(),
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    
    // Loading states
    setLoading: (state, action: PayloadAction<{ isLoading: boolean; message?: string }>) => {
      state.isLoading = action.payload.isLoading;
      state.loadingMessage = action.payload.message || '';
    },
    
    // Context menu
    showContextMenu: (state, action: PayloadAction<{ x: number; y: number; items: UIState['contextMenu']['items'] }>) => {
      state.contextMenu = {
        visible: true,
        x: action.payload.x,
        y: action.payload.y,
        items: action.payload.items,
      };
    },
    hideContextMenu: (state) => {
      state.contextMenu.visible = false;
    },
    
    // Keyboard shortcuts
    toggleShortcuts: (state) => {
      state.shortcutsEnabled = !state.shortcutsEnabled;
    },
    setActiveShortcuts: (state, action: PayloadAction<string[]>) => {
      state.activeShortcuts = action.payload;
    },
    
    // Workspace reset
    resetWorkspace: (state) => {
      state.leftPanelOpen = initialState.leftPanelOpen;
      state.rightPanelOpen = initialState.rightPanelOpen;
      state.bottomPanelOpen = initialState.bottomPanelOpen;
      state.panelSizes = initialState.panelSizes;
      state.viewMode = initialState.viewMode;
      state.showGrid = initialState.showGrid;
      state.showRulers = initialState.showRulers;
      state.showGuides = initialState.showGuides;
      state.showOutlines = initialState.showOutlines;
    },
  },
});

export const {
  toggleLeftPanel,
  toggleRightPanel,
  toggleBottomPanel,
  setActiveLeftPanel,
  setActiveRightPanel,
  setPanelSize,
  setActiveTool,
  updateToolSettings,
  openModal,
  closeModal,
  setViewMode,
  toggleGrid,
  toggleRulers,
  toggleGuides,
  toggleOutlines,
  setTheme,
  toggleAutoSave,
  setAutoSaveInterval,
  toggleTooltips,
  toggleCompactMode,
  addNotification,
  removeNotification,
  clearNotifications,
  setLoading,
  showContextMenu,
  hideContextMenu,
  toggleShortcuts,
  setActiveShortcuts,
  resetWorkspace,
} = uiSlice.actions;

export default uiSlice.reducer;