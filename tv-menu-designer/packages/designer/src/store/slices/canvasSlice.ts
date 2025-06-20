import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Element } from '@tv-menu-designer/shared';

interface CanvasState {
  zoom: number;
  pan: { x: number; y: number };
  gridEnabled: boolean;
  snapEnabled: boolean;
  rulerEnabled: boolean;
  selectedElements: string[];
  hoveredElement: string | null;
  isDragging: boolean;
  isSelecting: boolean;
  selectionBox: {
    start: { x: number; y: number };
    end: { x: number; y: number };
  } | null;
  clipboard: Element[];
  history: {
    past: Element[][];
    present: Element[];
    future: Element[][];
  };
  guides: {
    horizontal: number[];
    vertical: number[];
  };
}

const initialState: CanvasState = {
  zoom: 1,
  pan: { x: 0, y: 0 },
  gridEnabled: true,
  snapEnabled: true,
  rulerEnabled: true,
  selectedElements: [],
  hoveredElement: null,
  isDragging: false,
  isSelecting: false,
  selectionBox: null,
  clipboard: [],
  history: {
    past: [],
    present: [],
    future: [],
  },
  guides: {
    horizontal: [],
    vertical: [],
  },
};

const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setZoom: (state, action: PayloadAction<number>) => {
      state.zoom = Math.max(0.1, Math.min(5, action.payload));
    },
    zoomIn: (state) => {
      state.zoom = Math.min(5, state.zoom * 1.2);
    },
    zoomOut: (state) => {
      state.zoom = Math.max(0.1, state.zoom / 1.2);
    },
    resetZoom: (state) => {
      state.zoom = 1;
      state.pan = { x: 0, y: 0 };
    },
    setPan: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.pan = action.payload;
    },
    updatePan: (state, action: PayloadAction<{ dx: number; dy: number }>) => {
      state.pan.x += action.payload.dx;
      state.pan.y += action.payload.dy;
    },
    toggleGrid: (state) => {
      state.gridEnabled = !state.gridEnabled;
    },
    toggleSnap: (state) => {
      state.snapEnabled = !state.snapEnabled;
    },
    toggleRuler: (state) => {
      state.rulerEnabled = !state.rulerEnabled;
    },
    selectElement: (state, action: PayloadAction<string>) => {
      state.selectedElements = [action.payload];
    },
    selectElements: (state, action: PayloadAction<string[]>) => {
      state.selectedElements = action.payload;
    },
    addToSelection: (state, action: PayloadAction<string>) => {
      if (!state.selectedElements.includes(action.payload)) {
        state.selectedElements.push(action.payload);
      }
    },
    removeFromSelection: (state, action: PayloadAction<string>) => {
      state.selectedElements = state.selectedElements.filter(id => id !== action.payload);
    },
    clearSelection: (state) => {
      state.selectedElements = [];
    },
    setHoveredElement: (state, action: PayloadAction<string | null>) => {
      state.hoveredElement = action.payload;
    },
    setDragging: (state, action: PayloadAction<boolean>) => {
      state.isDragging = action.payload;
    },
    setSelecting: (state, action: PayloadAction<boolean>) => {
      state.isSelecting = action.payload;
    },
    setSelectionBox: (state, action: PayloadAction<{ start: { x: number; y: number }; end: { x: number; y: number } } | null>) => {
      state.selectionBox = action.payload;
    },
    copyToClipboard: (state, action: PayloadAction<Element[]>) => {
      state.clipboard = action.payload;
    },
    clearClipboard: (state) => {
      state.clipboard = [];
    },
    addHorizontalGuide: (state, action: PayloadAction<number>) => {
      if (!state.guides.horizontal.includes(action.payload)) {
        state.guides.horizontal.push(action.payload);
      }
    },
    addVerticalGuide: (state, action: PayloadAction<number>) => {
      if (!state.guides.vertical.includes(action.payload)) {
        state.guides.vertical.push(action.payload);
      }
    },
    removeHorizontalGuide: (state, action: PayloadAction<number>) => {
      state.guides.horizontal = state.guides.horizontal.filter(y => y !== action.payload);
    },
    removeVerticalGuide: (state, action: PayloadAction<number>) => {
      state.guides.vertical = state.guides.vertical.filter(x => x !== action.payload);
    },
    clearGuides: (state) => {
      state.guides = { horizontal: [], vertical: [] };
    },
    // History management
    pushToHistory: (state, action: PayloadAction<Element[]>) => {
      state.history.past.push(state.history.present);
      state.history.present = action.payload;
      state.history.future = [];
    },
    undo: (state) => {
      if (state.history.past.length > 0) {
        const previous = state.history.past.pop();
        if (previous) {
          state.history.future.unshift(state.history.present);
          state.history.present = previous;
        }
      }
    },
    redo: (state) => {
      if (state.history.future.length > 0) {
        const next = state.history.future.shift();
        if (next) {
          state.history.past.push(state.history.present);
          state.history.present = next;
        }
      }
    },
  },
});

export const {
  setZoom,
  zoomIn,
  zoomOut,
  resetZoom,
  setPan,
  updatePan,
  toggleGrid,
  toggleSnap,
  toggleRuler,
  selectElement,
  selectElements,
  addToSelection,
  removeFromSelection,
  clearSelection,
  setHoveredElement,
  setDragging,
  setSelecting,
  setSelectionBox,
  copyToClipboard,
  clearClipboard,
  addHorizontalGuide,
  addVerticalGuide,
  removeHorizontalGuide,
  removeVerticalGuide,
  clearGuides,
  pushToHistory,
  undo,
  redo,
} = canvasSlice.actions;

export default canvasSlice.reducer;