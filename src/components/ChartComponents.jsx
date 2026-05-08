import React, { useState, useEffect } from 'react';
import { AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';

/**
 * Advanced Line Chart Component with multiple series
 */
export const AdvancedLineChart = ({ 
  data, 
  title = 'Chart',
  height = 300,
  seriesNames = ['Series 1'],
  colors = ['#3b82f6'],
  showGrid = true,
  showLegend = true,
  interactive = true
}) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  if (!data || data.length === 0) {
    return (
      <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#999' }}>No data available</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.flatMap(d => Array.isArray(d.value) ? d.value : [d.value]));
  const minValue = 0;
  const range = maxValue - minValue;
  const yAxisSteps = Math.ceil(maxValue / 5);

  const points = data.map((d, i) => ({
    x: (i / (data.length - 1 || 1)) * 100,
    values: Array.isArray(d.value) ? d.value : [d.value],
    label: d.label
  }));

  const pathD = colors.map((color, seriesIdx) => {
    return points
      .map((p, i) => {
        const y = height - ((p.values[seriesIdx] || 0) / maxValue) * height * 0.9 - 20;
        return `${p.x}% ${y}px`;
      })
      .join(' L ');
  });

  return (
    <div>
      {title && <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: '#1a1a1a' }}>{title}</h3>}
      
      <svg width="100%" height={height} viewBox={`0 0 100 ${height}`} style={{ display: 'block' }}>
        {/* Grid */}
        {showGrid && Array.from({ length: 5 }).map((_, i) => (
          <line
            key={`grid-${i}`}
            x1="0%"
            y1={`${(i / 4) * height * 0.9 + 20}px`}
            x2="100%"
            y2={`${(i / 4) * height * 0.9 + 20}px`}
            stroke="#e5e5e5"
            strokeWidth="1"
          />
        ))}

        {/* Y-axis labels */}
        {Array.from({ length: 5 }).map((_, i) => (
          <text
            key={`y-label-${i}`}
            x="2%"
            y={`${(i / 4) * height * 0.9 + 25}px`}
            fontSize="12"
            fill="#999"
            textAnchor="start"
          >
            {Math.round(maxValue - (i / 4) * maxValue)}
          </text>
        ))}

        {/* Lines */}
        {colors.map((color, seriesIdx) => (
          <polyline
            key={`line-${seriesIdx}`}
            points={points
              .map((p, i) => {
                const y = height - ((p.values[seriesIdx] || 0) / maxValue) * height * 0.9 - 20;
                return `${p.x}% ${y}px`;
              })
              .join(' ')}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {/* Points */}
        {interactive && points.map((p, i) =>
          colors.map((color, seriesIdx) => {
            const y = height - ((p.values[seriesIdx] || 0) / maxValue) * height * 0.9 - 20;
            const isHovered = hoveredPoint?.x === i && hoveredPoint?.series === seriesIdx;
            return (
              <circle
                key={`point-${i}-${seriesIdx}`}
                cx={`${p.x}%`}
                cy={`${y}px`}
                r={isHovered ? '6' : '3'}
                fill={color}
                stroke="white"
                strokeWidth="2"
                onMouseEnter={() => setHoveredPoint({ x: i, series: seriesIdx, value: p.values[seriesIdx], label: p.label })}
                onMouseLeave={() => setHoveredPoint(null)}
                style={{ cursor: 'pointer', transition: 'r 0.2s' }}
              />
            );
          })
        )}
      </svg>

      {/* Tooltip */}
      {hoveredPoint && (
        <div style={{
          marginTop: '12px',
          padding: '8px 12px',
          background: '#f5f5f5',
          borderRadius: '6px',
          fontSize: '12px',
          color: '#333'
        }}>
          <p><strong>{hoveredPoint.label}</strong>: {hoveredPoint.value}</p>
        </div>
      )}

      {/* Legend */}
      {showLegend && (
        <div style={{ display: 'flex', gap: '16px', marginTop: '16px', flexWrap: 'wrap' }}>
          {colors.map((color, idx) => (
            <div key={`legend-${idx}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#666' }}>
              <div style={{ width: '12px', height: '12px', background: color, borderRadius: '2px' }} />
              {seriesNames[idx] || `Series ${idx + 1}`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Heatmap Grid Component
 */
export const HeatmapGrid = ({ 
  data, 
  title = 'Heatmap',
  colorScheme = 'blues' // 'blues', 'reds', 'greens', 'purples'
}) => {
  const colors = {
    blues: ['#e3f2fd', '#90caf9', '#42a5f5', '#2196f3', '#1565c0'],
    reds: ['#ffebee', '#ef9a9a', '#ef5350', '#f44336', '#c62828'],
    greens: ['#e8f5e9', '#81c784', '#4caf50', '#388e3c', '#1b5e20'],
    purples: ['#f3e5f5', '#b39ddb', '#9575cd', '#7e57c2', '#4527a0']
  };

  const colorPalette = colors[colorScheme] || colors.blues;
  const flatData = data.flat();
  const maxValue = Math.max(...flatData);

  return (
    <div>
      {title && <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>{title}</h3>}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${data[0]?.length || 1}, 1fr)`, gap: '4px' }}>
        {data.map((row, rowIdx) =>
          row.map((value, colIdx) => {
            const colorIndex = Math.min(4, Math.floor((value / maxValue) * 5));
            return (
              <div
                key={`${rowIdx}-${colIdx}`}
                style={{
                  background: colorPalette[colorIndex],
                  padding: '8px',
                  borderRadius: '4px',
                  textAlign: 'center',
                  fontSize: '12px',
                  fontWeight: '500',
                  color: colorIndex > 2 ? '#fff' : '#333',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.1)';
                  e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
                title={`Row ${rowIdx + 1}, Col ${colIdx + 1}: ${value}`}
              >
                {value}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

/**
 * Radial Progress Chart
 */
export const RadialProgress = ({ 
  value = 65, 
  maxValue = 100,
  title = 'Progress',
  size = 120,
  color = '#3b82f6',
  thickness = 8
}) => {
  const radius = size / 2 - thickness;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / maxValue) * circumference;
  const percentage = (value / maxValue) * 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: size, height: size, marginBottom: '12px' }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e5e5e5"
            strokeWidth={thickness}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={thickness}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.3s ease' }}
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
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: color }}>
            {percentage.toFixed(0)}%
          </div>
          <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>
            {value} / {maxValue}
          </div>
        </div>
      </div>
      {title && <p style={{ fontSize: '12px', color: '#666', marginTop: '8px', textAlign: 'center' }}>{title}</p>}
    </div>
  );
};

/**
 * Metric with Sparkline
 */
export const MetricWithSparkline = ({ 
  label = 'Metric',
  value = '0',
  unit = '',
  trend = null,
  trendPercentage = 0,
  sparklineData = [],
  color = '#3b82f6'
}) => {
  if (sparklineData.length === 0) {
    sparklineData = Array.from({ length: 10 }, () => Math.random() * 100);
  }

  const maxValue = Math.max(...sparklineData);
  const points = sparklineData.map((v, i) => {
    const x = (i / (sparklineData.length - 1)) * 100;
    const y = 100 - ((v / maxValue) * 100);
    return `${x},${y}`;
  });

  return (
    <div style={{
      padding: '16px',
      border: '1px solid #e5e5e5',
      borderRadius: '8px',
      background: '#fff'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>{label}</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '4px' }}>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>{value}</span>
            {unit && <span style={{ fontSize: '14px', color: '#999' }}>{unit}</span>}
          </div>
        </div>
        {trend && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 8px',
            background: trend === 'up' ? '#d4edda' : '#f8d7da',
            borderRadius: '4px'
          }}>
            {trend === 'up' ? (
              <TrendingUp size={14} color="#28a745" />
            ) : (
              <TrendingDown size={14} color="#dc3545" />
            )}
            <span style={{ fontSize: '12px', color: trend === 'up' ? '#28a745' : '#dc3545', fontWeight: '600' }}>
              {trendPercentage}%
            </span>
          </div>
        )}
      </div>
      {sparklineData.length > 0 && (
        <svg width="100%" height="30" viewBox="0 0 100 100" style={{ display: 'block' }}>
          <polyline
            points={points.join(' ')}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};

/**
 * Comparison Bar Chart
 */
export const ComparisonChart = ({ 
  data = [],
  title = 'Comparison',
  color = '#3b82f6',
  showValues = true
}) => {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div>
      {title && <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>{title}</h3>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {data.map((item, idx) => {
          const percentage = (item.value / maxValue) * 100;
          return (
            <div key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', color: '#666' }}>{item.label}</span>
                {showValues && <span style={{ fontSize: '12px', fontWeight: '600', color: '#333' }}>{item.value}</span>}
              </div>
              <div style={{ width: '100%', height: '24px', background: '#f0f0f0', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${percentage}%`,
                    background: item.color || color,
                    transition: 'width 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingRight: '8px'
                  }}
                >
                  {showValues && percentage > 15 && (
                    <span style={{ fontSize: '11px', color: '#fff', fontWeight: '600' }}>
                      {Math.round(percentage)}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default {
  AdvancedLineChart,
  HeatmapGrid,
  RadialProgress,
  MetricWithSparkline,
  ComparisonChart
};
