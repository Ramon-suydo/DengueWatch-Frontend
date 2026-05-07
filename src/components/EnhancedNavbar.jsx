import React, { useState } from 'react';
import { Bell, User, LogOut, Menu, X, Home, Map, AlertCircle, BarChart3, MessageSquare } from 'lucide-react';

/**
 * Enhanced Navbar Component
 */
export const EnhancedNavbar = ({ 
  userName = 'User',
  notifications = [],
  onLogout,
  currentPage = 'dashboard'
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const menuItems = [
    { label: 'Dashboard', icon: Home, path: '/dashboard' },
    { label: 'Map', icon: Map, path: '/map' },
    { label: 'Alerts', icon: AlertCircle, path: '/alerts' },
    { label: 'Analytics', icon: BarChart3, path: '/analytics' },
    { label: 'Chat', icon: MessageSquare, path: '/chat' }
  ];

  return (
    <nav style={{
      background: 'white',
      borderBottom: '1px solid #e5e7eb',
      padding: '0 20px',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 100,
      position: 'sticky',
      top: 0,
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      {/* Logo/Brand */}
      <div style={{
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#1a1a2e',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold'
        }}>
          D
        </div>
        <span style={{ display: 'flex', alignItems: 'center' }}>
          DengueWatch
        </span>
      </div>

      {/* Desktop Navigation */}
      <div style={{
        display: 'none',
        gap: '8px',
        '@media (min-width: 768px)': { display: 'flex' }
      }} className="hidden md:flex gap-2">
        {menuItems.map(item => (
          <a
            key={item.path}
            href={item.path}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '500',
              color: currentPage === item.path.split('/')[1] ? '#3b82f6' : '#666',
              textDecoration: 'none',
              transition: 'all 0.2s',
              background: currentPage === item.path.split('/')[1] ? '#f0f7ff' : 'transparent'
            }}
            onMouseEnter={(e) => {
              if (currentPage !== item.path.split('/')[1]) {
                e.currentTarget.style.background = '#f9fafb';
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== item.path.split('/')[1]) {
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            <item.icon size={16} />
            <span>{item.label}</span>
          </a>
        ))}
      </div>

      {/* Right Actions */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        {/* Notifications Bell */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setIsNotificationsOpen(!isNotificationsOpen);
              setIsUserMenuOpen(false);
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              borderRadius: '8px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
          >
            <Bell size={20} color={unreadCount > 0 ? '#ef4444' : '#666'} />
            {unreadCount > 0 && (
              <div style={{
                position: 'absolute',
                top: '2px',
                right: '2px',
                background: '#ef4444',
                color: 'white',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 'bold'
              }}>
                {unreadCount > 9 ? '9+' : unreadCount}
              </div>
            )}
          </button>

          {/* Notifications Dropdown */}
          {isNotificationsOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: '0',
              background: 'white',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              marginTop: '8px',
              width: '320px',
              maxHeight: '400px',
              overflowY: 'auto',
              zIndex: 1000,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                padding: '12px 16px',
                borderBottom: '1px solid #e5e7eb',
                fontWeight: '600',
                fontSize: '13px',
                color: '#1a1a2e'
              }}>
                Notifications
              </div>

              {notifications.length > 0 ? (
                <div>
                  {notifications.slice(0, 5).map((notif, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '12px 16px',
                        borderBottom: idx < 4 ? '1px solid #f3f4f6' : 'none',
                        background: notif.read ? 'white' : '#f0f7ff',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                      onMouseLeave={(e) => e.currentTarget.style.background = notif.read ? 'white' : '#f0f7ff'}
                    >
                      <div style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#1a1a2e',
                        marginBottom: '4px'
                      }}>
                        {notif.title}
                      </div>
                      <div style={{
                        fontSize: '11px',
                        color: '#666',
                        marginBottom: '4px'
                      }}>
                        {notif.message}
                      </div>
                      <div style={{
                        fontSize: '10px',
                        color: '#999'
                      }}>
                        {notif.time}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{
                  padding: '32px 16px',
                  textAlign: 'center',
                  color: '#999',
                  fontSize: '12px'
                }}>
                  No notifications
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Menu */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setIsUserMenuOpen(!isUserMenuOpen);
              setIsNotificationsOpen(false);
            }}
            style={{
              background: '#f3f4f6',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 12px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              fontWeight: '600',
              color: '#1a1a2e',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#e5e7eb'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#f3f4f6'}
          >
            <User size={16} />
            <span style={{ display: 'none', '@media (min-width: 640px)': { display: 'inline' } }}>
              {userName}
            </span>
          </button>

          {/* User Dropdown */}
          {isUserMenuOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: '0',
              background: 'white',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              marginTop: '8px',
              width: '200px',
              zIndex: 1000,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}>
              <button
                onClick={onLogout}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: 'none',
                  background: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '13px',
                  color: '#ef4444',
                  fontWeight: '600',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#fef2f2'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            transition: 'all 0.2s'
          }}
          className="md:hidden"
          onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '64px',
          left: 0,
          right: 0,
          background: 'white',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 99
        }}>
          {menuItems.map(item => (
            <a
              key={item.path}
              href={item.path}
              style={{
                padding: '12px 20px',
                borderBottom: '1px solid #f3f4f6',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: currentPage === item.path.split('/')[1] ? '#3b82f6' : '#666',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '600',
                background: currentPage === item.path.split('/')[1] ? '#f0f7ff' : 'white'
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              <item.icon size={18} />
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default EnhancedNavbar;
