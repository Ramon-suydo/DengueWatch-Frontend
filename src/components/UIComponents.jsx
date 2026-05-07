import React from 'react';
import { AlertCircle, FileText, Search, Inbox, TrendingUp } from 'lucide-react';

/**
 * Empty State Component
 */
export const EmptyState = ({ 
  icon: Icon = AlertCircle,
  title = 'No Data',
  description = 'There is no data to display',
  action = null,
  variant = 'default' // default, search, error
}) => {
  const getIcon = () => {
    switch(variant) {
      case 'search':
        return <Search size={48} />;
      case 'error':
        return <AlertCircle size={48} />;
      case 'empty':
        return <Inbox size={48} />;
      default:
        return Icon && <Icon size={48} />;
    }
  };

  const getColor = () => {
    switch(variant) {
      case 'error':
        return '#ef4444';
      case 'search':
        return '#3b82f6';
      case 'empty':
        return '#f59e0b';
      default:
        return '#999';
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 20px',
      minHeight: '400px',
      textAlign: 'center'
    }}>
      <div style={{ 
        color: getColor(),
        marginBottom: '20px',
        opacity: 0.6
      }}>
        {getIcon()}
      </div>
      
      <h3 style={{
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#1a1a2e',
        marginBottom: '8px'
      }}>
        {title}
      </h3>

      <p style={{
        fontSize: '14px',
        color: '#666',
        marginBottom: '24px',
        maxWidth: '300px',
        lineHeight: '1.6'
      }}>
        {description}
      </p>

      {action && (
        <button
          onClick={action.onClick}
          style={{
            padding: '10px 20px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#2563eb';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#3b82f6';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

/**
 * Progress Bar with Label
 */
export const ProgressBar = ({ 
  value = 0,
  max = 100,
  label = '',
  showPercent = true,
  color = 'blue'
}) => {
  const percentage = (value / max) * 100;

  const colorMap = {
    blue: '#3b82f6',
    green: '#10b981',
    red: '#ef4444',
    orange: '#f97316',
    purple: '#8b5cf6'
  };

  return (
    <div style={{ width: '100%' }}>
      {(label || showPercent) && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px',
          fontSize: '13px',
          fontWeight: '600',
          color: '#666'
        }}>
          <span>{label}</span>
          {showPercent && <span>{Math.round(percentage)}%</span>}
        </div>
      )}
      <div style={{
        width: '100%',
        height: '8px',
        background: '#e5e7eb',
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <div
          style={{
            height: '100%',
            width: `${percentage}%`,
            background: colorMap[color],
            borderRadius: '4px',
            transition: 'width 0.5s ease',
            boxShadow: `0 0 10px ${colorMap[color]}80`
          }}
        />
      </div>
    </div>
  );
};

/**
 * Timeline Component
 */
export const Timeline = ({ items = [] }) => {
  return (
    <div style={{ position: 'relative', paddingLeft: '30px' }}>
      {items.map((item, idx) => (
        <div key={idx} style={{ marginBottom: '24px', position: 'relative' }}>
          {/* Timeline dot */}
          <div style={{
            position: 'absolute',
            left: '-37px',
            top: '2px',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: item.color || '#3b82f6',
            border: '3px solid white',
            boxShadow: '0 0 0 2px #e5e7eb'
          }} />

          {/* Timeline connector */}
          {idx < items.length - 1 && (
            <div style={{
              position: 'absolute',
              left: '-31px',
              top: '16px',
              width: '2px',
              height: '24px',
              background: '#e5e7eb'
            }} />
          )}

          {/* Content */}
          <div>
            <div style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#1a1a2e',
              marginBottom: '4px'
            }}>
              {item.title}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#666',
              marginBottom: '4px'
            }}>
              {item.description}
            </div>
            <div style={{
              fontSize: '11px',
              color: '#999'
            }}>
              {item.timestamp}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Card Component with Hover Effect
 */
export const Card = ({ 
  title,
  description,
  footer,
  onClick,
  hoverEffect = true,
  children
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'white',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        padding: '20px',
        transition: 'all 0.3s ease',
        cursor: onClick ? 'pointer' : 'default',
        transform: hoverEffect && isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hoverEffect && isHovered 
          ? '0 8px 16px rgba(0,0,0,0.1)' 
          : '0 1px 2px rgba(0,0,0,0.05)'
      }}
    >
      {title && (
        <h3 style={{
          fontSize: '15px',
          fontWeight: 'bold',
          color: '#1a1a2e',
          marginBottom: '8px'
        }}>
          {title}
        </h3>
      )}

      {description && (
        <p style={{
          fontSize: '13px',
          color: '#666',
          marginBottom: '12px',
          lineHeight: '1.5'
        }}>
          {description}
        </p>
      )}

      {children}

      {footer && (
        <div style={{
          marginTop: '16px',
          paddingTop: '16px',
          borderTop: '1px solid #e5e7eb',
          fontSize: '12px',
          color: '#999'
        }}>
          {footer}
        </div>
      )}
    </div>
  );
};

/**
 * Notification Badge
 */
export const NotificationBadge = ({ count = 0, maxDisplay = 9 }) => {
  if (count === 0) return null;

  const displayCount = count > maxDisplay ? `${maxDisplay}+` : count;

  return (
    <div style={{
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      background: '#ef4444',
      color: 'white',
      borderRadius: '50%',
      width: '24px',
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '11px',
      fontWeight: 'bold',
      border: '2px solid white',
      animation: 'bounce 2s infinite',
      boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)'
    }}>
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
      {displayCount}
    </div>
  );
};

/**
 * Tooltip Component
 */
export const Tooltip = ({ text, children, position = 'top' }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const positionStyles = {
    top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '8px' },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '8px' },
    left: { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: '8px' },
    right: { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: '8px' }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>

      {isVisible && (
        <div style={{
          position: 'absolute',
          background: '#1a1a2e',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '12px',
          whiteSpace: 'nowrap',
          zIndex: 1000,
          ...positionStyles[position],
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}>
          {text}
        </div>
      )}
    </div>
  );
};
