
import { supabase } from '../integrations/supabase/client';
import { User } from '../types/user';
import AccountService from './account.service';
import RoomSettingsService from './room.service';

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

const AuthService = {
  async login(data: LoginData): Promise<User> {
    try {
      // Sanitize inputs
      const sanitizedEmail = String(data.email).trim().toLowerCase();
      const sanitizedPassword = String(data.password);

      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: sanitizedEmail,
        password: sanitizedPassword,
      });

      if (error) {
        console.error('Login error:', error);
        throw error;
      }

      if (!authData.user) {
        throw new Error('No user data returned');
      }

      const user: User = {
        id: authData.user.id,
        name: authData.user.user_metadata.name || 'User',
        email: authData.user.email!,
        isSubscribed: false, // Update this based on subscription data when available
        subdomain: authData.user.email!.split('@')[0],
      };

      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  async signup(data: SignupData): Promise<User> {
    try {
      // Sanitize inputs
      const sanitizedName = String(data.name).trim().replace(/[<>]/g, '');
      const sanitizedEmail = String(data.email).trim().toLowerCase();
      const sanitizedPassword = String(data.password);

      // Password strength validation
      if (sanitizedPassword.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      const { data: authData, error } = await supabase.auth.signUp({
        email: sanitizedEmail,
        password: sanitizedPassword,
        options: {
          data: {
            name: sanitizedName,
          },
        },
      });

      if (error) {
        console.error('Signup error:', error);
        throw error;
      }

      if (!authData.user) {
        throw new Error('No user data returned');
      }

      // Create initial account and room settings
      await AccountService.createInitial(authData.user.id);
      await RoomSettingsService.createInitial(authData.user.id);

      const user: User = {
        id: authData.user.id,
        name: sanitizedName,
        email: sanitizedEmail,
        isSubscribed: false,
        subdomain: sanitizedEmail.split('@')[0],
      };

      return user;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },
  
  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }
};

export default AuthService;
