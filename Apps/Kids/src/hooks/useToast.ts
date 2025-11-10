import { useState, useCallback } from 'react';
import type { ToastType } from '../components/Toast';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  centered?: boolean;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: ToastType, message: string, centered = false) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, message, centered }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const success = useCallback((message: string, centered = false) => {
    addToast('success', message, centered);
  }, [addToast]);

  const error = useCallback((message: string, centered = false) => {
    addToast('error', message, centered);
  }, [addToast]);

  const warning = useCallback((message: string, centered = false) => {
    addToast('warning', message, centered);
  }, [addToast]);

  const info = useCallback((message: string, centered = false) => {
    addToast('info', message, centered);
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info
  };
};

