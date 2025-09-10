import { Rating } from '@/types';

// Using the same mock data for consistency
const mockRatings: Rating[] = [
  { id: '1', userId: '1', storeId: '1', rating: 5, value: 5, submittedAt: '2023-10-15', userName: 'John Smith' },
  { id: '2', userId: '1', storeId: '1', rating: 4, value: 4, submittedAt: '2023-10-16', userName: 'John Smith' },
  { id: '3', userId: '3', storeId: '1', rating: 4, value: 4, submittedAt: '2023-10-17', userName: 'Admin User' },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const storeOwnerAPI = {
  getStoreRatings: async (storeId?: string): Promise<Rating[]> => {
    await delay(500);
    
    // If no storeId provided, get ratings for all stores owned by the current user
    // For demo purposes, we'll assume storeId '1' belongs to the current user
    const targetStoreId = storeId || '1';
    
    return mockRatings.filter(rating => rating.storeId === targetStoreId);
  },

  updatePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    await delay(500);
    // In a real app, this would call your backend
    console.log('Password updated successfully');
  },
};