"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [lastAuthCheck, setLastAuthCheck] = useState<number>(0);

  const login = (token: string, userData: User) => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminUser', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    setAuthChecked(true); // Mark as checked after successful login
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminUser');
    document.cookie = 'adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setUser(null);
    setIsAuthenticated(false);
    setAuthChecked(false); // Reset auth check flag
  };

  const checkAuth = async (): Promise<boolean> => {
    const now = Date.now();
    
    // Prevent multiple simultaneous auth checks
    if (authChecked) {
      return isAuthenticated;
    }

    // Debounce auth checks - don't check more than once every 2 seconds
    if (now - lastAuthCheck < 2000) {
      return isAuthenticated;
    }

    setLastAuthCheck(now);

    try {
      const adminToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
      
      if (!adminToken) {
        setAuthChecked(true);
        return false;
      }

      const response = await fetch('/api/admin/verify', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        console.log('Auth verification failed:', data.message);
        logout();
        setAuthChecked(true);
        return false;
      }

      setUser(data.data.user);
      setIsAuthenticated(true);
      setAuthChecked(true);
      return true;
    } catch (error) {
      console.error('Auth check error:', error);
      setAuthChecked(true);
      return false;
    }
  };

  useEffect(() => {
    let isMounted = true;
    
    const initAuth = async () => {
      try {
        // Check if we already have user data in localStorage
        const storedUser = localStorage.getItem('adminUser');
        const storedToken = localStorage.getItem('adminToken');
        
        if (storedUser && storedToken && !authChecked) {
          try {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            setIsAuthenticated(true);
            setAuthChecked(true);
            setIsLoading(false);
            return;
          } catch (parseError) {
            console.error('Error parsing stored user data:', parseError);
            // Continue with full auth check
          }
        }
        
        const success = await checkAuth();
        
        if (isMounted) {
          setIsLoading(false);
          
          if (!success) {
            // Only redirect if we're not already on login page
            if (window.location.pathname !== '/sys/login') {
              router.push('/sys/login');
            }
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // Only run if not already checked
    if (!authChecked) {
      initAuth();
    } else {
      setIsLoading(false);
    }
    
    return () => {
      isMounted = false;
    };
  }, [authChecked]); // Only depend on authChecked

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      login,
      logout,
      checkAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
