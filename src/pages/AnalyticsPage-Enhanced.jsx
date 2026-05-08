import { useState, useEffect } from 'react';
import { TrendingUp, BarChart3, LineChart as LineChartIcon } from 'lucide-react';
import { Card, ProgressBar, Timeline, EmptyState } from '../components/UIComponents';
import { SlideInWrapper, FloatingWrapper, GlowEffect } from '../components/Animations';
import { useToast } from '../components/ToastProvider';

// Simple Line Chart Component
const SimpleLineChart = ({ data, title }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const chartHeight = 200;

  return (
    <div className="w-full">
      <h3 className="text-sm font-semibold text-ink/70 mb-4">{title}</h3>
      <div className="flex items-flex-end gap-2 h-48 bg-navy/5 rounded-lg p-4">
        {data.map((point, idx) => {
          const heightPercent = (point.value / maxValue) * 100;
          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition hover:from-blue-600 hover:to-blue-500"
                style={{ height: `${heightPercent}%`, minHeight: '20px' }}
                title={`${point.label}: ${point.value}`}
              />
              <span className="text-xs text-ink/50">{point.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Simple Pie Chart Component
const SimplePieChart = ({ data, title }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];

  let currentAngle = 0;
  const slices = data.map((item, idx) => {
    const percentage = (item.value / total) * 100;
    const sliceAngle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    currentAngle = endAngle;

    return { ...item, percentage, startAngle, endAngle, color: colors[idx] };
  });

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-sm font-semibold text-ink/70 mb-4">{title}</h3>
      <svg width="180" height="180" viewBox="0 0 180 180" className="mb-4">
        {slices.map((slice, idx) => {
          const startRad = (slice.startAngle * Math.PI) / 180;
          const endRad = (slice.endAngle * Math.PI) / 180;
          const x1 = 90 + 70 * Math.cos(startRad);
          const y1 = 90 + 70 * Math.sin(startRad);
          const x2 = 90 + 70 * Math.cos(endRad);
          const y2 = 90 + 70 * Math.sin(endRad);
          const largeArc = slice.percentage > 50 ? 1 : 0;

          return (
            <path
              key={idx}
              d={`M 90 90 L ${x1} ${y1} A 70 70 0 ${largeArc} 1 ${x2} ${y2} Z`}
              fill={slice.color}
              stroke="white"
              strokeWidth="2"
            />
          );
        })}
      </svg>
      <div className="w-full space-y-2">
        {slices.map((slice, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: slice.color }}
            />
            <span className="text-ink/70">{slice.label}: {slice.percentage.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const { showToast } = useToast();

  const statsData = [
    { label: 'Total Cases (30 days)', value: '47', trend: '+12%', trendType: 'up' },
    { label: 'Average Weekly Cases', value: '11.75', trend: '+8%', trendType: 'up' },
    { label: 'Recovery Rate', value: '94%', trend: '+2%', trendType: 'up' },
    { label: 'Active Cases', value: '3', trend: '-1', trendType: 'down' },
  ];

  const casesTrendData = [
    { label: 'Mon', value: 8 },
    { label: 'Tue', value: 12 },
    { label: 'Wed', value: 10 },
    { label: 'Thu', value: 15 },
    { label: 'Fri', value: 14 },
    { label: 'Sat', value: 9 },
    { label: 'Sun', value: 7 },
  ];

  const riskByAreaData = [
    { label: 'High Risk', value: 15, color: '#ef4444' },
    { label: 'Medium Risk', value: 25, color: '#f59e0b' },
    { label: 'Low Risk', value: 40, color: '#10b981' },
    { label: 'No Data', value: 20, color: '#d1d5db' },
  ];

  const timelineEvents = [
    { title: 'Increased Cases', description: 'New dengue cases reported', timestamp: '2 days ago', status: 'completed' },
    { title: 'Public Health Alert', description: 'Authorities issued dengue warning', timestamp: '1 week ago', status: 'completed' },
    { title: 'Vaccination Drive', description: 'Community vaccination program started', timestamp: '2 weeks ago', status: 'completed' },
    { title: 'Surveillance Update', description: 'New monitoring zones established', timestamp: '3 weeks ago', status: 'completed' },
  ];

  const handleExport = () => {
    showToast('Analytics exported successfully', 'success');
  };

  const handleDateRange = (range) => {
    setTimeRange(range);
    showToast(`Analytics updated for ${range}`, 'info');
  };

  return (
    <main className="space-y-6 py-6 px-4 sm:px-6">
      {/* Header */}
      <SlideInWrapper direction="down" duration={0.5}>
        <section className="space-y-2">
          <h1 className="text-3xl font-bold text-navy">Analytics</h1>
          <p className="text-ink/70">
            Detailed analytics and trends for dengue activity in your area
          </p>
        </section>
      </SlideInWrapper>

      {/* Time Range Selector */}
      <SlideInWrapper direction="right" duration={0.6}>
        <div className="flex gap-2 flex-wrap">
          {['7d', '30d', '90d', '1y'].map((range) => (
            <button
              key={range}
              onClick={() => handleDateRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                timeRange === range
                  ? 'bg-navy text-white'
                  : 'bg-navy/10 text-navy hover:bg-navy/20'
              }`}
            >
              Last {range}
            </button>
          ))}
        </div>
      </SlideInWrapper>

      {/* Stats Overview */}
      <SlideInWrapper direction="up" duration={0.7}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat, idx) => (
            <Card key={idx} className="p-6">
              <p className="text-sm font-medium text-ink/70">{stat.label}</p>
              <div className="mt-2 flex items-end justify-between">
                <p className="text-3xl font-bold text-navy">{stat.value}</p>
                <p className={`text-sm font-semibold ${
                  stat.trendType === 'up' ? 'text-red-500' : 'text-green-500'
                }`}>
                  {stat.trend}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </SlideInWrapper>

      {/* Charts Section */}
      <SlideInWrapper direction="up" duration={0.8}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cases Trend Chart */}
          <GlowEffect intensity="light">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <LineChartIcon size={20} className="text-navy" />
                <h2 className="text-lg font-bold text-navy">Weekly Cases Trend</h2>
              </div>
              <SimpleLineChart data={casesTrendData} title="Cases per Day" />
              <p className="text-xs text-ink/50 mt-4">Last 7 days</p>
            </Card>
          </GlowEffect>

          {/* Risk Distribution Chart */}
          <GlowEffect intensity="light">
            <Card className="p-6 flex flex-col items-center">
              <div className="flex items-center gap-2 mb-4 w-full">
                <BarChart3 size={20} className="text-navy" />
                <h2 className="text-lg font-bold text-navy">Risk Distribution</h2>
              </div>
              <SimplePieChart data={riskByAreaData} title="Areas by Risk Level" />
            </Card>
          </GlowEffect>
        </div>
      </SlideInWrapper>

      {/* Progress Indicators */}
      <SlideInWrapper direction="up" duration={0.9}>
        <Card className="p-6">
          <h2 className="text-lg font-bold text-navy mb-6">Health Metrics</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-ink/70 mb-2">Recovery Rate</p>
              <ProgressBar percentage={94} label="94%" color="green" />
            </div>
            <div>
              <p className="text-sm font-medium text-ink/70 mb-2">Vaccination Coverage</p>
              <ProgressBar percentage={67} label="67%" color="blue" />
            </div>
            <div>
              <p className="text-sm font-medium text-ink/70 mb-2">Case Resolution</p>
              <ProgressBar percentage={89} label="89%" color="purple" />
            </div>
          </div>
        </Card>
      </SlideInWrapper>

      {/* Timeline */}
      <SlideInWrapper direction="up" duration={1}>
        <Card className="p-6">
          <h2 className="text-lg font-bold text-navy mb-6">Activity Timeline</h2>
          <Timeline events={timelineEvents} />
        </Card>
      </SlideInWrapper>

      {/* Export Button */}
      <SlideInWrapper direction="up" duration={1.1}>
        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className="flex-1 rounded-lg bg-navy px-6 py-3 text-white font-semibold hover:bg-navy/90 transition hover:-translate-y-0.5 shadow-button"
          >
            <TrendingUp className="inline mr-2" size={18} />
            Export Report
          </button>
          <button
            className="flex-1 rounded-lg border border-navy/20 bg-white px-6 py-3 text-navy font-semibold hover:bg-navy/5 transition"
          >
            Share Analytics
          </button>
        </div>
      </SlideInWrapper>
    </main>
  );
}

export default AnalyticsPage;
