"use client"

import type React from "react"
import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react"

export interface ToastProps {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  message: string
  duration?: number
  onClose: (id: string) => void
}

export const Toast: React.FC<ToastProps> = ({ id, type, title, message, duration = 5000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id)
    }, duration)

    return () => clearTimeout(timer)
  }, [id, duration, onClose])

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-6 h-6 text-[#43a047]" />
      case "error":
        return <XCircle className="w-6 h-6 text-[#e53935]" />
      case "warning":
        return <AlertCircle className="w-6 h-6 text-[#fbc02d]" />
      case "info":
        return <Info className="w-6 h-6 text-[#1e88e5]" />
      default:
        return <Info className="w-6 h-6 text-[#1e88e5]" />
    }
  }

  const getStyles = () => {
    switch (type) {
      case "success":
        return "bg-white border-l-4 border-[#43a047] shadow-lg"
      case "error":
        return "bg-white border-l-4 border-[#e53935] shadow-lg"
      case "warning":
        return "bg-white border-l-4 border-[#fbc02d] shadow-lg"
      case "info":
        return "bg-white border-l-4 border-[#1e88e5] shadow-lg"
      default:
        return "bg-white border-l-4 border-[#1e88e5] shadow-lg"
    }
  }

  return (
    <motion.div
      className={`${getStyles()} rounded-lg p-4 mb-4 max-w-md w-full`}
      initial={{ opacity: 0, x: 400, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 400, scale: 0.8 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      layout
    >
      <div className="flex items-start space-x-3">
        <motion.div
          className="flex-shrink-0"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {getIcon()}
        </motion.div>

        <div className="flex-1 min-w-0">
          <motion.h4
            className="text-sm font-semibold text-[#3c3c3c] mb-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {title}
          </motion.h4>
          <motion.p
            className="text-sm text-gray-600 leading-relaxed"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {message}
          </motion.p>
        </div>

        <motion.button
          onClick={() => onClose(id)}
          className="flex-shrink-0 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
        </motion.button>
      </div>

      {/* Progress bar */}
      <motion.div
        className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          className={`h-full ${type === "success" ? "bg-[#43a047]" : type === "error" ? "bg-[#e53935]" : type === "warning" ? "bg-[#fbc02d]" : "bg-[#1e88e5]"}`}
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: duration / 1000, ease: "linear" }}
        />
      </motion.div>
    </motion.div>
  )
}

export interface ToastContainerProps {
  toasts: ToastProps[]
  onClose: (id: string) => void
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={onClose} />
        ))}
      </AnimatePresence>
    </div>
  )
}
