import React, { createContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now();
    const toast = { id, message, type };

    setToasts(prev => [...prev, toast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, removeToast, toasts }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      maxWidth: '400px'
    }}>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

const Toast = ({ toast, onClose }) => {
  const getStyles = () => {
    const baseStyle = {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '14px 16px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      background: 'white',
      color: '#1a1a2e',
      fontSize: '14px',
      animation: 'slideIn 0.3s ease-out',
      minWidth: '300px'
    };

    const typeStyles = {
      success: {
        borderLeft: '4px solid #10b981',
        background: '#f0fdf4'
      },
      error: {
        borderLeft: '4px solid #ef4444',
        background: '#fef2f2'
      },
      warning: {
        borderLeft: '4px solid #f59e0b',
        background: '#fffbf0'
      },
      info: {
        borderLeft: '4px solid #3b82f6',
        background: '#f0f7ff'
      }
    };

    return { ...baseStyle, ...typeStyles[toast.type] };
  };

  const getIcon = () => {
    const iconProps = { size: 20 };
    const colors = {
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6'
    };

    const iconColor = colors[toast.type];

    switch (toast.type) {
      case 'success':
        return <CheckCircle size={20} color={iconColor} />;
      case 'error':
        return <AlertCircle size={20} color={iconColor} />;
      case 'warning':
        return <AlertCircle size={20} color={iconColor} />;
      case 'info':
      default:
        return <Info size={20} color={iconColor} />;
    }
  };

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(400px);
            opacity: 0;
          }
        }
      `}</style>
      <div style={getStyles()}>
        {getIcon()}
        <span style={{ flex: 1 }}>{toast.message}</span>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#999'
          }}
          aria-label="Close notification"
        >
          <X size={18} />
        </button>
      </div>
    </>
  );
};

export default ToastProvider;
