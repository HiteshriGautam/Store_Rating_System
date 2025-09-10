import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Edit, Trash2, ArrowUpDown } from 'lucide-react';
import { Store } from '@/types';
import { storesAPI } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import StarRating from '@/components/UI/StarRating';

interface StoreManagementProps {
  stores: Store[];
  onStoreUpdate: (store: Store) => void;
  onStoreDelete: (storeId: string) => void;
  onStoreAdd: (store: Store) => void;
}

type SortField = 'name' | 'email' | 'address' | 'averageRating';
type SortDirection = 'asc' | 'desc';

const StoreManagement: React.FC<StoreManagementProps> = ({
  stores,
  onStoreUpdate,
  onStoreDelete,
  onStoreAdd,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<Store | null>(null);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    owner: '',
  });
  const { toast } = useToast();

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedAndFilteredStores = stores
    .filter(store => 
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.address.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const handleAddStore = async () => {
    try {
      const newStore = await storesAPI.create(formData);
      onStoreAdd(newStore);
      setIsAddDialogOpen(false);
      resetForm();
      toast({
        title: "Store added successfully",
        description: `${newStore.name} has been added to the system.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add store. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditStore = async () => {
    if (!editingStore) return;
    
    try {
      const updatedStore = await storesAPI.update(editingStore.id, formData);
      onStoreUpdate(updatedStore);
      setEditingStore(null);
      resetForm();
      toast({
        title: "Store updated successfully",
        description: `${updatedStore.name}'s information has been updated.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update store. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteStore = async (storeId: string) => {
    try {
      await storesAPI.delete(storeId);
      onStoreDelete(storeId);
      toast({
        title: "Store deleted successfully",
        description: "Store has been removed from the system.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete store. Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      address: '',
      owner: '',
    });
  };

  const openEditDialog = (store: Store) => {
    setEditingStore(store);
    setFormData({
      name: store.name,
      email: store.email,
      address: store.address,
      owner: store.owner,
    });
  };

  const SortButton: React.FC<{ field: SortField; children: React.ReactNode }> = ({ field, children }) => (
    <Button
      variant="ghost"
      size="sm"
      className="h-auto p-0 font-medium"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        <ArrowUpDown className="h-4 w-4" />
      </div>
    </Button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Store Management</h3>
          <p className="text-sm text-muted-foreground">
            Add, edit, and manage store listings
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Store</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Store</DialogTitle>
              <DialogDescription>
                Register a new store in the platform.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="store-name">Store Name</Label>
                <Input
                  id="store-name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter store name"
                />
              </div>
              <div>
                <Label htmlFor="store-email">Email</Label>
                <Input
                  id="store-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter store email"
                />
              </div>
              <div>
                <Label htmlFor="store-address">Address</Label>
                <Input
                  id="store-address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Enter store address"
                />
              </div>
              <div>
                <Label htmlFor="store-owner">Owner</Label>
                <Input
                  id="store-owner"
                  value={formData.owner}
                  onChange={(e) => setFormData(prev => ({ ...prev, owner: e.target.value }))}
                  placeholder="Enter owner name"
                />
              </div>
              <Button onClick={handleAddStore} className="w-full">
                Add Store
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search stores by name, email, or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stores Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead><SortButton field="name">Name</SortButton></TableHead>
              <TableHead><SortButton field="email">Email</SortButton></TableHead>
              <TableHead><SortButton field="address">Address</SortButton></TableHead>
              <TableHead><SortButton field="averageRating">Rating</SortButton></TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAndFilteredStores.map((store) => (
              <TableRow key={store.id}>
                <TableCell className="font-medium">{store.name}</TableCell>
                <TableCell>{store.email}</TableCell>
                <TableCell className="max-w-xs truncate">{store.address}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <StarRating rating={store.averageRating} readonly size="sm" />
                    <span className="text-xs text-muted-foreground">
                      ({store.totalRatings})
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Dialog open={editingStore?.id === store.id} onOpenChange={(open) => !open && setEditingStore(null)}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(store)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Store</DialogTitle>
                          <DialogDescription>
                            Update store information.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="edit-store-name">Store Name</Label>
                            <Input
                              id="edit-store-name"
                              value={formData.name}
                              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-store-email">Email</Label>
                            <Input
                              id="edit-store-email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-store-address">Address</Label>
                            <Input
                              id="edit-store-address"
                              value={formData.address}
                              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-store-owner">Owner</Label>
                            <Input
                              id="edit-store-owner"
                              value={formData.owner}
                              onChange={(e) => setFormData(prev => ({ ...prev, owner: e.target.value }))}
                            />
                          </div>
                          <Button onClick={handleEditStore} className="w-full">
                            Update Store
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteStore(store.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {sortedAndFilteredStores.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No stores found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StoreManagement;