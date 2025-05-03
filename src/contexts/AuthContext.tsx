import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { authService } from '@/lib/auth';
import { User, UserProfile } from '@/types/user';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (authService.isLoggedIn()) {
          const currentUser = await authService.getCurrentUser();
          if (currentUser) {
            setUser(currentUser);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        authService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { token, user_id } = await authService.login(email, password);
      const currentUser = await authService.getCurrentUser();
      
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
        toast({
          title: 'Login successful',
          description: `Welcome back, ${currentUser.name}!`,
        });
        navigate('/recommendations');
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error: any) {
      const message = error.message || 'Login failed';
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: message,
      });
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Omit<User, 'id' | 'createdAt'>) => {
    try {
      setIsLoading(true);
      await authService.register({
        ...userData,
        interests: userData.interests || ['Coding'],
        skills: userData.skills || ['Python'],
        learning_goals: userData.learning_goals || ['Web Development'],
      });
      toast({
        title: 'Signup successful',
        description: 'Please log in now.',
      });
      navigate('/login');
    } catch (error: any) {
      const message = error.message || 'Signup failed';
      toast({
        variant: 'destructive',
        title: 'Signup failed',
        description: message,
      });
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully.',
    });
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};