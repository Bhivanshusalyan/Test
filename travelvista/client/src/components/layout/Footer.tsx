import { Link } from 'react-router-dom';
import { MapPin, Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 bg-surface-950/80">
      <div className="page-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
                <MapPin size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold">
                <span className="gradient-text">Travel</span>
                <span className="text-white">Vista</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              Discover the world's most breathtaking destinations, curated just for you.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-4">Explore</h4>
            <ul className="space-y-2.5">
              <li><Link to="/explore" className="text-sm text-slate-500 hover:text-brand-400 transition-colors">All Destinations</Link></li>
              <li><Link to="/best-views" className="text-sm text-slate-500 hover:text-brand-400 transition-colors">Best Views</Link></li>
              <li><Link to="/explore?category=Hotel" className="text-sm text-slate-500 hover:text-brand-400 transition-colors">Hotels</Link></li>
              <li><Link to="/explore?category=Restaurant" className="text-sm text-slate-500 hover:text-brand-400 transition-colors">Restaurants</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><span className="text-sm text-slate-500">About Us</span></li>
              <li><span className="text-sm text-slate-500">Contact</span></li>
              <li><span className="text-sm text-slate-500">Privacy Policy</span></li>
              <li><span className="text-sm text-slate-500">Terms of Service</span></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-4">Connect</h4>
            <div className="flex gap-3">
              <span className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-brand-400 hover:border-brand-500/30 transition-all cursor-pointer">
                <Twitter size={16} />
              </span>
              <span className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-brand-400 hover:border-brand-500/30 transition-all cursor-pointer">
                <Github size={16} />
              </span>
              <span className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-brand-400 hover:border-brand-500/30 transition-all cursor-pointer">
                <Mail size={16} />
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-600">© 2025 TravelVista. All rights reserved.</p>
          <p className="text-xs text-slate-600">Made with ❤️ for travelers worldwide</p>
        </div>
      </div>
    </footer>
  );
}
