import { useState, useEffect } from 'react';
import { Store, Rating } from '@/types';
import { userAPI, ratingsAPI } from '@/services/api'; // Added ratingsAPI
import StoreList from '@/components/UI/StoreList';
import RatingModal from '@/components/UI/RatingModal';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext'; // Added useAuth

const UserDashboard = () => {
  const { user } = useAuth(); // Get current user
  const [stores, setStores] = useState<Store[]>([]);
  const [userRatings, setUserRatings] = useState<Rating[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [storesData, ratingsData] = await Promise.all([
        userAPI.getStores(),
        ratingsAPI.getByUser(user?.id || '') // Use ratingsAPI instead of userAPI
      ]);
      setStores(storesData);
      setUserRatings(ratingsData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRateStore = (store: Store) => {
    setSelectedStore(store);
    setShowRatingModal(true);
  };

  const getUserRatingForStore = (storeId: string) => {
    const rating = userRatings.find(r => r.storeId === storeId);
    return rating ? rating.rating : 0;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>
      
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search stores by name or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      
      <StoreList
        stores={filteredStores}
        getUserRating={getUserRatingForStore}
        onRateStore={handleRateStore}
      />

      {showRatingModal && selectedStore && (
        <RatingModal
          store={selectedStore} // Changed from owner to store
          open={showRatingModal}
          onOpenChange={setShowRatingModal}
          onSave={fetchData}
          storeId={selectedStore.id}
          userId={user?.id || ''}
        />
      )}
    </div>
  );
};

export default UserDashboard;