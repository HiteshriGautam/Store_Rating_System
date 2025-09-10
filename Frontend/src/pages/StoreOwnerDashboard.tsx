import { useState, useEffect } from 'react';
import { Rating } from '@/types';
import { storeOwnerAPI } from '@/services/api';

const StoreOwnerDashboard = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const ratingsData = await storeOwnerAPI.getStoreRatings();
      setRatings(ratingsData);
      
      // Calculate average rating
      if (ratingsData.length > 0) {
        const total = ratingsData.reduce((sum, rating) => sum + rating.value, 0);
        setAverageRating(total / ratingsData.length);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
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
      <h1 className="text-3xl font-bold mb-8">Store Owner Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Store Performance</h2>
        <div className="flex items-center">
          <div className="text-4xl font-bold text-blue-600 mr-4">
            {averageRating.toFixed(1)}
          </div>
          <div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-2xl ${
                    star <= Math.round(averageRating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="text-gray-600">
              Based on {ratings.length} rating{ratings.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Ratings</h2>
        {ratings.length === 0 ? (
          <p className="text-gray-600">No ratings yet.</p>
        ) : (
          <div className="space-y-4">
            {ratings.map((rating) => (
              <div key={rating.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{rating.user?.name || 'Anonymous'}</p>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`${
                              star <= rating.value
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="ml-2 text-gray-600">{rating.value}.0</span>
                    </div>
                    {rating.comment && (
                      <p className="mt-2 text-gray-700">{rating.comment}</p>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(rating.createdAt!).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreOwnerDashboard;