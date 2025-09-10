import { Store, Rating } from '@/types';

// Using the same mock data as adminAPI for consistency
const mockStores: Store[] = [
  { id: '1', name: 'Best Buy Electronics', email: 'contact@bestbuy.com', address: '123 Main St, New York, NY', owner: '2', averageRating: 4.5, totalRatings: 24, overallRating: 4.5 },
  { id: '2', name: 'Target Superstore', email: 'info@target.com', address: '456 Oak Ave, Los Angeles, CA', owner: '2', averageRating: 4.0, totalRatings: 18, overallRating: 4.0 },
  { id: '3', name: 'Walmart Supercenter', email: 'support@walmart.com', address: '789 Pine Rd, Chicago, IL', owner: '2', averageRating: 3.5, totalRatings: 32, overallRating: 3.5 },
];

const mockRatings: Rating[] = [
  { id: '1', userId: '1', storeId: '1', rating: 5, value: 5, submittedAt: '2023-10-15', userName: 'John Smith' },
  { id: '2', userId: '1', storeId: '2', rating: 4, value: 4, submittedAt: '2023-10-16', userName: 'John Smith' },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const userAPI = {
  getStores: async (): Promise<Store[]> => {
    await delay(500);
    return [...mockStores];
  },

  getUserRatings: async (userId: string): Promise<Rating[]> => {
    await delay(500);
    return mockRatings.filter(rating => rating.userId === userId);
  },

  submitRating: async (storeId: string, rating: number, comment?: string): Promise<Rating> => {
    await delay(500);
    
    // In a real app, you would get the current user from auth context
    const userId = '1'; // Mock user ID
    
    const newRating: Rating = {
      id: Date.now().toString(),
      userId,
      storeId,
      rating,
      value: rating,
      comment,
      submittedAt: new Date().toISOString(),
      userName: 'Current User', // This would come from user data
    };
    
    // Add to mock data
    const index = mockRatings.findIndex(r => r.userId === userId && r.storeId === storeId);
    if (index !== -1) {
      mockRatings[index] = newRating;
    } else {
      mockRatings.push(newRating);
    }
    
    // Update store rating (simplified)
    const storeRatings = mockRatings.filter(r => r.storeId === storeId);
    const totalRating = storeRatings.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / storeRatings.length;
    
    const storeIndex = mockStores.findIndex(store => store.id === storeId);
    if (storeIndex !== -1) {
      mockStores[storeIndex].averageRating = averageRating;
      mockStores[storeIndex].overallRating = averageRating;
      mockStores[storeIndex].totalRatings = storeRatings.length;
    }
    
    return newRating;
  },

  updatePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    await delay(500);
    // In a real app, this would call your backend
    console.log('Password updated successfully');
  },
};