import axios from 'axios';
import { User, Store, Rating, DashboardStats } from '@/types';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock data for demonstration
const mockUsers: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@example.com', address: '123 Admin St, City', role: 'admin' },
  { id: '2', name: 'John Doe', email: 'john@example.com', address: '456 User Ave, Town', role: 'user' },
  { id: '3', name: 'Store Owner', email: 'owner@store.com', address: '789 Business Blvd, City', role: 'store_owner' },
];

const mockStores: Store[] = [
  {
    id: '1', name: 'Coffee Corner', email: 'info@coffeecorner.com', address: '100 Main St, Downtown', 
    owner: '3', averageRating: 4.2, totalRatings: 35, overallRating: 4.2
  },
  {
    id: '2', name: 'Tech Store', email: 'contact@techstore.com', address: '200 Tech Ave, Silicon Valley', 
    owner: '3', averageRating: 4.8, totalRatings: 43, overallRating: 4.8
  },
];

const mockRatings: Rating[] = [
  {
    id: '1', userId: '2', storeId: '1', rating: 4, value: 4, 
    submittedAt: '2024-01-15', userName: 'John Doe'
  },
  {
    id: '2', userId: '2', storeId: '2', rating: 5, value: 5, 
    submittedAt: '2024-01-16', userName: 'John Doe'
  },
];

