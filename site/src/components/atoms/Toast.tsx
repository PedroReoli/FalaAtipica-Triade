import React, { useEffect } from 'react'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'

export interface ToastProps {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
  onClose: (id: string) => void
}

export const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id)
    }, duration)

    return () => clearTimeout(timer)
  }, [id, duration, onClose])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-[#43a047]" />
      case 'error':
        return <XCircle className="w-6 h-6 text-[#e53935]" />
      case 'warning':
        return <AlertCircle className="w-6 h-6 text-[#fbc02d]" />
      case 'info':
        return <Info className="w-6 h-6 text-[#1e88e5]" />
      default:
        return <Info className="w-6 h-6 text-[#1e88e5]" />
    }
  }

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-white border-l-4 border-[#43a047] shadow-lg'
      case 'error':
        return 'bg-white border-l-4 border-[#e53935] shadow-lg'
      case 'warning':
        return 'bg-white border-l-4 border-[#fbc02d] shadow-lg'
      case 'info':
        return 'bg-white border-l-4 border-[#1e88e5] shadow-lg'
      default:
        return 'bg-white border-l-4 border-[#1e88e5] shadow-lg'
    }
  }

  return (
    <div className={`${getStyles()} rounded-lg p-4 mb-4 max-w-md w-full transform transition-all duration-300 ease-in-out animate-in slide-in-from-right-full`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-[#3c3c3c] mb-1">
            {title}
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            {message}
          </p>
        </div>
        
        <button
          onClick={() => onClose(id)}
          className="flex-shrink-0 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
        >
          <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
        </button>
      </div>
    </div>
  )
}

export interface ToastContainerProps {
  toasts: ToastProps[]
  onClose: (id: string) => void
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={onClose}
        />
      ))}
    </div>
  )
}
