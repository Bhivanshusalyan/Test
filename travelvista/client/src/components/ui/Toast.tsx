import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type = 'success', onClose, duration = 4000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-400" />,
    error: <XCircle className="w-5 h-5 text-red-400" />,
    info: <AlertCircle className="w-5 h-5 text-brand-400" />,
  };

  const borders = {
    success: 'border-emerald-500/30',
    error: 'border-red-500/30',
    info: 'border-brand-500/30',
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 transform transition-all duration-300 ease-out ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
    }`}>
      <div className={`glass flex items-center gap-3 px-5 py-4 rounded-xl shadow-glass-lg ${borders[type]} max-w-sm`}>
        {icons[type]}
        <p className="text-sm text-slate-200 font-medium">{message}</p>
        <button onClick={() => { setIsVisible(false); setTimeout(onClose, 300); }} className="text-slate-400 hover:text-white ml-2">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

// Toast manager
let showToastFn: ((message: string, type?: 'success' | 'error' | 'info') => void) | null = null;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<{ id: number; message: string; type: 'success' | 'error' | 'info' }[]>([]);

  useEffect(() => {
    showToastFn = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
      const id = Date.now();
      setToasts(prev => [...prev, { id, message, type }]);
    };
    return () => { showToastFn = null; };
  }, []);

  return (
    <>
      {children}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
        />
      ))}
    </>
  );
}

export function showToast(message: string, type?: 'success' | 'error' | 'info') {
  showToastFn?.(message, type);
}
