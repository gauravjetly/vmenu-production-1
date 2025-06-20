import { io, Socket } from 'socket.io-client';

class WebSocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 5000;

  connect(token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.socket?.connected) {
        resolve();
        return;
      }

      this.socket = io('http://localhost:3003', {
        auth: {
          token,
        },
        reconnection: true,
        reconnectionDelay: this.reconnectInterval,
        reconnectionAttempts: this.maxReconnectAttempts,
      });

      this.socket.on('connect', () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
        resolve();
      });

      this.socket.on('connect_error', (error) => {
        console.error('WebSocket connection error:', error.message);
        this.reconnectAttempts++;
        
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
          reject(new Error('Failed to connect to WebSocket server'));
        }
      });

      this.socket.on('disconnect', (reason) => {
        console.log('WebSocket disconnected:', reason);
      });

      this.socket.on('error', (error) => {
        console.error('WebSocket error:', error);
      });

      // Listen for ping/pong to keep connection alive
      this.socket.on('ping', (data) => {
        this.socket?.emit('pong', { timestamp: Date.now() });
      });
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Menu-related methods
  joinMenuEditing(menuId: string): void {
    this.socket?.emit('menu:join', { menuId });
  }

  leaveMenuEditing(menuId: string): void {
    this.socket?.emit('menu:leave', { menuId });
  }

  sendMenuChanges(menuId: string, changes: any): void {
    this.socket?.emit('menu:edit', { 
      menuId, 
      changes, 
      userId: this.getCurrentUserId() 
    });
  }

  updateMenu(menuId: string, deviceIds?: string[]): void {
    this.socket?.emit('menu:update', { menuId, deviceIds });
  }

  // Event listeners
  onMenuChanges(callback: (data: any) => void): void {
    this.socket?.on('menu:changes', callback);
  }

  onMenuRefresh(callback: (data: any) => void): void {
    this.socket?.on('menu:refresh', callback);
  }

  onUserJoined(callback: (data: any) => void): void {
    this.socket?.on('menu:userJoined', callback);
  }

  onUserLeft(callback: (data: any) => void): void {
    this.socket?.on('menu:userLeft', callback);
  }

  // Device-related methods
  registerDevice(code: string): void {
    this.socket?.emit('device:register', { code });
  }

  onDeviceRegistered(callback: (data: any) => void): void {
    this.socket?.on('device:registered', callback);
  }

  onDeviceError(callback: (data: any) => void): void {
    this.socket?.on('device:error', callback);
  }

  onDeviceStatusUpdate(callback: (data: any) => void): void {
    this.socket?.on('device:statusUpdate', callback);
  }

  // Utility methods
  private getCurrentUserId(): string {
    // TODO: Get from auth context or local storage
    return localStorage.getItem('userId') || '';
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  getSocket(): Socket | null {
    return this.socket;
  }
}

export const websocketService = new WebSocketService();