import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/UI/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/UI/textarea';
import { Star } from 'lucide-react';
import { Rating } from '@/types';
import { ratingsAPI } from '@/services/api';

interface RatingModalProps {
  rating?: Rating;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
  storeId?: string;
  userId?: string;
}

export const RatingModal: React.FC<RatingModalProps> = ({
  rating,
  open,
  onOpenChange,
  onSave,
  storeId,
  userId
}) => {
  const [ratingValue, setRatingValue] = useState(rating?.rating || 0);
  const [comment, setComment] = useState(rating?.comment || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (rating) {
      setRatingValue(rating.rating);
      setComment(rating.comment || '');
    } else {
      setRatingValue(0);
      setComment('');
    }
  }, [rating, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (rating) {
        // Update existing rating
        await ratingsAPI.update(rating.id, { rating: ratingValue, comment });
      } else if (storeId && userId) {
        // Create new rating - match the API expected format
        await ratingsAPI.create({
            userId,
            storeId,
            rating: ratingValue,
            comment,
            userName: 'Current User' // You might want to pass the actual user name
            ,
            value: 0
        });
      }
      onSave();
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to save rating:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-8 w-8 cursor-pointer ${
          index < ratingValue
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300'
        }`}
        onClick={() => setRatingValue(index + 1)}
      />
    ));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {rating ? 'Edit Rating' : 'Add Rating'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex space-x-1">
              {renderStars()}
            </div>
            <p className="text-sm text-muted-foreground">
              {ratingValue === 0 ? 'Select a rating' : `${ratingValue} out of 5 stars`}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Comment (Optional)</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || ratingValue === 0}
            >
              {loading ? 'Saving...' : rating ? 'Update' : 'Submit'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RatingModal;