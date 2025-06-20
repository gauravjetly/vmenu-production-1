import React from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  Grid, 
  Layers,
  Undo,
  Redo,
  Download,
  Upload
} from 'lucide-react';

interface CanvasToolbarProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  gridEnabled: boolean;
  onToggleGrid: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  onExport?: () => void;
  onImport?: () => void;
}

export const CanvasToolbar: React.FC<CanvasToolbarProps> = ({
  zoom,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  gridEnabled,
  onToggleGrid,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
  onExport,
  onImport
}) => {
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg px-2 py-1 flex items-center gap-1 z-10">
      {/* Undo/Redo */}
      {onUndo && (
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`p-2 rounded hover:bg-gray-100 ${!canUndo ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="Undo"
        >
          <Undo className="h-4 w-4" />
        </button>
      )}
      
      {onRedo && (
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className={`p-2 rounded hover:bg-gray-100 ${!canRedo ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="Redo"
        >
          <Redo className="h-4 w-4" />
        </button>
      )}

      <div className="w-px h-6 bg-gray-300" />

      {/* Zoom Controls */}
      <button
        onClick={onZoomOut}
        className="p-2 rounded hover:bg-gray-100"
        title="Zoom Out"
      >
        <ZoomOut className="h-4 w-4" />
      </button>
      
      <span className="px-2 text-sm font-medium min-w-[60px] text-center">
        {Math.round(zoom * 100)}%
      </span>
      
      <button
        onClick={onZoomIn}
        className="p-2 rounded hover:bg-gray-100"
        title="Zoom In"
      >
        <ZoomIn className="h-4 w-4" />
      </button>
      
      <button
        onClick={onZoomReset}
        className="p-2 rounded hover:bg-gray-100"
        title="Reset Zoom"
      >
        <Maximize className="h-4 w-4" />
      </button>

      <div className="w-px h-6 bg-gray-300" />

      {/* Grid Toggle */}
      <button
        onClick={onToggleGrid}
        className={`p-2 rounded hover:bg-gray-100 ${gridEnabled ? 'bg-gray-200' : ''}`}
        title="Toggle Grid"
      >
        <Grid className="h-4 w-4" />
      </button>

      <div className="w-px h-6 bg-gray-300" />

      {/* Import/Export */}
      {onImport && (
        <button
          onClick={onImport}
          className="p-2 rounded hover:bg-gray-100"
          title="Import"
        >
          <Upload className="h-4 w-4" />
        </button>
      )}
      
      {onExport && (
        <button
          onClick={onExport}
          className="p-2 rounded hover:bg-gray-100"
          title="Export"
        >
          <Download className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};