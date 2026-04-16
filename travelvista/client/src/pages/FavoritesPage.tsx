import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import PlaceCard from '../components/places/PlaceCard';
import { CardSkeleton } from '../components/ui/Skeleton';
import { Heart, Compass } from 'lucide-react';
import { Place } from '../types';

export default function FavoritesPage() {
  const { data: favorites, isLoading } = useFavorites();

  // Map favorites to Place format
  const places: Place[] = (favorites || []).map((fav) => ({
    id: fav.id,
    name: fav.name,
    description: fav.description,
    city: fav.city,
    country: fav.country,
    category: fav.category as any,
    images: fav.images,
    rating: fav.rating,
    tags: fav.tags,
    latitude: fav.latitude,
    longitude: fav.longitude,
  }));

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="page-container">
        <div className="mb-8">
          <h1 className="heading-2 text-white flex items-center gap-3">
            <Heart size={28} className="text-red-400 fill-red-400" />
            My Favorites
          </h1>
          <p className="text-slate-500 mt-2">
            {places.length} saved {places.length === 1 ? 'destination' : 'destinations'}
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : places.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {places.map((place, i) => (
              <PlaceCard key={place.id} place={place} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-surface-800 flex items-center justify-center mx-auto mb-6">
              <Heart size={40} className="text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No favorites yet</h3>
            <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">
              Start exploring and save the destinations that catch your eye. They'll appear here for easy access.
            </p>
            <Link to="/explore" className="btn-primary inline-flex items-center gap-2">
              <Compass size={18} />
              Explore Destinations
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
