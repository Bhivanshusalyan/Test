import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Calendar } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="page-container max-w-2xl">
        <h1 className="heading-2 text-white mb-8">My Profile</h1>

        <div className="glass-card rounded-2xl p-8 hover:transform-none">
          {/* Avatar */}
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-xl shadow-brand-600/30">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{user.name}</h2>
              <p className="text-sm text-slate-400 mt-1">{user.email}</p>
              {user.role === 'admin' && (
                <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-400 border border-purple-500/20">
                  <Shield size={10} />
                  Admin
                </span>
              )}
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-600/15 flex items-center justify-center">
                <User size={18} className="text-brand-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Full Name</p>
                <p className="text-sm text-slate-200 font-medium">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-600/15 flex items-center justify-center">
                <Mail size={18} className="text-brand-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Email</p>
                <p className="text-sm text-slate-200 font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-600/15 flex items-center justify-center">
                <Shield size={18} className="text-brand-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Role</p>
                <p className="text-sm text-slate-200 font-medium capitalize">{user.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-600/15 flex items-center justify-center">
                <Calendar size={18} className="text-brand-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Member Since</p>
                <p className="text-sm text-slate-200 font-medium">
                  {user.created_at
                    ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
