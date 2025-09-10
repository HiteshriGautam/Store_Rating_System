import React, { useState, useEffect } from 'react';
import { storesAPI, ratingsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const [stores, setStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const filters = {};
      if (searchTerm) {
        filters.name = searchTerm;
        filters.address = searchTerm;
      }
      
      const response = await storesAPI.getAll(filters);
      setStores(response.data);
    } catch (error) {
      setError('Failed to fetch stores');
      console.error('Error fetching stores:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStores();
  };

  const handleRateStore = async (storeId, rating) => {
    try {
      await ratingsAPI.submit(storeId, rating);
      fetchStores();
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating');
    }
  };

  if (loading) return <div className="loading">Loading stores...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="dashboard-container">
      <h1>{currentUser?.role === 'owner' ? 'Store Owner Dashboard' : 'User Dashboard'}</h1>
      
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search stores by name or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      
      <div className="stores-list">
        {stores.length === 0 ? (
          <p>No stores found. {searchTerm && 'Try a different search term.'}</p>
        ) : (
          stores.map(store => (
            <div key={store.id} className="store-card">
              <h3>{store.name}</h3>
              <p className="store-address">{store.address}</p>
              <p className="store-email">Email: {store.email}</p>
              <p className="store-rating">
                Rating: {store.average_rating || '0.0'} 
                ({store.rating_count || 0} reviews)
              </p>
              
              {currentUser && currentUser.role === 'user' && (
                <div className="rating-section">
                  <h4>Rate this store</h4>
                  <div className="rating-buttons">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        onClick={() => handleRateStore(store.id, star)}
                        className="rating-button"
                      >
                        {star} ⭐
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {currentUser && currentUser.role === 'owner' && store.owner_id === currentUser.id && (
                <div className="owner-info">
                  <p>This is your store</p>
                  <p>Total Ratings: {store.rating_count || 0}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Make sure this default export is present
export default Dashboard;