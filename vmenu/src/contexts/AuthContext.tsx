import React, { createContext, useContext, useState, useEffect } from 'react';
import { Admin } from '../models';
import { mockAuth } from '../services/mockAuth';
import toast from 'react-hot-toast';

// Mock User type for development
interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthContextType {
  currentUser: User | null;
  adminData: Admin | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, organizationId: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateAdminProfile: (data: Partial<Admin>) => Promise<void>;
  checkPermission: (resource: string, action: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [adminData, setAdminData] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (mock implementation)
    const checkAuth = async () => {
      const user = mockAuth.getCurrentUser();
      setCurrentUser(user);
      
      if (user) {
        // Fetch admin data
        try {
          const data = await mockAuth.getAdminData(user.uid);
          if (data) {
            setAdminData(data);
          }
        } catch (error) {
          console.error('Error fetching admin data:', error);
          toast.error('Failed to load admin profile');
        }
      } else {
        setAdminData(null);
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result = await mockAuth.signInWithEmailAndPassword(email, password);
      const adminData = await mockAuth.getAdminData(result.user.uid);
      
      setCurrentUser(result.user as User);
      setAdminData(adminData);
      mockAuth.setLoggedIn(true);
      
      toast.success('Logged in successfully!');
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Failed to login. Please try again.');
    }
  };

  const register = async (_email: string, _password: string, _name: string, _organizationId: string) => {
    // Mock implementation - not available in demo
    throw new Error('Registration is not available in demo mode. Please contact sales.');
  };

  const logout = async () => {
    try {
      await mockAuth.signOut();
      mockAuth.setLoggedIn(false);
      setCurrentUser(null);
      setAdminData(null);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  const resetPassword = async (_email: string) => {
    // Mock implementation
    toast.error('Password reset is not available in demo mode.');
  };

  const updateAdminProfile = async (data: Partial<Admin>) => {
    if (!currentUser || !adminData) return;
    
    // Mock implementation - just update local state
    setAdminData({
      ...adminData,
      ...data,
      updatedAt: new Date()
    });
    
    toast.success('Profile updated successfully');
  };

  const checkPermission = (resource: string, action: string): boolean => {
    if (!adminData) return false;
    
    // Super admin has all permissions
    if (adminData.role === 'super_admin') return true;
    
    // Check specific permissions
    const permission = adminData.permissions.find(p => p.resource === resource);
    return permission ? permission.actions.includes(action as any) : false;
  };

  const value: AuthContextType = {
    currentUser,
    adminData,
    loading,
    login,
    register,
    logout,
    resetPassword,
    updateAdminProfile,
    checkPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};