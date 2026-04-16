import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/ui/Toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';

import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import BestViewPage from './pages/BestViewPage';
import PlaceDetailPage from './pages/PlaceDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              {/* Auth pages - no navbar/footer */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Pages with layout */}
              <Route path="/" element={<AppLayout><HomePage /></AppLayout>} />
              <Route path="/explore" element={<AppLayout><ExplorePage /></AppLayout>} />
              <Route path="/best-views" element={<AppLayout><BestViewPage /></AppLayout>} />
              <Route path="/place/:id" element={<AppLayout><PlaceDetailPage /></AppLayout>} />
              <Route
                path="/favorites"
                element={
                  <AppLayout>
                    <ProtectedRoute><FavoritesPage /></ProtectedRoute>
                  </AppLayout>
                }
              />
              <Route
                path="/profile"
                element={
                  <AppLayout>
                    <ProtectedRoute><ProfilePage /></ProtectedRoute>
                  </AppLayout>
                }
              />
              <Route path="*" element={<AppLayout><NotFoundPage /></AppLayout>} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
