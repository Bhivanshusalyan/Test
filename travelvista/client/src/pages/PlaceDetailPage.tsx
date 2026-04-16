import { useParams, Link } from 'react-router-dom';
import { usePlace } from '../hooks/usePlaces';
import { useCheckFavorite, useToggleFavorite } from '../hooks/useFavorites';
import { useAuth } from '../context/AuthContext';
import ReviewList from '../components/reviews/ReviewList';
import MapView from '../components/map/MapView';
import StarRating from '../components/ui/StarRating';
import { DetailSkeleton } from '../components/ui/Skeleton';
import { showToast } from '../components/ui/Toast';
import { 
  MapPin, Heart, ArrowLeft, Tag, Share2, Star, Globe, Building2, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { useState } from 'react';

const categoryIcons: Record<string, React.ReactNode> = {
  'Tourist Spot': <Globe size={16} className="text-emerald-400" />,
  'Restaurant': <Building2 size={16} className="text-orange-400" />,
  'Hotel': <Building2 size={16} className="text-sky-400" />,
};

export default function PlaceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: place, isLoading } = usePlace(id!);
  const { isAuthenticated } = useAuth();
  const { data: isFavorited } = useCheckFavorite(id!);
  const toggleFavorite = useToggleFavorite();
  const [currentImage, setCurrentImage] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 page-container">
        <DetailSkeleton />
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen pt-24 page-container text-center">
        <h2 className="heading-2 text-white mb-4">Place not found</h2>
        <Link to="/explore" className="btn-primary">Back to Explore</Link>
      </div>
    );
  }

  const images = place.images?.length > 0 
    ? place.images 
    : ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'];

  const handleFavorite = () => {
    if (!isAuthenticated) {
      showToast('Please log in to save favorites', 'info');
      return;
    }
    toggleFavorite.mutate(
      { placeId: place.id, isFavorited: !!isFavorited },
      { onSuccess: () => showToast(isFavorited ? 'Removed from favorites' : 'Saved to favorites') }
    );
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="page-container">
        {/* Back button */}
        <Link to="/explore" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Explore
        </Link>

        {/* Image Gallery */}
        <div className="relative rounded-2xl overflow-hidden h-[300px] md:h-[450px] mb-8">
          <img
            src={images[currentImage]}
            alt={place.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-950/80 via-transparent to-surface-950/20" />

          {/* Image nav */}
          {images.length > 1 && (
            <>
              <button 
                onClick={() => setCurrentImage(prev => prev > 0 ? prev - 1 : images.length - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <ChevronLeft size={20} className="text-white" />
              </button>
              <button 
                onClick={() => setCurrentImage(prev => prev < images.length - 1 ? prev + 1 : 0)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <ChevronRight size={20} className="text-white" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentImage ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Actions overlay */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={handleFavorite}
              className={`glass rounded-full p-3 transition-all hover:scale-110 ${
                isFavorited ? 'border-red-500/30' : ''
              }`}
            >
              <Heart size={18} className={isFavorited ? 'fill-red-500 text-red-500' : 'text-white'} />
            </button>
            <button className="glass rounded-full p-3 transition-all hover:scale-110">
              <Share2 size={18} className="text-white" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & info */}
            <div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="badge gap-1.5">
                  {categoryIcons[place.category]}
                  {place.category}
                </span>
                {place.tags?.includes('Best View') && (
                  <span className="badge-accent gap-1">
                    <Star size={10} className="fill-accent-400" />
                    Best View
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white font-display">{place.name}</h1>

              <div className="flex items-center gap-4 mt-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <MapPin size={16} />
                  <span>{place.city}, {place.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <StarRating rating={place.rating} size={16} />
                  <span className="text-sm font-semibold text-white">
                    {place.rating > 0 ? place.rating.toFixed(1) : 'No ratings'}
                  </span>
                  <span className="text-sm text-slate-500">
                    ({place.reviews?.length || 0} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="glass-card rounded-2xl p-6 hover:transform-none">
              <h2 className="text-lg font-semibold text-white mb-3">About this place</h2>
              <p className="text-slate-400 leading-relaxed">{place.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {place.tags?.map(tag => (
                <Link 
                  key={tag} 
                  to={`/explore?tags=${encodeURIComponent(tag)}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-800/60 text-sm text-slate-400 hover:text-brand-300 hover:bg-brand-600/15 transition-all"
                >
                  <Tag size={12} />
                  {tag}
                </Link>
              ))}
            </div>

            {/* Reviews */}
            <ReviewList reviews={place.reviews || []} placeId={place.id} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Map */}
            <div className="glass-card rounded-2xl p-4 hover:transform-none">
              <h3 className="text-sm font-semibold text-slate-300 mb-3 px-2">📍 Location</h3>
              <MapView places={[place]} height="250px" singlePlace />
              <p className="text-xs text-slate-500 mt-3 px-2">
                {place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}
              </p>
            </div>

            {/* Quick info */}
            <div className="glass-card rounded-2xl p-6 hover:transform-none space-y-4">
              <h3 className="text-sm font-semibold text-slate-300">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Category</span>
                  <span className="text-sm text-slate-300">{place.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">City</span>
                  <span className="text-sm text-slate-300">{place.city}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Country</span>
                  <span className="text-sm text-slate-300">{place.country}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="fill-accent-400 text-accent-400" />
                    <span className="text-sm font-semibold text-white">
                      {place.rating > 0 ? place.rating.toFixed(1) : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Save CTA */}
            <button
              onClick={handleFavorite}
              className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                isFavorited
                  ? 'bg-red-500/15 text-red-400 border border-red-500/20 hover:bg-red-500/25'
                  : 'btn-primary'
              }`}
            >
              <Heart size={18} className={isFavorited ? 'fill-red-500' : ''} />
              {isFavorited ? 'Saved to Favorites' : 'Save to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
