import React, { useState } from 'react';
import { TrendingUp, TrendingDown, ArrowUp, ArrowDown } from 'lucide-react';

/**
 * KPI Card - Key Performance Indicator Display
 */
export const KPICard = ({ 
  label = 'KPI',
  value = '0',
  unit = '',
  trend = null,
  trendValue = 0,
  target = null,
  icon: Icon = null,
  color = '#3b82f6',
  size = 'medium' // 'small', 'medium', 'large'
}) => {
  const sizeStyles = {
    small: { padding: '12px 16px', labelSize: '11px', valueSize: '18px' },
    medium: { padding: '16px', labelSize: '12px', valueSize: '28px' },
    large: { padding: '20px', labelSize: '13px', valueSize: '36px' }
  };

  const style = sizeStyles[size] || sizeStyles.medium;
  const trendDirection = trendValue > 0 ? 'up' : trendValue < 0 ? 'down' : null;
  const trendColor = trendDirection === 'up' ? '#ef4444' : '#10b981';

  return (
    <div style={{
      padding: style.padding,
      background: 'linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%)',
      borderRadius: '12px',
      border: `2px solid ${color}33`,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '80px',
        height: '80px',
        background: `${color}08`,
        borderRadius: '50%',
        transform: 'translate(30%, -30%)'
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <p style={{ margin: 0, fontSize: style.labelSize, color: '#999', fontWeight: '500' }}>
            {label}
          </p>
          {Icon && (
            <Icon size={20} style={{ color, opacity: 0.6 }} />
          )}
        </div>

        {/* Value */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span style={{ fontSize: style.valueSize, fontWeight: 'bold', color: '#1a1a1a' }}>
              {value}
            </span>
            {unit && (
              <span style={{ fontSize: style.labelSize, color: '#999' }}>
                {unit}
              </span>
            )}
          </div>
        </div>

        {/* Trend */}
        {trend !== null && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {trendDirection === 'up' ? (
              <ArrowUp size={14} style={{ color: trendColor }} />
            ) : trendDirection === 'down' ? (
              <ArrowDown size={14} style={{ color: trendColor }} />
            ) : null}
            <span style={{ fontSize: '11px', fontWeight: '600', color: trendColor }}>
              {trendValue > 0 ? '+' : ''}{trendValue}% {trend}
            </span>
          </div>
        )}

        {/* Target Progress */}
        {target && (
          <div style={{ marginTop: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '10px', color: '#999' }}>Target</span>
              <span style={{ fontSize: '10px', fontWeight: '600', color: '#1a1a1a' }}>
                {Math.round((parseInt(value) / target) * 100)}%
              </span>
            </div>
            <div style={{ height: '4px', background: '#f0f0f0', borderRadius: '2px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${Math.min((parseInt(value) / target) * 100, 100)}%`,
                  background: color,
                  transition: 'width 0.3s'
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Metric Gauge Component
 */
export const MetricGauge = ({ 
  label = 'Gauge',
  current = 50,
  max = 100,
  thresholds = [30, 60, 90],
  colors = ['#10b981', '#f59e0b', '#ef4444'],
  unit = '%'
}) => {
  const percentage = (current / max) * 100;
  
  let gaugeColor = colors[0];
  if (current >= thresholds[2]) gaugeColor = colors[2];
  else if (current >= thresholds[1]) gaugeColor = colors[1];

  return (
    <div style={{ textAlign: 'center' }}>
      <h4 style={{ margin: '0 0 16px 0', fontSize: '13px', fontWeight: '600', color: '#666' }}>
        {label}
      </h4>
      
      <svg width="120" height="120" viewBox="0 0 120 120" style={{ margin: '0 auto' }}>
        {/* Background */}
        <circle
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke="#f0f0f0"
          strokeWidth="8"
          strokeDasharray="314"
          strokeDashoffset="0"
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />

        {/* Progress */}
        <circle
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke={gaugeColor}
          strokeWidth="8"
          strokeDasharray={`${314 * (percentage / 100)} 314`}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
          style={{ transition: 'stroke-dasharray 0.3s' }}
        />

        {/* Center text */}
        <text x="60" y="60" textAnchor="middle" dominantBaseline="middle" style={{
          fontSize: '24px',
          fontWeight: 'bold',
          fill: '#1a1a1a'
        }}>
          {Math.round(current)}
        </text>
        <text x="60" y="75" textAnchor="middle" dominantBaseline="middle" style={{
          fontSize: '12px',
          fill: '#999'
        }}>
          {unit}
        </text>
      </svg>

      {/* Legend */}
      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px' }}>
          <div style={{ width: '8px', height: '8px', background: colors[0], borderRadius: '2px' }} />
          <span>Good</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px' }}>
          <div style={{ width: '8px', height: '8px', background: colors[1], borderRadius: '2px' }} />
          <span>Fair</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px' }}>
          <div style={{ width: '8px', height: '8px', background: colors[2], borderRadius: '2px' }} />
          <span>Critical</span>
        </div>
      </div>
    </div>
  );
};

/**
 * Metric with Change Indicator
 */
export const MetricCard = ({ 
  title = 'Metric',
  currentValue = 0,
  previousValue = null,
  unit = '',
  format = null, // function to format the value
  icon: Icon = null,
  color = '#3b82f6',
  onClick = null
}) => {
  const change = previousValue !== null ? currentValue - previousValue : null;
  const changePercent = previousValue !== null && previousValue !== 0 
    ? ((change / previousValue) * 100) 
    : null;
  
  const displayValue = format ? format(currentValue) : currentValue;
  const isPositive = change > 0;

  return (
    <div
      onClick={onClick}
      style={{
        padding: '20px',
        background: '#fff',
        border: `1px solid ${color}20`,
        borderRadius: '12px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={onClick ? (e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
      } : null}
      onMouseLeave={onClick ? (e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      } : null}
    >
      {/* Background accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '60px',
        height: '60px',
        background: `${color}08`,
        borderRadius: '50%',
        transform: 'translate(30%, -30%)'
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <h4 style={{ margin: 0, fontSize: '12px', color: '#999', fontWeight: '500' }}>
            {title}
          </h4>
          {Icon && <Icon size={16} style={{ color, opacity: 0.6 }} />}
        </div>

        {/* Main Value */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '12px' }}>
          <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a' }}>
            {displayValue}
          </span>
          {unit && <span style={{ fontSize: '12px', color: '#999' }}>{unit}</span>}
        </div>

        {/* Change Indicator */}
        {change !== null && changePercent !== null && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{
              padding: '4px 8px',
              background: isPositive ? '#fed7d7' : '#c6f6d5',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              {isPositive ? (
                <TrendingUp size={14} style={{ color: '#ef4444' }} />
              ) : (
                <TrendingDown size={14} style={{ color: '#10b981' }} />
              )}
              <span style={{
                fontSize: '11px',
                fontWeight: '600',
                color: isPositive ? '#ef4444' : '#10b981'
              }}>
                {isPositive ? '+' : ''}{changePercent.toFixed(1)}%
              </span>
            </div>
            <span style={{ fontSize: '11px', color: '#999' }}>
              vs previous
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Status Badge Component
 */
export const StatusBadge = ({ 
  status = 'neutral', // 'critical', 'warning', 'normal', 'good'
  label = 'Status',
  showPulse = false
}) => {
  const statusStyles = {
    critical: { bg: '#fed7d7', text: '#742a2a', dot: '#ef4444' },
    warning: { bg: '#feebc8', text: '#7c2d12', dot: '#f59e0b' },
    normal: { bg: '#e0e7ff', text: '#312e81', dot: '#6366f1' },
    good: { bg: '#c6f6d5', text: '#22543d', dot: '#10b981' }
  };

  const style = statusStyles[status] || statusStyles.normal;

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '6px 12px',
      background: style.bg,
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '600',
      color: style.text
    }}>
      <div style={{
        width: '8px',
        height: '8px',
        background: style.dot,
        borderRadius: '50%',
        animation: showPulse ? 'pulse 2s infinite' : 'none'
      }} />
      {label}
    </div>
  );
};

/**
 * Performance Score Component
 */
export const PerformanceScore = ({ 
  score = 75,
  maxScore = 100,
  metrics = []
}) => {
  const percentage = (score / maxScore) * 100;
  
  const getGrade = () => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  const getGradeColor = () => {
    const grade = getGrade();
    const colors = {
      A: '#10b981', B: '#3b82f6', C: '#f59e0b', D: '#f97316', F: '#ef4444'
    };
    return colors[grade] || '#999';
  };

  return (
    <div style={{
      padding: '24px',
      background: '#fff',
      borderRadius: '12px',
      border: '1px solid #e5e5e5',
      textAlign: 'center'
    }}>
      {/* Score Circle */}
      <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 20px' }}>
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" fill="none" stroke="#f0f0f0" strokeWidth="8" />
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke={getGradeColor()}
            strokeWidth="8"
            strokeDasharray={`${314 * (percentage / 100)} 314`}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
            style={{ transition: 'stroke-dasharray 0.3s' }}
          />
          <text x="60" y="65" textAnchor="middle" dominantBaseline="middle" style={{
            fontSize: '32px',
            fontWeight: 'bold',
            fill: getGradeColor()
          }}>
            {getGrade()}
          </text>
        </svg>
      </div>

      {/* Score Details */}
      <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600', color: '#1a1a1a' }}>
        {score} / {maxScore}
      </h3>
      <p style={{ margin: 0, fontSize: '12px', color: '#999' }}>
        Overall Performance
      </p>

      {/* Metrics Breakdown */}
      {metrics.length > 0 && (
        <div style={{ marginTop: '16px', textAlign: 'left' }}>
          {metrics.map((metric, idx) => (
            <div key={idx} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '12px' }}>
                <span style={{ color: '#666' }}>{metric.label}</span>
                <span style={{ fontWeight: '600', color: '#1a1a1a' }}>{metric.value}%</span>
              </div>
              <div style={{ height: '4px', background: '#f0f0f0', borderRadius: '2px' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${metric.value}%`,
                    background: metric.color || '#3b82f6',
                    borderRadius: '2px',
                    transition: 'width 0.3s'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default {
  KPICard,
  MetricGauge,
  MetricCard,
  StatusBadge,
  PerformanceScore
};
