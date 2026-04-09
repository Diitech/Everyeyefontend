import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ThumbsUp, CheckCircle, Loader2, X, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getSavedUser } from '@/api/auth';
import { getReviews, createReview, voteHelpful, deleteReview, type ReviewsData } from '@/api/reviews';

interface ReviewSectionProps {
  productId: string;
}

function StarRating({ rating, onChange, size = 'md' }: {
  rating: number;
  onChange?: (r: number) => void;
  size?: 'sm' | 'md' | 'lg';
}) {
  const [hovered, setHovered] = useState(0);
  const sizes = { sm: 'w-3 h-3', md: 'w-5 h-5', lg: 'w-7 h-7' };
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          onMouseEnter={() => onChange && setHovered(star)}
          onMouseLeave={() => onChange && setHovered(0)}
          className={onChange ? 'cursor-pointer' : 'cursor-default'}
          disabled={!onChange}
        >
          <Star
            className={`${sizes[size]} transition-colors ${
              star <= (hovered || rating)
                ? 'fill-amber-400 text-amber-400'
                : 'fill-transparent text-gray-600'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function RatingBar({ stars, count, total }: { stars: number; count: number; total: number }) {
  const percent = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-400 text-sm w-4 text-right">{stars}</span>
      <Star className="w-3 h-3 fill-amber-400 text-amber-400 flex-shrink-0" />
      <div className="flex-1 h-2 bg-dark rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="h-full bg-amber-400 rounded-full"
        />
      </div>
      <span className="text-gray-400 text-xs w-6">{count}</span>
    </div>
  );
}

export function ReviewSection({ productId }: ReviewSectionProps) {
  const user = getSavedUser();
  const [data, setData] = useState<ReviewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [votedReviews, setVotedReviews] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'highest' | 'lowest'>('recent');

  useEffect(() => {
    getReviews(productId)
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [productId]);

  const sortedReviews = [...(data?.reviews || [])].sort((a, b) => {
    if (sortBy === 'helpful') return b.helpful - a.helpful;
    if (sortBy === 'highest') return b.rating - a.rating;
    if (sortBy === 'lowest') return a.rating - b.rating;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body || !rating) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      const newReview = await createReview(productId, { rating, title, body });
      setData(prev => prev ? {
        ...prev,
        reviews: [newReview, ...prev.reviews],
        total: prev.total + 1,
        breakdown: { ...prev.breakdown, [rating]: (prev.breakdown[rating] || 0) + 1 }
      } : null);
      setShowForm(false);
      setSubmitSuccess(true);
      setTitle('');
      setBody('');
      setRating(5);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const handleVote = async (reviewId: string) => {
    if (!user) return;
    try {
      const result = await voteHelpful(reviewId);
      setData(prev => prev ? {
        ...prev,
        reviews: prev.reviews.map(r =>
          r._id === reviewId ? { ...r, helpful: result.helpful } : r
        )
      } : null);
      setVotedReviews(prev => {
        const next = new Set(prev);
        if (result.voted) { next.add(reviewId); } else { next.delete(reviewId); }
        return next;
      });
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (reviewId: string) => {
    try {
      await deleteReview(reviewId);
      setData(prev => prev ? {
        ...prev,
        reviews: prev.reviews.filter(r => r._id !== reviewId),
        total: prev.total - 1
      } : null);
    } catch (err) { console.error(err); }
  };

  const avgRating = data?.reviews.length
    ? data.reviews.reduce((sum, r) => sum + r.rating, 0) / data.reviews.length
    : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 text-coral animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Reviews <span className="text-gray-400 text-lg font-normal">({data?.total || 0})</span>
        </h2>
        {user && !showForm && (
          <Button onClick={() => setShowForm(true)} className="bg-coral hover:bg-coral-dark text-white">
            <Edit className="w-4 h-4 mr-2" />Write a Review
          </Button>
        )}
      </div>

      <AnimatePresence>
        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5 text-green-400" />
            <p className="text-green-400 font-medium">Review submitted successfully!</p>
          </motion.div>
        )}
      </AnimatePresence>

      {(data?.total || 0) > 0 && (
        <div className="bg-dark-100 rounded-2xl border border-border p-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-6xl font-bold text-white mb-2">{avgRating.toFixed(1)}</p>
              <StarRating rating={Math.round(avgRating)} size="lg" />
              <p className="text-gray-400 text-sm mt-2">{data?.total} review{(data?.total || 0) !== 1 ? 's' : ''}</p>
            </div>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(stars => (
                <RatingBar key={stars} stars={stars} count={data?.breakdown[stars] || 0} total={data?.total || 0} />
              ))}
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-dark-100 rounded-2xl border border-coral/30 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-semibold text-lg">Write Your Review</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label className="text-gray-300 text-sm mb-2 block">Your Rating</Label>
                <StarRating rating={rating} onChange={setRating} size="lg" />
              </div>
              <div>
                <Label className="text-gray-300 text-sm">Review Title</Label>
                <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Summarize your experience..." className="bg-dark border-border text-white mt-1" maxLength={100} required />
              </div>
              <div>
                <Label className="text-gray-300 text-sm">Your Review</Label>
                <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Tell others about your experience..." className="w-full mt-1 bg-dark border border-border text-white rounded-lg px-3 py-2 h-32 resize-none text-sm" maxLength={1000} required />
                <p className="text-gray-500 text-xs mt-1">{body.length}/1000</p>
              </div>
              {submitError && <p className="text-red-400 text-sm">{submitError}</p>}
              <div className="flex gap-3">
                <Button type="submit" disabled={submitting || !title || !body} className="bg-coral hover:bg-coral-dark text-white">
                  {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Submitting...</> : 'Submit Review'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="border-border text-white">Cancel</Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {(data?.total || 0) > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-gray-400 text-sm">Sort by:</span>
          {(['recent', 'helpful', 'highest', 'lowest'] as const).map(option => (
            <button
              key={option}
              onClick={() => setSortBy(option)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${sortBy === option ? 'bg-coral text-white' : 'bg-dark-100 text-gray-400 hover:text-white border border-border'}`}
            >
              {option === 'recent' ? 'Most Recent' : option === 'helpful' ? 'Most Helpful' : option === 'highest' ? 'Highest Rated' : 'Lowest Rated'}
            </button>
          ))}
        </div>
      )}

      {sortedReviews.length === 0 ? (
        <div className="text-center py-16 bg-dark-100 rounded-2xl border border-border">
          <Star className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-white font-medium mb-2">No reviews yet</p>
          <p className="text-gray-400 text-sm mb-6">Be the first to review this product!</p>
          {user ? (
            <Button onClick={() => setShowForm(true)} className="bg-coral hover:bg-coral-dark text-white">Write First Review</Button>
          ) : (
            <p className="text-gray-500 text-sm">Sign in to leave a review</p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedReviews.map((review, i) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-dark-100 rounded-2xl border border-border p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-coral/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {review.userAvatar ? (
                      <img src={review.userAvatar} alt={review.userName} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-coral font-bold">{review.userName.charAt(0)}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-white font-medium text-sm">{review.userName}</span>
                      {review.verifiedPurchase && (
                        <span className="flex items-center gap-1 text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                          <CheckCircle className="w-3 h-3" />Verified Purchase
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <StarRating rating={review.rating} size="sm" />
                      <span className="text-gray-500 text-xs">
                        {new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                    <h4 className="text-white font-semibold mb-2">{review.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{review.body}</p>
                    <div className="flex items-center gap-4 mt-4">
                      <button
                        onClick={() => handleVote(review._id)}
                        disabled={!user}
                        className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                          votedReviews.has(review._id) ? 'bg-coral/20 border-coral/30 text-coral' : 'border-border text-gray-400 hover:text-white hover:border-gray-400'
                        } ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <ThumbsUp className="w-3 h-3" />Helpful ({review.helpful})
                      </button>
                    </div>
                  </div>
                </div>
                {user && review.userName === user.name && (
                  <button onClick={() => handleDelete(review._id)} className="text-gray-500 hover:text-red-400 transition-colors flex-shrink-0" title="Delete review">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!user && (data?.total || 0) > 0 && (
        <div className="bg-dark-100 rounded-2xl border border-border p-6 text-center">
          <p className="text-gray-400 text-sm">
            <span className="text-white font-medium">Sign in</span> to write a review or vote reviews as helpful
          </p>
        </div>
      )}
    </div>
  );
}