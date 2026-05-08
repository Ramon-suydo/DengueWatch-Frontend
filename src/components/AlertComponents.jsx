import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, X, Bell, Clock } from 'lucide-react';
import { FadeInWrapper } from './Animations';

/**
 * Alert Card Component
 */
export const AlertCard = ({ 
  title = 'Alert', 
  message = '', 
  type = 'info', // 'info', 'success', 'warning', 'error'
  dismissible = true,
  onDismiss = null,
  action = null,
  icon: Icon = null
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const typeStyles = {
    info: { bg: '#e3f2fd', border: '#2196f3', text: '#1565c0', icon: Info },
    success: { bg: '#e8f5e9', border: '#4caf50', text: '#2e7d32', icon: CheckCircle },
    warning: { bg: '#fff3e0', border: '#ff9800', text: '#e65100', icon: AlertCircle },
    error: { bg: '#ffebee', border: '#f44336', text: '#c62828', icon: XCircle }
  };

  const style = typeStyles[type] || typeStyles.info;
  const IconComponent = Icon || style.icon;

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };

  if (!isVisible) return null;

  return (
    <FadeInWrapper>
      <div style={{
        background: style.bg,
        border: `2px solid ${style.border}`,
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start'
      }}>
        <IconComponent size={20} style={{ color: style.text, flexShrink: 0, marginTop: '2px' }} />
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 4px 0', color: style.text, fontWeight: '600', fontSize: '14px' }}>
            {title}
          </h3>
          {message && (
            <p style={{ margin: '0', color: style.text, fontSize: '13px', opacity: 0.9 }}>
              {message}
            </p>
          )}
          {action && (
            <button
              onClick={action.onClick}
              style={{
                marginTop: '8px',
                padding: '4px 12px',
                background: style.border,
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.8'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              {action.label}
            </button>
          )}
        </div>
        {dismissible && (
          <button
            onClick={handleDismiss}
            style={{
              background: 'transparent',
              border: 'none',
              color: style.text,
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Dismiss alert"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </FadeInWrapper>
  );
};

/**
 * Notification Item Component
 */
export const NotificationItem = ({ 
  id,
  title = '',
  message = '',
  type = 'info',
  timestamp = '',
  read = false,
  onRead = null,
  onDismiss = null
}) => {
  const typeIcons = {
    info: <Info size={16} />,
    alert: <AlertCircle size={16} />,
    success: <CheckCircle size={16} />,
    warning: <AlertCircle size={16} />,
    error: <XCircle size={16} />
  };

  const typeColors = {
    info: '#3b82f6',
    alert: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  };

  const handleClick = () => {
    if (!read && onRead) {
      onRead(id);
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        padding: '12px 16px',
        borderLeft: `4px solid ${typeColors[type]}`,
        background: read ? 'transparent' : '#f9f9f9',
        cursor: 'pointer',
        transition: 'all 0.2s',
        borderBottom: '1px solid #f0f0f0'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#f5f5f5';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = read ? 'transparent' : '#f9f9f9';
      }}
    >
      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        <div style={{ color: typeColors[type], marginTop: '2px' }}>
          {typeIcons[type]}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
            <h4 style={{ 
              margin: '0 0 4px 0', 
              fontSize: '13px', 
              fontWeight: read ? '500' : '600',
              color: '#1a1a1a'
            }}>
              {title}
            </h4>
            {!read && (
              <div style={{
                width: '8px',
                height: '8px',
                background: typeColors[type],
                borderRadius: '50%',
                flexShrink: 0,
                marginTop: '4px'
              }} />
            )}
          </div>
          {message && (
            <p style={{ 
              margin: '0 0 6px 0', 
              fontSize: '12px', 
              color: '#666',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {message}
            </p>
          )}
          {timestamp && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#999' }}>
              <Clock size={11} />
              {timestamp}
            </div>
          )}
        </div>
        {onDismiss && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDismiss(id);
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#999',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Notification Center Component
 */
export const NotificationCenter = ({ 
  notifications = [],
  onMarkAsRead = null,
  onDismiss = null,
  maxHeight = 400,
  showUnreadCount = true
}) => {
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'alerts', 'info'

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'alerts') return ['alert', 'warning', 'error'].includes(n.type);
    if (filter === 'info') return ['info', 'success'].includes(n.type);
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const tabs = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: unreadCount },
    { id: 'alerts', label: 'Alerts', count: notifications.filter(n => ['alert', 'warning', 'error'].includes(n.type)).length },
    { id: 'info', label: 'Info', count: notifications.filter(n => ['info', 'success'].includes(n.type)).length }
  ];

  return (
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      border: '1px solid #e5e5e5',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '100%'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid #f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bell size={18} style={{ color: '#1a1a1a' }} />
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#1a1a1a' }}>
            Notifications
          </h3>
          {showUnreadCount && unreadCount > 0 && (
            <span style={{
              background: '#ef4444',
              color: 'white',
              borderRadius: '12px',
              padding: '2px 8px',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '0',
        borderBottom: '1px solid #f0f0f0',
        background: '#f9f9f9',
        padding: '0 16px'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            style={{
              padding: '12px 16px',
              background: 'transparent',
              border: 'none',
              borderBottom: filter === tab.id ? '2px solid #3b82f6' : '2px solid transparent',
              color: filter === tab.id ? '#3b82f6' : '#666',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: filter === tab.id ? '600' : '500',
              transition: 'all 0.2s'
            }}
          >
            {tab.label} <span style={{ fontSize: '11px', marginLeft: '4px', opacity: 0.7 }}>({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div style={{
        overflowY: 'auto',
        maxHeight: `${maxHeight}px`,
        flex: 1
      }}>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(notification => (
            <NotificationItem
              key={notification.id}
              {...notification}
              onRead={onMarkAsRead}
              onDismiss={onDismiss}
            />
          ))
        ) : (
          <div style={{
            padding: '32px 16px',
            textAlign: 'center',
            color: '#999'
          }}>
            <Bell size={32} style={{ opacity: 0.5, margin: '0 auto 12px' }} />
            <p style={{ margin: 0, fontSize: '13px' }}>
              No {filter !== 'all' ? filter : ''} notifications
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Quick Notification Banner
 */
export const NotificationBanner = ({ 
  title = '',
  message = '',
  type = 'info',
  duration = 5000,
  onClose = null,
  action = null
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  const typeStyles = {
    info: { bg: '#e3f2fd', border: '#2196f3', text: '#1565c0' },
    success: { bg: '#e8f5e9', border: '#4caf50', text: '#2e7d32' },
    warning: { bg: '#fff3e0', border: '#ff9800', text: '#e65100' },
    error: { bg: '#ffebee', border: '#f44336', text: '#c62828' }
  };

  const style = typeStyles[type] || typeStyles.info;

  return (
    <FadeInWrapper>
      <div style={{
        background: style.bg,
        border: `1px solid ${style.border}`,
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        <div>
          {title && (
            <h4 style={{ 
              margin: '0 0 4px 0', 
              fontSize: '14px', 
              fontWeight: '600',
              color: style.text
            }}>
              {title}
            </h4>
          )}
          {message && (
            <p style={{ 
              margin: 0, 
              fontSize: '13px', 
              color: style.text,
              opacity: 0.9
            }}>
              {message}
            </p>
          )}
        </div>
        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
          {action && (
            <button
              onClick={action.onClick}
              style={{
                padding: '6px 12px',
                background: style.border,
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.8'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              {action.label}
            </button>
          )}
          <button
            onClick={() => setIsVisible(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: style.text,
              cursor: 'pointer',
              padding: '4px 8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Close notification"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </FadeInWrapper>
  );
};

export default {
  AlertCard,
  NotificationItem,
  NotificationCenter,
  NotificationBanner
};
