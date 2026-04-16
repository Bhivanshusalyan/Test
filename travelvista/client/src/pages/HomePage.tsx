import { Link } from 'react-router-dom';
import { useBestViewPlaces, useRecommendedPlaces } from '../hooks/usePlaces';
import PlaceCard from '../components/places/PlaceCard';
import { CardSkeleton } from '../components/ui/Skeleton';
import { 
  ArrowRight, MapPin, Compass, UtensilsCrossed, Building, Star, Mountain, Sparkles 
} from 'lucide-react';

export default function HomePage() {
  const { data: bestViewPlaces, isLoading: loadingBest } = useBestViewPlaces();
  const { data: recommended, isLoading: loadingRec } = useRecommendedPlaces();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-hero-gradient opacity-80" />
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl animate-float" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div className="relative page-container text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
            <Sparkles size={14} className="text-accent-400" />
            <span className="text-xs font-medium text-slate-300">Discover extraordinary destinations worldwide</span>
          </div>

          <h1 className="heading-1 text-white max-w-4xl mx-auto leading-tight animate-slide-up">
            Explore the World's Most{' '}
            <span className="gradient-text">Breathtaking</span>{' '}
            Destinations
          </h1>

          <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            From stunning mountain vistas to hidden culinary gems — discover, review, and save the best places our planet has to offer.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/explore" className="btn-primary text-base px-8 py-4 flex items-center gap-2">
              <Compass size={20} />
              Start Exploring
            </Link>
            <Link to="/best-views" className="btn-secondary text-base px-8 py-4 flex items-center gap-2">
              <Mountain size={20} />
              Best Views
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div>
              <p className="text-2xl md:text-3xl font-bold gradient-text">16+</p>
              <p className="text-xs text-slate-500 mt-1">Destinations</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold gradient-text-warm">4.8</p>
              <p className="text-xs text-slate-500 mt-1">Avg Rating</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold gradient-text">12+</p>
              <p className="text-xs text-slate-500 mt-1">Countries</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-20 page-container">
        <div className="text-center mb-12">
          <h2 className="heading-2 text-white">Browse by Category</h2>
          <p className="text-slate-500 mt-3">Find exactly what you're looking for</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Tourist Spots',
              desc: 'Iconic landmarks and natural wonders',
              icon: MapPin,
              color: 'from-emerald-600 to-teal-700',
              shadow: 'shadow-emerald-600/20',
              link: '/explore?category=Tourist+Spot',
              image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
            },
            {
              title: 'Restaurants',
              desc: 'Fine dining and local flavors',
              icon: UtensilsCrossed,
              color: 'from-orange-600 to-red-700',
              shadow: 'shadow-orange-600/20',
              link: '/explore?category=Restaurant',
              image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600',
            },
            {
              title: 'Hotels',
              desc: 'Luxury stays and unique lodges',
              icon: Building,
              color: 'from-sky-600 to-blue-700',
              shadow: 'shadow-sky-600/20',
              link: '/explore?category=Hotel',
              image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600',
            },
          ].map((cat) => (
            <Link
              key={cat.title}
              to={cat.link}
              className="group relative h-64 rounded-2xl overflow-hidden block"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-60 group-hover:opacity-70 transition-opacity`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-6">
                <div className={`w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center mb-3 ${cat.shadow} shadow-lg`}>
                  <cat.icon size={22} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{cat.title}</h3>
                <p className="text-sm text-white/70 mt-1">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best View Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/30 to-transparent" />
        <div className="page-container relative z-10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Star size={18} className="text-accent-400 fill-accent-400" />
                <span className="text-sm font-semibold text-accent-400 uppercase tracking-wider">Curated Selection</span>
              </div>
              <h2 className="heading-2 text-white">Best View Destinations</h2>
              <p className="text-slate-500 mt-2">Places with the most stunning panoramas</p>
            </div>
            <Link to="/best-views" className="btn-ghost text-brand-400 hidden md:flex items-center gap-2">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingBest
              ? Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
              : bestViewPlaces?.slice(0, 6).map((place, i) => (
                  <PlaceCard key={place.id} place={place} index={i} />
                ))
            }
          </div>

          <Link to="/best-views" className="btn-secondary mt-8 mx-auto flex items-center gap-2 w-fit md:hidden">
            View All Best Views <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Recommended Section */}
      <section className="py-20 page-container">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={18} className="text-purple-400" />
              <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Recommended</span>
            </div>
            <h2 className="heading-2 text-white">Top Rated Places</h2>
            <p className="text-slate-500 mt-2">Highest rated destinations by our community</p>
          </div>
          <Link to="/explore?sortBy=rating&order=desc" className="btn-ghost text-brand-400 hidden md:flex items-center gap-2">
            See More <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loadingRec
            ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
            : recommended?.slice(0, 8).map((place, i) => (
                <PlaceCard key={place.id} place={place} index={i} />
              ))
          }
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 page-container">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-hero-gradient opacity-90" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="relative px-8 py-16 md:py-20 text-center">
            <h2 className="heading-2 text-white mb-4">Ready to Explore?</h2>
            <p className="text-slate-300/80 max-w-xl mx-auto mb-8 text-lg">
              Join thousands of travelers discovering the world's hidden gems. Create your account and start saving your favorite destinations today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="bg-white text-brand-700 font-semibold px-8 py-4 rounded-xl hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Create Free Account
              </Link>
              <Link to="/explore" className="btn-secondary border-white/20 text-white">
                Browse Destinations
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
