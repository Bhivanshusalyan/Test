import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePlaces } from '../hooks/usePlaces';
import PlaceCard from '../components/places/PlaceCard';
import MapView from '../components/map/MapView';
import { CardSkeleton } from '../components/ui/Skeleton';
import { Search, SlidersHorizontal, Map, Grid3X3, X, Star, ChevronDown } from 'lucide-react';

const CATEGORIES = ['All', 'Tourist Spot', 'Restaurant', 'Hotel'];
const TAGS = ['Best View', 'Romantic', 'Adventure', 'Budget Friendly', 'Family Friendly', 'Nature', 'Historical', 'Fine Dining', 'Luxury', 'Cultural', 'Photography'];
const SORT_OPTIONS = [
  { value: 'rating-desc', label: 'Highest Rated' },
  { value: 'rating-asc', label: 'Lowest Rated' },
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'created_at-desc', label: 'Newest First' },
];

export default function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMap, setShowMap] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get('tags')?.split(',').filter(Boolean) || []
  );
  const [minRating, setMinRating] = useState(searchParams.get('minRating') || '');
  const [sortOption, setSortOption] = useState(
    `${searchParams.get('sortBy') || 'created_at'}-${searchParams.get('order') || 'desc'}`
  );

  const [sortBy, order] = sortOption.split('-');

  const query = {
    search: search || undefined,
    category: category !== 'All' ? category : undefined,
    tags: selectedTags.length > 0 ? selectedTags.join(',') : undefined,
    minRating: minRating || undefined,
    sortBy: sortBy as any,
    order: order as any,
  };

  const { data: response, isLoading } = usePlaces(query);
  const places = response?.data || [];

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (category !== 'All') params.set('category', category);
    if (selectedTags.length) params.set('tags', selectedTags.join(','));
    if (minRating) params.set('minRating', minRating);
    if (sortBy !== 'created_at') params.set('sortBy', sortBy);
    if (order !== 'desc') params.set('order', order);
    setSearchParams(params, { replace: true });
  }, [search, category, selectedTags, minRating, sortOption]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('All');
    setSelectedTags([]);
    setMinRating('');
    setSortOption('created_at-desc');
  };

  const hasActiveFilters = search || category !== 'All' || selectedTags.length > 0 || minRating;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="page-container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="heading-2 text-white">Explore Destinations</h1>
          <p className="text-slate-500 mt-2">
            {places.length} {places.length === 1 ? 'destination' : 'destinations'} found
          </p>
        </div>

        {/* Search + Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, city, or country..."
              className="input-field pl-11"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`btn-secondary flex items-center gap-2 text-sm ${showFilters ? 'bg-brand-600/20 border-brand-500/30 text-brand-300' : ''}`}
            >
              <SlidersHorizontal size={16} />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-brand-400" />
              )}
            </button>

            <div className="flex rounded-xl overflow-hidden border border-surface-700/50">
              <button
                onClick={() => setShowMap(false)}
                className={`px-4 py-2.5 text-sm transition-colors ${!showMap ? 'bg-brand-600/20 text-brand-300' : 'text-slate-500 hover:text-white'}`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setShowMap(true)}
                className={`px-4 py-2.5 text-sm transition-colors ${showMap ? 'bg-brand-600/20 text-brand-300' : 'text-slate-500 hover:text-white'}`}
              >
                <Map size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="glass-card rounded-2xl p-6 mb-6 animate-slide-down">
            {/* Categories */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 block">Category</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      category === cat
                        ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30'
                        : 'bg-surface-800/60 text-slate-400 hover:text-white hover:bg-surface-700/60'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 block">Tags</label>
              <div className="flex flex-wrap gap-2">
                {TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedTags.includes(tag)
                        ? 'bg-brand-600/30 text-brand-300 border border-brand-500/30'
                        : 'bg-surface-800/40 text-slate-500 hover:text-slate-300 border border-transparent'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating + Sort */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Min Rating</label>
                <div className="flex gap-2">
                  {['', '3', '4', '4.5'].map(val => (
                    <button
                      key={val}
                      onClick={() => setMinRating(val)}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-all ${
                        minRating === val
                          ? 'bg-accent-500/20 text-accent-400 border border-accent-500/30'
                          : 'bg-surface-800/40 text-slate-500 border border-transparent hover:text-slate-300'
                      }`}
                    >
                      {val ? <><Star size={12} className="fill-accent-400 text-accent-400" />{val}+</> : 'Any'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Sort By</label>
                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="input-field appearance-none pr-10 text-sm cursor-pointer"
                  >
                    {SORT_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value} className="bg-surface-900">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Clear */}
            {hasActiveFilters && (
              <button onClick={clearFilters} className="mt-4 text-sm text-red-400 hover:text-red-300 transition-colors flex items-center gap-1.5">
                <X size={14} />
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Content */}
        {showMap ? (
          <MapView places={places} height="600px" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)
              : places.length > 0
                ? places.map((place, i) => <PlaceCard key={place.id} place={place} index={i} />)
                : (
                  <div className="col-span-full text-center py-20">
                    <div className="w-20 h-20 rounded-full bg-surface-800 flex items-center justify-center mx-auto mb-4">
                      <Search size={32} className="text-slate-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-400 mb-2">No destinations found</h3>
                    <p className="text-sm text-slate-600">Try adjusting your search or filters</p>
                    <button onClick={clearFilters} className="btn-primary text-sm mt-4">Clear Filters</button>
                  </div>
                )
            }
          </div>
        )}
      </div>
    </div>
  );
}
