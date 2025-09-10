import { User, Store, Rating } from '@/types';

// Mock data for demonstration (replace with actual API calls)
const mockUsers: User[] = [
  { id: '1', name: 'John Smith', email: 'john@example.com', address: '123 Elm St, Boston, MA', role: 'user' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', address: '456 Maple Ave, San Francisco, CA', role: 'store_owner' },
  { id: '3', name: 'Admin User', email: 'admin@example.com', address: '789 Admin Rd, New York, NY', role: 'admin' },
];

const mockStores: Store[] = [
  { id: '1', name: 'Best Buy Electronics', email: 'contact@bestbuy.com', address: '123 Main St, New York, NY', owner: '2', averageRating: 4.5, totalRatings: 24, overallRating: 4.5 },
  { id: '2', name: 'Target Superstore', email: 'info@target.com', address: '456 Oak Ave, Los Angeles, CA', owner: '2', averageRating: 4.0, totalRatings: 18, overallRating: 4.0 },
  { id: '3', name: 'Walmart Supercenter', email: 'support@walmart.com', address: '789 Pine Rd, Chicago, IL', owner: '2', averageRating: 3.5, totalRatings: 32, overallRating: 3.5 },
];

const mockRatings: Rating[] = [
  { id: '1', userId: '1', storeId: '1', rating: 5, value: 5, submittedAt: '2023-10-15', userName: 'John Smith' },
  { id: '2', userId: '1', storeId: '2', rating: 4, value: 4, submittedAt: '2023-10-16', userName: 'John Smith' },
  { id: '3', userId: '3', storeId: '1', rating: 4, value: 4, submittedAt: '2023-10-17', userName: 'Admin User' },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const adminAPI = {
  getUsers: async (): Promise<User[]> => {
    await delay(500); // Simulate network delay
    return [...mockUsers];
  },

  getStores: async (): Promise<Store[]> => {
    await delay(500);
    return [...mockStores];
  },

  getRatings: async (): Promise<Rating[]> => {
    await delay(500);
    return [...mockRatings];
  },

  createUser: async (userData: Omit<User, 'id'>): Promise<User> => {
    await delay(500);
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
    };
    mockUsers.push(newUser);
    return newUser;
  },

  updateUser: async (id: string, userData: Partial<User>): Promise<User> => {
    await delay(500);
    const index = mockUsers.findIndex(user => user.id === id);
    if (index === -1) throw new Error('User not found');
    
    mockUsers[index] = { ...mockUsers[index], ...userData };
    return mockUsers[index];
  },

  deleteUser: async (id: string): Promise<void> => {
    await delay(500);
    const index = mockUsers.findIndex(user => user.id === id);
    if (index === -1) throw new Error('User not found');
    
    mockUsers.splice(index, 1);
  },

  createStore: async (storeData: Omit<Store, 'id'>): Promise<Store> => {
    await delay(500);
    const newStore: Store = {
      ...storeData,
      id: Date.now().toString(),
    };
    mockStores.push(newStore);
    return newStore;
  },

  updateStore: async (id: string, storeData: Partial<Store>): Promise<Store> => {
    await delay(500);
    const index = mockStores.findIndex(store => store.id === id);
    if (index === -1) throw new Error('Store not found');
    
    mockStores[index] = { ...mockStores[index], ...storeData };
    return mockStores[index];
  },

  deleteStore: async (id: string): Promise<void> => {
    await delay(500);
    const index = mockStores.findIndex(store => store.id === id);
    if (index === -1) throw new Error('Store not found');
    
    mockStores.splice(index, 1);
  },
};