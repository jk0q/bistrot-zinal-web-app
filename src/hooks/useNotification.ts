import { useState, useCallback, useRef, useEffect } from 'react'

interface Notification {
  id: number
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}

export function useNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [nextId, setNextId] = useState(1)
  const timeoutsRef = useRef<{ [key: number]: number }>({})

  // Nettoyer les timeouts lors du démontage
  useEffect(() => {
    return () => {
      Object.values(timeoutsRef.current).forEach(timeout => {
        clearTimeout(timeout)
      })
    }
  }, [])

  const addNotification = useCallback((message: string, type: Notification['type'], duration = 5000) => {
    const id = nextId
    setNextId(id + 1)

    setNotifications(prev => [...prev, { id, message, type }])

    if (duration > 0) {
      const timeout = setTimeout(() => {
        removeNotification(id)
      }, duration)
      timeoutsRef.current[id] = timeout
    }

    return id
  }, [nextId])

  const removeNotification = useCallback((id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
    
    // Nettoyer le timeout associé
    if (timeoutsRef.current[id]) {
      clearTimeout(timeoutsRef.current[id])
      delete timeoutsRef.current[id]
    }
  }, [])

  const showSuccess = useCallback((message: string, duration?: number) => {
    return Promise.resolve(addNotification(message, 'success', duration))
  }, [addNotification])

  const showError = useCallback((message: string, duration?: number) => {
    return Promise.resolve(addNotification(message, 'error', duration))
  }, [addNotification])

  const showInfo = useCallback((message: string, duration?: number) => {
    return Promise.resolve(addNotification(message, 'info', duration))
  }, [addNotification])

  const showWarning = useCallback((message: string, duration?: number) => {
    return Promise.resolve(addNotification(message, 'warning', duration))
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