import { useState, useCallback } from 'react'

interface Notification {
  id: number
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}

export function useNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [nextId, setNextId] = useState(1)

  const addNotification = useCallback((message: string, type: Notification['type'], duration = 5000) => {
    const id = nextId
    setNextId(id + 1)

    setNotifications(prev => [...prev, { id, message, type }])

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }

    return id
  }, [nextId])

  const removeNotification = useCallback((id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }, [])

  const showSuccess = useCallback((message: string, duration?: number) => {
    return addNotification(message, 'success', duration)
  }, [addNotification])

  const showError = useCallback((message: string, duration?: number) => {
    return addNotification(message, 'error', duration)
  }, [addNotification])

  const showInfo = useCallback((message: string, duration?: number) => {
    return addNotification(message, 'info', duration)
  }, [addNotification])

  const showWarning = useCallback((message: string, duration?: number) => {
    return addNotification(message, 'warning', duration)
  }, [addNotification])

  return {
    notifications,
    removeNotification,
    showSuccess,
    showError,
    showInfo,
    showWarning
  }
} 