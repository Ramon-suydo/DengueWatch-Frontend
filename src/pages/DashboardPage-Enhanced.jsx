import { useEffect, useState } from 'react';
import { MapPin, TrendingUp, AlertCircle, Activity } from 'lucide-react';
import api from '../services/api';
import { useToast } from '../components/ToastProvider';
import { DashboardSkeleton } from '../components/SkeletonLoader';
import { AnimatedCounter, StatsCard, RiskMeter, ActivityFeedItem, QuickActionButton } from '../components/Dashboard';
import { FloatingWrapper, SlideInWrapper, GlowEffect } from '../components/Animations';

function DashboardPage() {
  const userName = localStorage.getItem('denguewatch.userName') ||
                   localStorage.getItem('userName') ||
                   'Community Resident';
  const selectedCity = localStorage.getItem('denguewatch.selectedCity') ||
                       localStorage.getItem('denguewatch.selectedBarangay') ||
                       'MANILA CITY';

  const [summary, setSummary] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentAlerts, setRecentAlerts] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, predictionRes] = await Promise.all([
          api.getSummary(),
          api.getPrediction(selectedCity)
        ]);

        if (summaryRes.success) setSummary(summaryRes.data);
        if (predictionRes.success) setPrediction(predictionRes.data);
        else setError('Failed to load prediction data');

        // Mock recent alerts
        setRecentAlerts([
          { id: 1, type: 'alert', title: 'High Risk Zone Detected', description: 'Risk increased in your area', timestamp: '2 hours ago' },
          { id: 2, type: 'update', title: 'New Dengue Guidelines', description: 'Updated health guidelines released', timestamp: '1 day ago' },
          { id: 3, type: 'warning', title: 'Rainy Season Alert', description: 'Increased mosquito breeding expected', timestamp: '2 days ago' },
        ]);
      } catch (err) {
        setError('Could not connect to server');
        showToast('Failed to load dashboard data', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCity, showToast]);

  const riskScore = prediction?.riskPercentage || 0;
  const riskLevel = prediction?.riskLevel || 'Low';
  const totalReports = summary?.totalReports || 0;
  const recoveryRate = summary?.recoveryRate || 94;

  const getRiskColor = () => {
    if (riskLevel === 'High') return '#ef4444';
    if (riskLevel === 'Medium') return '#f59e0b';
    return '#10b981';
  };

  if (loading) {
    return (
      <main className="space-y-6 py-6 px-4 sm:px-6">
        <DashboardSkeleton />
      </main>
    );
  }

  return (
    <main className="space-y-6 py-6 px-4 sm:px-6">
      {/* Header */}
      <SlideInWrapper direction="down" duration={0.5}>
        <section className="space-y-3">
          <div>
            <p className="text-sm font-medium text-ink/60">Welcome back,</p>
            <h1 className="text-3xl font-bold text-navy">Hello, {userName}!</h1>
            <p className="mt-2 text-sm text-ink/70">
              Your personalized dengue risk dashboard
            </p>
          </div>
          <div className="flex items-center gap-2 w-fit rounded-full bg-navy/10 px-3 py-1.5">
            <MapPin size={14} className="text-navy" />
            <span className="text-xs font-semibold text-navy">{selectedCity}</span>
          </div>
        </section>
      </SlideInWrapper>

      {/* Main Risk Display */}
      <SlideInWrapper direction="up" duration={0.6}>
        <GlowEffect intensity="medium">
          <div className="rounded-2xl bg-white p-6 shadow-lg border border-navy/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Risk Meter */}
              <div className="flex flex-col items-center justify-center">
                <p className="text-xs font-bold uppercase tracking-wider text-ink/50 mb-4">
                  Current Risk Level
                </p>
                <RiskMeter riskPercentage={riskScore} size={200} />
                <p className="mt-4 text-sm text-ink/60 text-center">
                  Based on latest weather, case trends, and location data
                </p>
              </div>

              {/* Risk Details */}
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-navy/5 to-navy/10 rounded-xl">
                  <p className="text-xs font-semibold text-ink/60 uppercase">AI Confidence</p>
                  <p className="text-2xl font-bold text-navy mt-1">{prediction?.confidence || 0}%</p>
                </div>

                <div className="p-4 bg-gradient-to-br from-alert/5 to-alert/10 rounded-xl">
                  <p className="text-xs font-semibold text-ink/60 uppercase">Total Cases (30d)</p>
                  <p className="text-2xl font-bold text-alert mt-1">{totalReports}</p>
                </div>

                <div className="p-4 bg-gradient-to-br from-green-500/5 to-green-500/10 rounded-xl">
                  <p className="text-xs font-semibold text-ink/60 uppercase">Recovery Rate</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">{recoveryRate}%</p>
                </div>
              </div>
            </div>
          </div>
        </GlowEffect>
      </SlideInWrapper>

      {/* Stats Cards */}
      <SlideInWrapper direction="up" duration={0.7}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            label="Total Cases"
            value={totalReports}
            icon={Activity}
            trend="+12%"
            color="blue"
          />
          <StatsCard
            label="Active Cases"
            value={3}
            icon={AlertCircle}
            trend="-5%"
            color="orange"
          />
          <StatsCard
            label="Recovery Rate"
            value={`${recoveryRate}%`}
            icon={TrendingUp}
            trend="+2%"
            color="green"
          />
          <StatsCard
            label="Avg Weekly"
            value="11.75"
            icon={Activity}
            trend="+8%"
            color="purple"
          />
        </div>
      </SlideInWrapper>

      {/* Action Buttons */}
      <SlideInWrapper direction="up" duration={0.8}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <QuickActionButton 
            label="View Map" 
            icon={MapPin}
            variant="primary"
            onClick={() => window.location.href = '/map'}
          />
          <QuickActionButton 
            label="See Alerts" 
            icon={AlertCircle}
            variant="secondary"
            onClick={() => window.location.href = '/alerts'}
          />
          <QuickActionButton 
            label="Analytics" 
            icon={TrendingUp}
            variant="secondary"
            onClick={() => window.location.href = '/analytics'}
          />
          <QuickActionButton 
            label="Chat with AI" 
            icon={Activity}
            variant="secondary"
            onClick={() => window.location.href = '/chat'}
          />
        </div>
      </SlideInWrapper>

      {/* Recent Activity */}
      <SlideInWrapper direction="up" duration={0.9}>
        <div className="bg-white rounded-2xl p-6 shadow-soft border border-navy/10">
          <h2 className="text-lg font-bold text-navy mb-4">Recent Activity</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {recentAlerts.length > 0 ? (
              recentAlerts.map((alert, idx) => (
                <ActivityFeedItem
                  key={alert.id}
                  type={alert.type}
                  title={alert.title}
                  description={alert.description}
                  timestamp={alert.timestamp}
                />
              ))
            ) : (
              <p className="text-ink/50 text-sm">No recent alerts</p>
            )}
          </div>
        </div>
      </SlideInWrapper>

      {/* Risk Factors */}
      {prediction?.factors && (
        <SlideInWrapper direction="up" duration={1}>
          <div className="bg-white rounded-2xl p-6 shadow-soft border border-navy/10">
            <h2 className="text-lg font-bold text-navy mb-4">Risk Factors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(prediction.factors).map(([key, value]) => (
                <div key={key} className="p-4 bg-navy/5 rounded-lg">
                  <p className="text-sm text-ink/60 capitalize">{key.replace(/_/g, ' ')}</p>
                  <p className="text-xl font-bold text-navy mt-1">{value}%</p>
                </div>
              ))}
            </div>
          </div>
        </SlideInWrapper>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}
    </main>
  );
}

export default DashboardPage;
