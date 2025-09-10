export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  role: 'admin' | 'user' | 'store_owner';
  password?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Store {
  id: string;
  name: string;
  email: string;
  address: string;
  owner: string;
  ownerId?: string;
  averageRating: number;
  overallRating: number;
  totalRatings: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Rating {
  id: string;
  userId: string;
  storeId: string;
  rating: number;
  value: number;
  comment?: string;
  submittedAt: string;
  userName?: string;
  user?: User;
  createdAt?: string;
  updatedAt?: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalStores: number;
  totalRatings: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
  isStoreOwner: boolean;
  isNormalUser: boolean;
}