// Auth API
export const authAPI = {
  login: async (email: string, password: string): Promise<User> => {
    try {
      // For real API implementation:
      // const response = await api.post('/auth/login', { email, password });
      // return response.data;
      
      // Mock login logic
      const user = mockUsers.find(u => u.email === email);
      if (user && password === 'Password123!') { // Simple mock password check
        return user;
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      throw new Error('Login failed');
    }
  },

  signup: async (userData: Omit<User, 'id'> & { password: string }): Promise<User> => {
    try {
      // For real API implementation:
      // const response = await api.post('/auth/signup', userData);
      // return response.data;
      
      // Mock signup logic
      const existingUser = mockUsers.find(u => u.email === userData.email);
      if (existingUser) {
        throw new Error('Email already exists');
      }
      
      const newUser: User = {
        ...userData,
        id: (mockUsers.length + 1).toString(),
        role: userData.role || 'user',
      };
      
      mockUsers.push(newUser);
      return newUser;
    } catch (error) {
      throw new Error('Signup failed');
    }
  },

  logout: async (): Promise<void> => {
    try {
      // For real API implementation:
      // await api.post('/auth/logout');
      return Promise.resolve();
    } catch (error) {
      throw new Error('Logout failed');
    }
  },
};

// Users API
export const usersAPI = {
  getAll: async (): Promise<User[]> => {
    try {
      // For real API: return api.get('/users');
      return mockUsers;
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  },

  create: async (userData: Omit<User, 'id'>): Promise<User> => {
    try {
      // For real API: return api.post('/users', userData);
      const newUser: User = {
        ...userData,
        id: (mockUsers.length + 1).toString(),
      };
      mockUsers.push(newUser);
      return newUser;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  },

  update: async (id: string, userData: Partial<User>): Promise<User> => {
    try {
      // For real API: return api.put(`/users/${id}`, userData);
      const index = mockUsers.findIndex(u => u.id === id);
      if (index !== -1) {
        mockUsers[index] = { ...mockUsers[index], ...userData };
        return mockUsers[index];
      }
      throw new Error('User not found');
    } catch (error) {
      throw new Error('Failed to update user');
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      // For real API: return api.delete(`/users/${id}`);
      const index = mockUsers.findIndex(u => u.id === id);
      if (index !== -1) {
        mockUsers.splice(index, 1);
      }
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  },
};

// Stores API
export const storesAPI = {
  getAll: async (): Promise<Store[]> => {
    try {
      // For real API: return api.get('/stores');
      return mockStores;
    } catch (error) {
      throw new Error('Failed to fetch stores');
    }
  },

  create: async (storeData: Omit<Store, 'id' | 'averageRating' | 'totalRatings' | 'overallRating'>): Promise<Store> => {
    try {
      // For real API: return api.post('/stores', storeData);
      const newStore: Store = {
        ...storeData,
        id: (mockStores.length + 1).toString(),
        averageRating: 0,
        overallRating: 0,
        totalRatings: 0,
      };
      mockStores.push(newStore);
      return newStore;
    } catch (error) {
      throw new Error('Failed to create store');
    }
  },

  update: async (id: string, storeData: Partial<Store>): Promise<Store> => {
    try {
      // For real API: return api.put(`/stores/${id}`, storeData);
      const index = mockStores.findIndex(s => s.id === id);
      if (index !== -1) {
        mockStores[index] = { ...mockStores[index], ...storeData };
        return mockStores[index];
      }
      throw new Error('Store not found');
    } catch (error) {
      throw new Error('Failed to update store');
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      // For real API: return api.delete(`/stores/${id}`);
      const index = mockStores.findIndex(s => s.id === id);
      if (index !== -1) {
        mockStores.splice(index, 1);
      }
    } catch (error) {
      throw new Error('Failed to delete store');
    }
  },
};

// Ratings API
export const ratingsAPI = {
  getAll: async (): Promise<Rating[]> => {
    try {
      // For real API: return api.get('/ratings');
      return mockRatings;
    } catch (error) {
      throw new Error('Failed to fetch ratings');
    }
  },

  getByStore: async (storeId: string): Promise<Rating[]> => {
    try {
      // For real API: return api.get(`/ratings/store/${storeId}`);
      return mockRatings.filter(r => r.storeId === storeId);
    } catch (error) {
      throw new Error('Failed to fetch store ratings');
    }
  },

  getByUser: async (userId: string): Promise<Rating[]> => {
    try {
      // For real API: return api.get(`/ratings/user/${userId}`);
      return mockRatings.filter(r => r.userId === userId);
    } catch (error) {
      throw new Error('Failed to fetch user ratings');
    }
  },

  create: async (ratingData: Omit<Rating, 'id' | 'submittedAt'>): Promise<Rating> => {
    try {
      // For real API: return api.post('/ratings', ratingData);
      const newRating: Rating = {
        ...ratingData,
        id: (mockRatings.length + 1).toString(),
        submittedAt: new Date().toISOString().split('T')[0],
      };
      mockRatings.push(newRating);
      
      // Update store rating
      const storeIndex = mockStores.findIndex(s => s.id === ratingData.storeId);
      if (storeIndex !== -1) {
        const storeRatings = mockRatings.filter(r => r.storeId === ratingData.storeId);
        const totalRating = storeRatings.reduce((sum, r) => sum + r.rating, 0);
        const averageRating = totalRating / storeRatings.length;
        
        mockStores[storeIndex].averageRating = averageRating;
        mockStores[storeIndex].overallRating = averageRating;
        mockStores[storeIndex].totalRatings = storeRatings.length;
      }
      
      return newRating;
    } catch (error) {
      throw new Error('Failed to create rating');
    }
  },

  update: async (id: string, ratingData: Partial<Rating>): Promise<Rating> => {
    try {
      // For real API: return api.put(`/ratings/${id}`, ratingData);
      const index = mockRatings.findIndex(r => r.id === id);
      if (index !== -1) {
        mockRatings[index] = { ...mockRatings[index], ...ratingData };
        return mockRatings[index];
      }
      throw new Error('Rating not found');
    } catch (error) {
      throw new Error('Failed to update rating');
    }
  },
};

// Dashboard API
export const dashboardAPI = {
  getStats: async (): Promise<DashboardStats> => {
    try {
      // For real API: return api.get('/dashboard/stats');
      return {
        totalUsers: mockUsers.length,
        totalStores: mockStores.length,
        totalRatings: mockRatings.length,
      };
    } catch (error) {
      throw new Error('Failed to fetch dashboard stats');
    }
  },
};

// Admin API
export const adminAPI = {
  getUsers: usersAPI.getAll,
  createUser: usersAPI.create,
  updateUser: usersAPI.update,
  deleteUser: usersAPI.delete,
  getStores: storesAPI.getAll,
  createStore: storesAPI.create,
  updateStore: storesAPI.update,
  deleteStore: storesAPI.delete,
  getRatings: ratingsAPI.getAll,
  getDashboardStats: dashboardAPI.getStats,
};

// User API
export const userAPI = {
  getStores: storesAPI.getAll,
  submitRating: ratingsAPI.create,
  getUserRatings: ratingsAPI.getByUser,
  updatePassword: async (userId: string, currentPassword: string, newPassword: string): Promise<void> => {
    try {
      // For real API: return api.put(`/users/${userId}/password`, { currentPassword, newPassword });
      console.log(`Password updated for user ${userId}`);
    } catch (error) {
      throw new Error('Failed to update password');
    }
  },
};

// Store Owner API
export const storeOwnerAPI = {
  getStores: async (ownerId: string): Promise<Store[]> => {
    try {
      // For real API: return api.get(`/stores/owner/${ownerId}`);
      return mockStores.filter(store => store.owner === ownerId);
    } catch (error) {
      throw new Error('Failed to fetch owner stores');
    }
  },
  createStore: storesAPI.create,
  getStoreRatings: ratingsAPI.getByStore,
  updatePassword: async (userId: string, currentPassword: string, newPassword: string): Promise<void> => {
    try {
      // For real API: return api.put(`/users/${userId}/password`, { currentPassword, newPassword });
      console.log(`Password updated for user ${userId}`);
    } catch (error) {
      throw new Error('Failed to update password');
    }
  },
};

export default api;