import React, { useState } from "react";
import { Store } from "@/types";

interface StoreModalProps {
  store: Store | null;
  onClose: () => void;
  onSave: () => Promise<void>;
}

const StoreModal: React.FC<StoreModalProps> = ({ store, onClose, onSave }) => {
  const [name, setName] = useState(store?.name || "");
  const [email, setEmail] = useState(store?.email || "");
  const [address, setAddress] = useState(store?.address || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call API to create/update store
    await onSave();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-xl font-bold mb-4">
          {store ? "Edit Store" : "Add Store"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoreModal;
