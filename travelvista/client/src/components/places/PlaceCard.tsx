import { Link, useNavigate } from 'react-router-dom';
import { Heart, MapPin, Star } from 'lucide-react';
import { Place } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useCheckFavorite, useToggleFavorite } from '../../hooks/useFavorites';
import { showToast } from '../ui/Toast';

interface PlaceCardProps {
  place: Place;
  index?: number;
}

const categoryColors: Record<string, string> = {
  'Tourist Spot': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  'Restaurant': 'bg-orange-500/15 text-orange-400 border-orange-500/20',
  'Hotel': 'bg-sky-500/15 text-sky-400 border-sky-500/20',
};

export default function PlaceCard({ place, index = 0 }: PlaceCardProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { data: isFavorited } = useCheckFavorite(place.id);
  const toggleFavorite = useToggleFavorite();

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    toggleFavorite.mutate(
      { placeId: place.id, isFavorited: !!isFavorited },
      {
        onSuccess: () => {
          showToast(isFavorited ? 'Removed from favorites' : 'Added to favorites');
        },
      }
    );
  };

  const imageUrl = place.images?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800';
  const hasBestView = place.tags?.includes('Best View');

  return (
    <Link
      to={`/place/${place.id}`}
      className="glass-card rounded-2xl overflow-hidden group block"
      style={{ animationDelay: `${index * 80}ms` }}
      id={`place-card-${place.id}`}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={imageUrl}
          alt={place.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950/80 via-transparent to-transparent" />
        
        {/* Favorite button */}
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 w-9 h-9 rounded-full glass flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 z-10"
        >
          <Heart
            size={16}
            className={`transition-colors duration-300 ${
              isFavorited ? 'fill-red-500 text-red-500' : 'text-white/70 group-hover:text-white'
            }`}
          />
        </button>

        {/* Best View badge */}
        {hasBestView && (
          <div className="absolute top-3 left-3 badge-accent gap-1">
            <Star size={10} className="fill-accent-400" />
            Best View
          </div>
        )}

        {/* Category */}
        <div className={`absolute bottom-3 left-3 inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${categoryColors[place.category] || 'bg-brand-600/20 text-brand-300'}`}>
          {place.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white group-hover:text-brand-300 transition-colors line-clamp-1">
          {place.name}
        </h3>
        
        <div className="flex items-center gap-1.5 mt-1.5 text-slate-400 text-sm">
          <MapPin size={13} />
          <span>{place.city}, {place.country}</span>
        </div>

        <p className="mt-2.5 text-sm text-slate-500 line-clamp-2 leading-relaxed">
          {place.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {place.tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-surface-800/80 text-slate-400 font-medium">
              {tag}
            </span>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            <Star size={14} className="fill-accent-400 text-accent-400" />
            <span className="text-sm font-semibold text-white">{place.rating > 0 ? place.rating.toFixed(1) : 'New'}</span>
          </div>
          <span className="text-xs text-brand-400 font-medium group-hover:text-brand-300 transition-colors">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
