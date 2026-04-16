import { useBestViewPlaces } from '../hooks/usePlaces';
import PlaceCard from '../components/places/PlaceCard';
import MapView from '../components/map/MapView';
import { CardSkeleton } from '../components/ui/Skeleton';
import { Mountain, Star, Eye } from 'lucide-react';

export default function BestViewPage() {
  const { data: places, isLoading } = useBestViewPlaces();

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-purple-950/50 to-surface-950" />
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl" />

        <div className="page-container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Eye size={14} className="text-accent-400" />
            <span className="text-xs font-medium text-accent-300">Handpicked for breathtaking views</span>
          </div>

          <h1 className="heading-1 text-white mb-4">
            <Mountain className="inline-block mr-3 text-accent-400" size={40} />
            Best View{' '}
            <span className="gradient-text-warm">Destinations</span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Our curated collection of places with the most stunning panoramas, sunsets, and vistas the world has to offer.
          </p>

          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Star size={14} className="fill-accent-400 text-accent-400" />
              <span>{places?.length || 0} Destinations</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-600" />
            <div className="text-sm text-slate-400">Tagged "Best View"</div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 page-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
            : places?.map((place, i) => (
                <PlaceCard key={place.id} place={place} index={i} />
              ))
          }
        </div>
      </section>

      {/* Map */}
      {places && places.length > 0 && (
        <section className="py-12 page-container">
          <h2 className="heading-3 text-white mb-6 flex items-center gap-3">
            🗺️ View on Map
          </h2>
          <MapView places={places} height="500px" />
        </section>
      )}
    </div>
  );
}
