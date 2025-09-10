import React, { useState } from "react";
import { User } from "@/types";
import { usersAPI } from "@/services/api";

type UserRole = "admin" | "store_owner" | "user"; // ✅ valid roles

interface UserModalProps {
  user: User | null;
  onClose: () => void;
  onSave: () => Promise<void>;
}

const UserModal: React.FC<UserModalProps> = ({ user, onClose, onSave }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState(user?.address || "");
  const [role, setRole] = useState<UserRole>(user?.role || "user"); // ✅ fixed typing
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (user) {
        // ✅ update existing user
        await usersAPI.update(user.id, { name, email, address, role });
      } else {
        // ✅ create new user
        await usersAPI.create({ name, email, address, role });
      }

      await onSave();
      onClose();
    } catch (error) {
      console.error("Failed to save user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-md w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          {user ? "Edit User" : "Add User"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name */}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Address */}
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
          />

          {/* Role */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)} // ✅ cast to union
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="user">User</option>
            <option value="store_owner">Store Owner</option>
            <option value="admin">Admin</option>
          </select>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
