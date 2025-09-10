import { useState, useEffect } from "react";
import { User, Store, Rating, DashboardStats } from "@/types";
import {
  usersAPI,
  storesAPI,
  ratingsAPI,
  dashboardAPI,
} from "@/services/api";
import DashboardStatsComponent from "@/components/UI/DashboardStats"; // ✅ renamed
import { DataTable } from "@/components/UI/DataTable"; // ✅ fixed
import UserModal from "@/components/UI/UserModal";
import StoreModal from "@/components/UI/StoreModal";

function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersData, storesData, ratingsData, statsData] = await Promise.all([
        usersAPI.getAll(),
        storesAPI.getAll(),
        ratingsAPI.getAll(),
        dashboardAPI.getStats(),
      ]);
      setUsers(usersData);
      setStores(storesData);
      setRatings(ratingsData);
      setStats(statsData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleEditStore = (store: Store) => {
    setSelectedStore(store);
    setShowStoreModal(true);
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await usersAPI.delete(userId);
        setUsers(users.filter((user) => user.id !== userId));
        setStats((prev) => ({ ...prev, totalUsers: prev.totalUsers - 1 }));
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const handleDeleteStore = async (storeId: string) => {
    if (window.confirm("Are you sure you want to delete this store?")) {
      try {
        await storesAPI.delete(storeId);
        setStores(stores.filter((store) => store.id !== storeId));
        setStats((prev) => ({ ...prev, totalStores: prev.totalStores - 1 }));
      } catch (error) {
        console.error("Failed to delete store:", error);
      }
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
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <DashboardStatsComponent stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Users */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Users</h2>
            <button
              onClick={() => {
                setSelectedUser(null);
                setShowUserModal(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add User
            </button>
          </div>
          <DataTable
            data={users}
            columns={[
              { key: "name", label: "Name" },
              { key: "email", label: "Email" },
              { key: "address", label: "Address" },
              {
                key: "role",
                label: "Role",
                render: (value: string) => (
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      value === "admin"
                        ? "bg-blue-100 text-blue-800"
                        : value === "store_owner"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {value}
                  </span>
                ),
              },
            ]}
            onEdit={handleEditUser}
            onDelete={(user: User) => handleDeleteUser(user.id)}
          />
        </div>

        {/* Stores */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Stores</h2>
            <button
              onClick={() => {
                setSelectedStore(null);
                setShowStoreModal(true);
              }}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Add Store
            </button>
          </div>
          <DataTable
            data={stores}
            columns={[
              { key: "name", label: "Name" },
              { key: "email", label: "Email" },
              { key: "address", label: "Address" },
              {
                key: "averageRating",
                label: "Rating",
                render: (value: number) => (
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span>{value.toFixed(1)}</span>
                  </div>
                ),
              },
            ]}
            onEdit={handleEditStore}
            onDelete={(store: Store) => handleDeleteStore(store.id)}
          />
        </div>
      </div>

      {/* Modals */}
      {showUserModal && (
        <UserModal
          user={selectedUser}
          onClose={() => {
            setShowUserModal(false);
            setSelectedUser(null);
          }}
          onSave={fetchData}
        />
      )}

      {showStoreModal && (
        <StoreModal
          store={selectedStore}
          onClose={() => {
            setShowStoreModal(false);
            setSelectedStore(null);
          }}
          onSave={fetchData}
        />
      )}
    </div>
  );
}

export default AdminDashboard;
