import React, { useEffect, useState } from 'react';
import { TrendingUp, AlertCircle, Activity, Users } from 'lucide-react';

/**
 * Animated Counter Component
 * Counts from 0 to target value over duration
 */
const AnimatedCounter = ({ 
  target = 100, 
  duration = 2000, 
  label = '', 
  suffix = '', 
  icon: Icon = null,
  color = 'blue'
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const increment = target / (duration / 16);

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setCount(Math.floor(target * progress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  const colorClasses = {
    blue: 'text-blue-600',
    red: 'text-red-600',
    green: 'text-green-600',
    orange: 'text-orange-600',
    purple: 'text-purple-600'
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      gap: '8px'
    }}>
      {Icon && <Icon size={28} className={colorClasses[color]} />}
      <div style={{
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#1a1a2e'
      }}>
        {count.toLocaleString()}{suffix}
      </div>
      {label && (
        <div style={{
          fontSize: '13px',
          color: '#666',
          fontWeight: '500'
        }}>
          {label}
        </div>
      )}
    </div>
  );
};

/**
 * Stats Card Grid Component
 */
export const StatsCard = ({ icon: Icon, label, value, color = 'blue', trend = null }) => {
  const colorMap = {
    blue: { bg: '#eff6ff', border: '#dbeafe', text: '#1e40af' },
    red: { bg: '#fef2f2', border: '#fecaca', text: '#991b1b' },
    green: { bg: '#f0fdf4', border: '#bbf7d0', text: '#166534' },
    orange: { bg: '#fffbf0', border: '#fed7aa', text: '#92400e' },
    purple: { bg: '#faf5ff', border: '#e9d5ff', text: '#6b21a8' }
  };

  const colors = colorMap[color];

  return (
    <div style={{
      background: colors.bg,
      border: `2px solid ${colors.border}`,
      borderRadius: '12px',
      padding: '20px',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: '16px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      ':hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}>
      <div>
        <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px', fontWeight: '500' }}>
          {label}
        </div>
        <div style={{ fontSize: '28px', fontWeight: 'bold', color: colors.text, marginBottom: '8px' }}>
          {value}
        </div>
        {trend && (
          <div style={{
            fontSize: '12px',
            color: trend.direction === 'up' ? '#dc2626' : '#16a34a',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <TrendingUp size={14} />
            {trend.value} from last week
          </div>
        )}
      </div>
      {Icon && <Icon size={32} color={colors.text} style={{ opacity: 0.6, minWidth: '32px' }} />}
    </div>
  );
};

/**
 * Risk Meter - Animated circular progress
 */
export const RiskMeter = ({ percentage = 50, label = '', size = 120 }) => {
  const [displayPercent, setDisplayPercent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setDisplayPercent(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const getRiskColor = () => {
    if (percentage >= 70) return '#ef4444';
    if (percentage >= 40) return '#f97316';
    if (percentage >= 20) return '#eab308';
    return '#22c55e';
  };

  const getRiskLevel = () => {
    if (percentage >= 70) return 'High';
    if (percentage >= 40) return 'Medium-High';
    if (percentage >= 20) return 'Medium';
    return 'Low';
  };

  const circumference = 2 * Math.PI * (size / 2 - 8);
  const strokeDashoffset = circumference - (displayPercent / 100) * circumference;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px'
    }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 8}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 8}
            fill="none"
            stroke={getRiskColor()}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 1s ease-out',
              filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.1))'
            }}
          />
        </svg>
        {/* Center text */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: getRiskColor()
          }}>
            {displayPercent}%
          </div>
          <div style={{
            fontSize: '11px',
            color: '#666',
            fontWeight: '600',
            marginTop: '4px'
          }}>
            Risk
          </div>
        </div>
      </div>
      <div style={{
        textAlign: 'center'
      }}>
        {label && <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>{label}</div>}
        <div style={{
          fontSize: '12px',
          fontWeight: '600',
          color: getRiskColor(),
          padding: '4px 8px',
          borderRadius: '4px',
          background: getRiskColor() === '#ef4444' ? '#fef2f2' : 
                     getRiskColor() === '#f97316' ? '#fffbf0' :
                     getRiskColor() === '#eab308' ? '#fefce8' : '#f0fdf4'
        }}>
          {getRiskLevel()}
        </div>
      </div>
    </div>
  );
};

/**
 * Activity Feed Item
 */
export const ActivityFeedItem = ({ 
  type = 'alert', // alert, update, warning
  title,
  description,
  timestamp,
  avatar
}) => {
  const getIcon = () => {
    switch(type) {
      case 'alert':
        return <AlertCircle size={20} color="#ef4444" />;
      case 'update':
        return <Activity size={20} color="#3b82f6" />;
      case 'warning':
        return <AlertCircle size={20} color="#f97316" />;
      default:
        return <Activity size={20} color="#666" />;
    }
  };

  return (
    <div style={{
      display: 'flex',
      gap: '12px',
      padding: '12px',
      borderRadius: '8px',
      background: '#f9fafb',
      borderLeft: `4px solid ${type === 'alert' ? '#ef4444' : type === 'warning' ? '#f97316' : '#3b82f6'}`
    }}>
      <div style={{ minWidth: '24px', display: 'flex', alignItems: 'flex-start', marginTop: '2px' }}>
        {getIcon()}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: '13px',
          fontWeight: '600',
          color: '#1a1a2e',
          marginBottom: '2px'
        }}>
          {title}
        </div>
        <div style={{
          fontSize: '12px',
          color: '#666',
          marginBottom: '6px',
          lineHeight: '1.4'
        }}>
          {description}
        </div>
        <div style={{
          fontSize: '11px',
          color: '#999'
        }}>
          {timestamp}
        </div>
      </div>
    </div>
  );
};

/**
 * Quick Action Button
 */
export const QuickActionButton = ({ 
  icon: Icon, 
  label, 
  onClick,
  variant = 'primary' // primary, secondary, danger
}) => {
  const variants = {
    primary: { bg: '#3b82f6', hoverBg: '#2563eb', text: 'white' },
    secondary: { bg: '#e5e7eb', hoverBg: '#d1d5db', text: '#1a1a2e' },
    danger: { bg: '#ef4444', hoverBg: '#dc2626', text: 'white' }
  };

  const style = variants[variant];

  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        padding: '16px',
        background: style.bg,
        color: style.text,
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontSize: '13px',
        fontWeight: '600',
        minWidth: '100px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = style.hoverBg;
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = style.bg;
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
};

export { AnimatedCounter };
