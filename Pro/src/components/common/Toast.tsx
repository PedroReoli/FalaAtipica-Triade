import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  type: ToastType;
  message: string;
  onClose: () => void;
  duration?: number;
}

const getToastStyles = (type: ToastType) => {
  switch (type) {
    case 'success':
      return {
        bg: 'bg-white',
        border: 'border-green-500',
        text: 'text-gray-800',
        icon: CheckCircle,
        iconColor: 'text-green-500',
        iconBg: 'bg-green-50'
      };
    case 'error':
      return {
        bg: 'bg-white',
        border: 'border-red-500',
        text: 'text-gray-800',
        icon: XCircle,
        iconColor: 'text-red-500',
        iconBg: 'bg-red-50'
      };
    case 'warning':
      return {
        bg: 'bg-white',
        border: 'border-yellow-500',
        text: 'text-gray-800',
        icon: AlertCircle,
        iconColor: 'text-yellow-500',
        iconBg: 'bg-yellow-50'
      };
    case 'info':
      return {
        bg: 'bg-white',
        border: 'border-blue-500',
        text: 'text-gray-800',
        icon: Info,
        iconColor: 'text-blue-500',
        iconBg: 'bg-blue-50'
      };
  }
};

export const Toast: React.FC<ToastProps> = ({ 
  type, 
  message, 
  onClose, 
  duration = 5000 
}) => {
  const styles = getToastStyles(type);
  const Icon = styles.icon;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div 
      className={`${styles.bg} ${styles.text} border-2 ${styles.border} p-4 rounded-xl shadow-xl flex items-start space-x-3 min-w-[320px] max-w-md animate-slide-in backdrop-blur-sm`}
      role="alert"
      style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
    >
      {/* Ícone com background colorido */}
      <div className={`${styles.iconBg} rounded-lg p-2 flex-shrink-0`}>
        <Icon className={`w-5 h-5 ${styles.iconColor}`} />
      </div>
      
      {/* Mensagem */}
      <p className="flex-1 text-sm font-medium leading-relaxed pt-1">{message}</p>
      
      {/* Botão Fechar */}
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 mt-1"
        aria-label="Fechar"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

interface ToastContainerProps {
  toasts: Array<{ id: string; type: ToastType; message: string; centered?: boolean }>;
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  const centeredToasts = toasts.filter(t => t.centered);
  const normalToasts = toasts.filter(t => !t.centered);

  return (
    <>
      {/* Toasts normais - canto superior direito */}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col space-y-2">
        {normalToasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            onClose={() => onRemove(toast.id)}
          />
        ))}
      </div>

      {/* Toasts centralizados - centro da tela */}
      {centeredToasts.map((toast) => (
        <div key={toast.id} className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none animate-fade-in">
          <div className="pointer-events-auto">
            <CenteredToast
              type={toast.type}
              message={toast.message}
              onClose={() => onRemove(toast.id)}
            />
          </div>
        </div>
      ))}
    </>
  );
};

// Toast centralizado especial para mensagens de boas-vindas
const CenteredToast: React.FC<Omit<ToastProps, 'duration'>> = ({ 
  type, 
  message, 
  onClose 
}) => {
  const styles = getToastStyles(type);
  const Icon = styles.icon;

  useEffect(() => {
    // Auto-close após 2 segundos para mensagens centralizadas
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div 
      className={`${styles.bg} ${styles.text} border-4 ${styles.border} p-6 rounded-2xl shadow-2xl flex flex-col items-center space-y-3 min-w-[350px] max-w-md animate-fade-in`}
      role="alert"
      style={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)' }}
    >
      {/* Ícone grande centralizado */}
      <div className={`${styles.iconBg} rounded-full p-4`}>
        <Icon className={`w-12 h-12 ${styles.iconColor}`} />
      </div>
      
      {/* Mensagem centralizada */}
      <p className="text-lg font-bold text-center">{message}</p>
      
      {/* Indicador de progresso */}
      <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${styles.iconColor.replace('text-', 'bg-')} animate-progress`}
        />
      </div>
    </div>
  );
};

