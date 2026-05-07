/**
 * Loading Skeleton Component
 * Shows placeholder while content loads
 */

export const SkeletonLoader = ({ width = '100%', height = '20px', style = {} }) => (
  <div
    style={{
      width,
      height,
      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite',
      borderRadius: '4px',
      ...style
    }}
  >
    <style>{`
      @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>
  </div>
);

export const CardSkeleton = () => (
  <div
    style={{
      background: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}
  >
    <SkeletonLoader height='24px' style={{ marginBottom: '12px', width: '60%' }} />
    <SkeletonLoader height='16px' style={{ marginBottom: '8px' }} />
    <SkeletonLoader height='16px' style={{ marginBottom: '8px', width: '90%' }} />
    <SkeletonLoader height='16px' style={{ width: '70%' }} />
  </div>
);

export const TableSkeleton = ({ rows = 5 }) => (
  <div style={{ width: '100%' }}>
    <div style={{ display: 'flex', gap: '20px', marginBottom: '16px' }}>
      {[1, 2, 3, 4].map(i => (
        <SkeletonLoader key={i} height='20px' style={{ flex: 1 }} />
      ))}
    </div>
    {Array.from({ length: rows }).map((_,i) => (
      <div key={i} style={{ display: 'flex', gap: '20px', marginBottom: '12px' }}>
        {[1, 2, 3, 4].map(j => (
          <SkeletonLoader key={j} height='20px' style={{ flex: 1 }} />
        ))}
      </div>
    ))}
  </div>
);

export const DashboardSkeleton = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
    {Array.from({ length: 4 }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);
