import { useState } from 'react';
import StarRating from '../ui/StarRating';
import { Review } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useCreateReview, useDeleteReview } from '../../hooks/useReviews';
import { showToast } from '../ui/Toast';
import { User, Trash2, Clock } from 'lucide-react';

interface ReviewListProps {
  reviews: Review[];
  placeId: string;
}

export default function ReviewList({ reviews, placeId }: ReviewListProps) {
  const { user, isAuthenticated } = useAuth();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const createReview = useCreateReview(placeId);
  const deleteReview = useDeleteReview(placeId);

  const hasReviewed = reviews?.some(r => r.user_id === user?.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || rating === 0) return;

    createReview.mutate(
      { comment: comment.trim(), rating },
      {
        onSuccess: () => {
          setComment('');
          setRating(0);
          showToast('Review added successfully!');
        },
        onError: (err: any) => {
          showToast(err.response?.data?.error || 'Failed to add review', 'error');
        },
      }
    );
  };

  const handleDelete = (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    deleteReview.mutate(reviewId, {
      onSuccess: () => showToast('Review deleted'),
    });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="heading-3 text-white flex items-center gap-3">
        Reviews
        <span className="text-sm font-normal text-slate-500 bg-surface-800/80 px-3 py-1 rounded-full">
          {reviews?.length || 0}
        </span>
      </h3>

      {/* Add review form */}
      {isAuthenticated && !hasReviewed && (
        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 space-y-4">
          <h4 className="text-sm font-semibold text-slate-300">Write a Review</h4>
          
          <div>
            <label className="text-xs text-slate-500 mb-2 block">Your Rating</label>
            <StarRating rating={rating} interactive onChange={setRating} size={24} />
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
            className="input-field min-h-[100px] resize-none"
            maxLength={2000}
          />

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-600">{comment.length}/2000</span>
            <button
              type="submit"
              disabled={!comment.trim() || rating === 0 || createReview.isPending}
              className="btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createReview.isPending ? 'Posting...' : 'Post Review'}
            </button>
          </div>
        </form>
      )}

      {/* Reviews list */}
      <div className="space-y-4">
        {reviews?.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <p className="text-sm">No reviews yet. Be the first to review!</p>
          </div>
        )}

        {reviews?.map((review) => (
          <div key={review.id} className="glass-card rounded-xl p-5 hover:transform-none" id={`review-${review.id}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white shrink-0">
                  {review.user_name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{review.user_name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <StarRating rating={review.rating} size={12} />
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock size={10} />
                      {formatDate(review.created_at)}
                    </span>
                  </div>
                </div>
              </div>

              {user?.id === review.user_id && (
                <button
                  onClick={() => handleDelete(review.id)}
                  className="text-slate-600 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-500/10"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
