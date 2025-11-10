import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react-native';
import { COLORS } from '../constants/colors';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  type: ToastType;
  message: string;
  onClose: () => void;
  duration?: number;
  centered?: boolean;
}

const getToastStyles = (type: ToastType) => {
  switch (type) {
    case 'success':
      return {
        borderColor: COLORS.GREEN,
        iconColor: COLORS.GREEN,
        iconBg: '#E8F5E8',
        Icon: CheckCircle
      };
    case 'error':
      return {
        borderColor: COLORS.RED,
        iconColor: COLORS.RED,
        iconBg: '#FFE8E8',
        Icon: XCircle
      };
    case 'warning':
      return {
        borderColor: COLORS.YELLOW,
        iconColor: COLORS.YELLOW,
        iconBg: '#FFF9E6',
        Icon: AlertCircle
      };
    case 'info':
      return {
        borderColor: COLORS.BLUE,
        iconColor: COLORS.BLUE,
        iconBg: '#E3F2FD',
        Icon: Info
      };
  }
};

export const Toast: React.FC<ToastProps> = ({ 
  type, 
  message, 
  onClose, 
  duration = 5000,
  centered = false
}) => {
  const styles = getToastStyles(type);
  const Icon = styles.Icon;
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    if (duration > 0) {
      const timer = setTimeout(() => {
        // Fade out
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          onClose();
        });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (centered) {
    return (
      <Animated.View style={[toastStyles.centeredContainer, { opacity: fadeAnim }]}>
        <View style={[toastStyles.centeredToast, { borderColor: styles.borderColor, borderWidth: 4 }]}>
          {/* Ícone grande */}
          <View style={[toastStyles.centeredIconContainer, { backgroundColor: styles.iconBg }]}>
            <Icon size={48} color={styles.iconColor} />
          </View>
          
          {/* Mensagem */}
          <Text style={toastStyles.centeredMessage}>{message}</Text>
          
          {/* Barra de progresso */}
          <View style={toastStyles.progressBar}>
            <View style={[toastStyles.progressFill, { backgroundColor: styles.borderColor }]} />
          </View>
        </View>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[toastStyles.container, { opacity: fadeAnim, borderColor: styles.borderColor }]}>
      {/* Ícone */}
      <View style={[toastStyles.iconContainer, { backgroundColor: styles.iconBg }]}>
        <Icon size={20} color={styles.iconColor} />
      </View>
      
      {/* Mensagem */}
      <Text style={toastStyles.message}>{message}</Text>
      
      {/* Botão Fechar */}
      <TouchableOpacity onPress={onClose} style={toastStyles.closeButton}>
        <X size={16} color={COLORS.TEXT_BLACK} />
      </TouchableOpacity>
    </Animated.View>
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
      {/* Toasts normais - topo */}
      <View style={toastStyles.topContainer}>
        {normalToasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            onClose={() => onRemove(toast.id)}
          />
        ))}
      </View>

      {/* Toasts centralizados */}
      {centeredToasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => onRemove(toast.id)}
          centered={true}
        />
      ))}
    </>
  );
};

const toastStyles = StyleSheet.create({
  // Toast normal
  topContainer: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
    zIndex: 9999,
    gap: 8,
  },
  container: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 12,
    borderWidth: 2,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    gap: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.TEXT_BLACK,
  },
  closeButton: {
    padding: 4,
  },
  
  // Toast centralizado
  centeredContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  centeredToast: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
    minWidth: 280,
    maxWidth: 350,
    gap: 16,
  },
  centeredIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    width: '100%',
    height: '100%',
  },
});

