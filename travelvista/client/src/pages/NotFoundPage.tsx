import { Link } from 'react-router-dom';
import { MapPin, Home, Compass } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center animate-slide-up">
        <div className="w-24 h-24 rounded-full bg-surface-800 flex items-center justify-center mx-auto mb-6">
          <MapPin size={40} className="text-brand-500" />
        </div>
        
        <h1 className="text-7xl font-bold gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-3">Lost in Paradise?</h2>
        <p className="text-slate-500 max-w-md mx-auto mb-8">
          Looks like this destination doesn't exist on our map. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" className="btn-primary flex items-center gap-2">
            <Home size={18} />
            Go Home
          </Link>
          <Link to="/explore" className="btn-secondary flex items-center gap-2">
            <Compass size={18} />
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
}
