import { User } from '@/types';

// Mock user data for authentication
const mockUsers: User[] = [
  { 
    id: '1', 
    name: 'John Doe', 
    email: 'john@example.com', 
    address: '123 Main St, New York, NY', 
    role: 'user',
    password: 'Password123!' 
  },
  { 
    id: '2', 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    address: '456 Oak Ave, Los Angeles, CA', 
    role: 'user',
    password: 'Password123!' 
  },
  { 
    id: '3', 
    name: 'Store Owner', 
    email: 'owner@store.com', 
    address: '789 Pine Rd, Chicago, IL', 
    role: 'store_owner',
    password: 'Password123!' 
  },
  { 
    id: '4', 
    name: 'Admin User', 
    email: 'admin@example.com', 
    address: '321 Admin Blvd, San Francisco, CA', 
    role: 'admin',
    password: 'Password123!' 
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authAPI = {
  login: async (email: string, password: string): Promise<User> => {
    await delay(800); // Simulate network delay
    
    // Find user by email and password
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  },

  signup: async (userData: Omit<User, 'id'> & { password: string }): Promise<User> => {
    await delay(800);
    
    // Check if email already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }
    
    // Validate password
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    if (!passwordRegex.test(userData.password)) {
      throw new Error('Password must be 8-16 characters with at least one uppercase letter and one special character');
    }
    
    // Validate name length
    if (userData.name.length < 20 || userData.name.length > 60) {
      throw new Error('Name must be between 20 and 60 characters');
    }
    
    // Validate address length
    if (userData.address.length > 400) {
      throw new Error('Address cannot exceed 400 characters');
    }
    
    // Create new user
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      role: userData.role || 'user', // Default to 'user' role if not specified
    };
    
    // Add to mock database (in real app, this would be a backend API call)
    mockUsers.push(newUser);
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword as User;
  },

  getCurrentUser: async (): Promise<User | null> => {
    await delay(300);
    
    // In a real app, this would verify a token or session
    // For demo purposes, return the first user
    const user = mockUsers[0];
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword as User;
    }
    
    return null;
  },

  logout: async (): Promise<void> => {
    await delay(300);
    // In a real app, this would invalidate the token on the server
    console.log('User logged out');
  },

  updatePassword: async (userId: string, currentPassword: string, newPassword: string): Promise<void> => {
    await delay(500);
    
    // Find user
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    // Verify current password
    if (mockUsers[userIndex].password !== currentPassword) {
      throw new Error('Current password is incorrect');
    }
    
    // Validate new password
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    if (!passwordRegex.test(newPassword)) {
      throw new Error('New password must be 8-16 characters with at least one uppercase letter and one special character');
    }
    
    // Update password
    mockUsers[userIndex].password = newPassword;
  },

  // Demo accounts for easy testing
  getDemoAccounts: (): Array<{email: string, password: string, role: string}> => {
    return [
      { email: 'admin@example.com', password: 'Password123!', role: 'admin' },
      { email: 'john@example.com', password: 'Password123!', role: 'user' },
      { email: 'owner@store.com', password: 'Password123!', role: 'store_owner' },
    ];
  }
};