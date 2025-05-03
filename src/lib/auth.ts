import axios from 'axios';
import { User, UserProfile } from '@/types/user';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class AuthService {
  private currentUser: UserProfile | null = null;
  private isAuthenticated = false;

  constructor() {
    // Check local storage for saved auth on init
    const token = localStorage.getItem('token');
    if (token) {
      this.fetchUserById(this.getUserId()).then(user => {
        if (user) {
          this.currentUser = user;
          this.isAuthenticated = true;
        } else {
          this.logout();
        }
      }).catch(error => {
        console.error('Failed to restore auth:', error);
        this.logout();
      });
    }
  }

  async fetchUserById(userId: string | null): Promise<UserProfile | null> {
    if (!userId) return null;
    try {
      const response = await axios.get(`${API_URL}/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  async register(userData: Omit<User, 'id' | 'createdAt'>): Promise<void> {
    try {
      await axios.post(`${API_URL}/signup`, {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        gender: userData.gender,
        department: userData.department,
        year: userData.year,
        connection_type: userData.connection_type,
        interests: userData.interests || ['Coding'],
        skills: userData.skills || ['Python'],
        learning_goals: userData.learning_goals || ['Web Development'],
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Signup failed');
    }
  }

  async login(email: string, password: string): Promise<{ token: string; user_id: number }> {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const { token, user_id } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user_id', user_id.toString());
      this.isAuthenticated = true;
      this.currentUser = await this.fetchUserById(user_id.toString());
      return { token, user_id };
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  }

  logout(): void {
    this.isAuthenticated = false;
    this.currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
  }

  async getCurrentUser(): Promise<UserProfile | null> {
    if (!this.isAuthenticated || !this.currentUser) {
      const userId = this.getUserId();
      if (userId) {
        this.currentUser = await this.fetchUserById(userId);
      }
    }
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token') && this.isAuthenticated;
  }

  getUserId(): string | null {
    return localStorage.getItem('user_id');
  }
}

export const authService = new AuthService();