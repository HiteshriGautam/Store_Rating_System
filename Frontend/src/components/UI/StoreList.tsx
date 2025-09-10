import React from 'react';
import { Store } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Mail } from 'lucide-react';

interface StoreListProps {
  stores: Store[];
  getUserRating?: (storeId: string) => number; // Make this optional or required based on your needs
  onRateStore?: (store: Store) => void;
  onEditStore?: (store: Store) => void;
  onDeleteStore?: (store: Store) => void;
  showActions?: boolean;
}

export const StoreList: React.FC<StoreListProps> = ({
  stores,
  getUserRating,
  onRateStore,
  onEditStore,
  onDeleteStore,
  showActions = false
}) => {
  if (stores.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No stores found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stores.map((store) => {
        const userRating = getUserRating ? getUserRating(store.id) : 0;
        
        return (
          <Card key={store.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">{store.name}</CardTitle>
              <CardDescription className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {store.address}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="font-semibold">{store.averageRating.toFixed(1)}</span>
                    <span className="text-muted-foreground ml-1">
                      ({store.totalRatings} reviews)
                    </span>
                  </div>
                  
                  {getUserRating && userRating > 0 && (
                    <div className="text-sm text-blue-600">
                      Your rating: {userRating}/5
                    </div>
                  )}
                </div>

                {store.email && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 mr-2" />
                    {store.email}
                  </div>
                )}

                {store.owner && (
                  <div className="text-sm text-muted-foreground">
                    Owner: {store.owner}
                  </div>
                )}

                {(onRateStore || onEditStore || onDeleteStore) && (
                  <div className="flex space-x-2 pt-4">
                    {onRateStore && (
                      <Button
                        size="sm"
                        onClick={() => onRateStore(store)}
                      >
                        {getUserRating && userRating > 0 ? 'Update Rating' : 'Rate'}
                      </Button>
                    )}
                    {onEditStore && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEditStore(store)}
                      >
                        Edit
                      </Button>
                    )}
                    {onDeleteStore && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDeleteStore(store)}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StoreList;