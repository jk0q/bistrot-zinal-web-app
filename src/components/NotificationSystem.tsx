import React from 'react'

interface Notification {
  id: number
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}

interface NotificationSystemProps {
  notifications: Notification[]
  onClose: (id: number) => void
}

const getBackgroundColor = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return '#51cf66'
    case 'error':
      return '#ff6b6b'
    case 'warning':
      return '#ffd43b'
    case 'info':
    default:
      return '#228be6'
  }
}

export default function NotificationSystem({ notifications, onClose }: NotificationSystemProps) {
  return (
    <div style={{ 
      position: 'fixed', 
      top: '1rem', 
      right: '1rem', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '0.5rem',
      zIndex: 1000
    }}>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          style={{
            backgroundColor: getBackgroundColor(notification.type),
            color: 'white',
            padding: '1rem',
            borderRadius: '4px',
            minWidth: '200px',
            maxWidth: '400px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          <span>{notification.message}</span>
          <button
            onClick={() => onClose(notification.id)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '0.25rem',
              marginLeft: '0.5rem',
              fontSize: '1.2rem'
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
} 