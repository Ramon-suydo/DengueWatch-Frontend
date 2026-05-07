import React, { useState, useRef, useEffect } from 'react';
import { Search, X, MapPin, AlertCircle } from 'lucide-react';

/**
 * Location Search & Filter Component
 */
export const LocationSearch = ({ 
  onSearch,
  onFilter,
  placeholder = 'Search cities, barangays...',
  results = []
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (query.trim()) {
      // Filter results based on query
      const filtered = results.filter(r =>
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.type.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(filtered);
      setIsOpen(true);
    } else {
      setFilteredResults([]);
      setIsOpen(false);
    }
  }, [query, results]);

  const handleSelect = (result) => {
    onSearch?.(result);
    setQuery('');
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setQuery('');
    setFilteredResults([]);
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        background: 'white',
        border: '2px solid #e5e7eb',
        borderRadius: '12px',
        transition: 'all 0.3s ease'
      }}
      onFocus={() => query && setIsOpen(true)}>
        <Search size={20} color="#999" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '14px',
            background: 'transparent'
          }}
          onFocus={() => query && setIsOpen(true)}
        />
        {query && (
          <button
            onClick={handleClear}
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
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && filteredResults.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          marginTop: '4px',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          {filteredResults.map((result, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(result)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                background: idx % 2 === 0 ? 'white' : '#f9fafb',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'background 0.2s',
                ':hover': { background: '#f3f4f6' }
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
              onMouseLeave={(e) => e.currentTarget.style.background = idx % 2 === 0 ? 'white' : '#f9fafb'}
            >
              <MapPin size={16} color="#3b82f6" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a2e' }}>
                  {result.name}
                </div>
                <div style={{ fontSize: '11px', color: '#999' }}>
                  {result.type}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen && query && filteredResults.length === 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          marginTop: '4px',
          zIndex: 1000,
          padding: '24px',
          textAlign: 'center',
          color: '#999'
        }}>
          No results found
        </div>
      )}
    </div>
  );
};

/**
 * Filter Chips/Tags
 */
export const FilterChips = ({ 
  options = [],
  selectedFilter,
  onFilterChange
}) => {
  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      overflowX: 'auto',
      paddingBottom: '8px',
      '::-webkit-scrollbar': { height: '4px' },
      '::-webkit-scrollbar-track': { background: '#f1f5f9' },
      '::-webkit-scrollbar-thumb': { background: '#cbd5e1', borderRadius: '2px' }
    }}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onFilterChange(option.value)}
          style={{
            padding: '8px 14px',
            borderRadius: '20px',
            border: selectedFilter === option.value ? 'none' : '1px solid #e5e7eb',
            background: selectedFilter === option.value ? '#3b82f6' : 'white',
            color: selectedFilter === option.value ? 'white' : '#666',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (selectedFilter !== option.value) {
              e.currentTarget.style.borderColor = '#3b82f6';
              e.currentTarget.style.color = '#3b82f6';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedFilter !== option.value) {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.color = '#666';
            }
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

/**
 * Badge Component
 */
export const Badge = ({ 
  label,
  variant = 'primary', // primary, success, warning, danger, info
  size = 'md' // sm, md, lg
}) => {
  const variants = {
    primary: { bg: '#eff6ff', text: '#1e40af', border: '#dbeafe' },
    success: { bg: '#f0fdf4', text: '#166534', border: '#bbf7d0' },
    warning: { bg: '#fffbf0', text: '#92400e', border: '#fed7aa' },
    danger: { bg: '#fef2f2', text: '#991b1b', border: '#fecaca' },
    info: { bg: '#f0f7ff', text: '#0369a1', border: '#cffafe' }
  };

  const sizes = {
    sm: { padding: '4px 8px', fontSize: '11px' },
    md: { padding: '6px 12px', fontSize: '12px' },
    lg: { padding: '8px 16px', fontSize: '13px' }
  };

  const style = variants[variant];
  const size_style = sizes[size];

  return (
    <span style={{
      display: 'inline-block',
      background: style.bg,
      color: style.text,
      border: `1px solid ${style.border}`,
      borderRadius: '6px',
      fontWeight: '600',
      ...size_style
    }}>
      {label}
    </span>
  );
};

/**
 * Status Indicator
 */
export const StatusIndicator = ({ 
  status = 'online', // online, offline, idle, busy
  label = ''
}) => {
  const statusColors = {
    online: '#10b981',
    offline: '#999',
    idle: '#f59e0b',
    busy: '#ef4444'
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }}>
      <div style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: statusColors[status],
        animation: status === 'online' ? 'pulse 2s infinite' : 'none'
      }}>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>
      {label && (
        <span style={{
          fontSize: '12px',
          color: '#666',
          fontWeight: '500'
        }}>
          {label}
        </span>
      )}
    </div>
  );
};
