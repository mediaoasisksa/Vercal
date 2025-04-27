
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { setUser, setLoading, logout as logoutAction } from '../store/authSlice';
import { AuthService, AccountService, RoomSettingsService } from '../services';
import { toast } from "sonner";
import { supabase } from '../integrations/supabase/client';
import { User } from '../types/user';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: any) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  updateUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAppSelector(state => state.auth);

  // This effect handles the initial session check and sets up auth state listener
  useEffect(() => {
    // First set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.id);
      
      if (event === 'SIGNED_IN' && session?.user) {
        const userData = {
          id: session.user.id,
          name: session.user.user_metadata.name || 'User',
          email: session.user.email!,
          isSubscribed: false, // This should be fetched from your subscription table
          subdomain: session.user.email!.split('@')[0],
        };
        dispatch(setUser(userData));
        dispatch(setLoading(false));
      } else if (event === 'SIGNED_OUT') {
        dispatch(logoutAction());
        dispatch(setLoading(false));
      }
    });

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session?.user?.id);
      if (session?.user) {
        const userData = {
          id: session.user.id,
          name: session.user.user_metadata.name || 'User',
          email: session.user.email!,
          isSubscribed: false,
          subdomain: session.user.email!.split('@')[0],
        };
        dispatch(setUser(userData));
      }
      dispatch(setLoading(false));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

  const login = async (email: string, password: string) => {
    dispatch(setLoading(true));
    try {
      const userData = await AuthService.login({ email, password });
      // We don't need to dispatch setUser here as it will be handled by onAuthStateChange
      toast.success("Login successful");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed. Please check your credentials.");
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    dispatch(setLoading(true));
    try {
      const userData = await AuthService.signup({ name, email, password });
      // We don't need to dispatch setUser here as it will be handled by onAuthStateChange
      toast.success("Signup successful!");
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(error.message || "Signup failed. Please try again.");
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      // We don't need to dispatch logoutAction here as it will be handled by onAuthStateChange
      navigate('/');
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
      console.error('Logout error:', error);
    }
  };

  const updateUser = (userData: any) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      dispatch(setUser(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        signup,
        logout: handleLogout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
