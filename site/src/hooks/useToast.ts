import { useState, useCallback } from 'react'

export interface ToastData {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const addToast = useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { ...toast, id }
    
    setToasts(prev => [...prev, newToast])
    
    return id
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const clearAllToasts = useCallback(() => {
    setToasts([])
  }, [])

  const showSuccess = useCallback((title: string, message: string, duration?: number) => {
    return addToast({ type: 'success', title, message, duration })
  }, [addToast])

  const showError = useCallback((title: string, message: string, duration?: number) => {
    return addToast({ type: 'error', title, message, duration })
  }, [addToast])

  const showWarning = useCallback((title: string, message: string, duration?: number) => {
    return addToast({ type: 'warning', title, message, duration })
  }, [addToast])

  const showInfo = useCallback((title: string, message: string, duration?: number) => {
    return addToast({ type: 'info', title, message, duration })
  }, [addToast])

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    showSuccess,
    showError,
    showWarning,
    showInfo
  }
}
