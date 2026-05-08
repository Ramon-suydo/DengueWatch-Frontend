import { useEffect, useState } from 'react';
import { TrendingUp, Cloud, Droplet, Wind, Calendar, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import api from '../services/api';
import { DashboardSkeleton } from '../components/SkeletonLoader';

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

  useEffect(() => {
    Promise.all([
      api.getSummary(),
      api.getPrediction(selectedCity)
    ])
      .then(([summaryRes, predictionRes]) => {
        if (summaryRes.success) setSummary(summaryRes.data);
        if (predictionRes.success) setPrediction(predictionRes.data);
        else setError('Failed to load prediction data');
      })
      .catch(() => setError('Could not connect to server'))
      .finally(() => setLoading(false));
  }, [selectedCity]);

  const riskScore = prediction?.riskPercentage || 0;
  const riskLevel = prediction?.riskLevel || 'Low';
  const aiConfidence = prediction?.confidence || 0;
  const totalReports = summary?.totalReports || 0;
  const recoveryRate = summary?.recoveryRate || 94;
  const forecast = prediction?.forecast || [];

  // Get risk color based on level
  const getRiskColor = () => {
    if (riskLevel === 'High') return '#ef4444';
    if (riskLevel === 'Medium') return '#f59e0b';
    return '#10b981';
  };

  const getRiskBgColor = () => {
    if (riskLevel === 'High') return 'bg-red-50';
    if (riskLevel === 'Medium') return 'bg-yellow-50';
    return 'bg-green-50';
  };

  const getRiskBorderColor = () => {
    if (riskLevel === 'High') return 'border-red-200';
    if (riskLevel === 'Medium') return 'border-yellow-200';
    return 'border-green-200';
  };

  const getRiskTextColor = () => {
    if (riskLevel === 'High') return 'text-red-700';
    if (riskLevel === 'Medium') return 'text-yellow-700';
    return 'text-green-700';
  };

  // Format time
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
  const dateString = now.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });

  if (loading) {
    return (
      <main className="space-y-6 py-6">
        <DashboardSkeleton />
      </main>
    );
  }

  return (
    <main className="space-y-6 py-6">
      {/* Greeting Section */}
      <section className="space-y-3">
        <div>
          <p className="text-sm font-medium text-ink/60">Good {now.getHours() < 12 ? 'morning' : now.getHours() < 18 ? 'afternoon' : 'evening'},</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-navy mt-1">
            {userName}
          </h1>
          <p className="text-sm text-ink/70 mt-2">
            Here's your dengue risk update for today
          </p>
        </div>

        {/* Date and Time */}
        <div className="flex items-center gap-2 text-xs text-ink/60">
          <Calendar size={16} />
          <span>{dateString} • {timeString}</span>
        </div>
      </section>

      {/* Main Risk Display Card */}
      <section className={`rounded-3xl border-2 p-6 md:p-8 shadow-lg transition-all duration-300 ${getRiskBgColor()} ${getRiskBorderColor()}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Risk Gauge */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-xs font-bold uppercase tracking-widest text-ink/50 mb-6">
              Current Risk Level
            </p>

            {/* Circular Risk Gauge */}
            <div className="relative w-48 h-48 mb-4">
              <svg width="192" height="192" viewBox="0 0 192 192" className="transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                />
                {/* Progress circle */}
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  fill="none"
                  stroke={getRiskColor()}
                  strokeWidth="12"
                  strokeDasharray={`${(riskScore / 100) * 503.33} 503.33`}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dasharray 0.6s ease' }}
                />
              </svg>

              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black" style={{ color: getRiskColor() }}>
                  {riskScore}
                </span>
                <span className="text-sm font-semibold text-ink/60 mt-1">%</span>
              </div>
            </div>

            {/* Risk Level Label */}
            <div className={`px-4 py-2 rounded-full font-bold text-sm ${getRiskTextColor()}`}>
              {riskLevel} Risk
            </div>

            <p className="text-xs text-ink/60 text-center mt-4">
              Based on weather, case trends, and location data
            </p>
          </div>

          {/* Right: Risk Details Grid */}
          <div className="flex flex-col justify-center space-y-4">
            {/* AI Confidence */}
            <div className="bg-white/60 backdrop-blur rounded-2xl p-4 border border-white/80">
              <p className="text-xs font-semibold text-ink/60 uppercase tracking-wide mb-2">
                AI Confidence
              </p>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-navy">{aiConfidence}%</span>
                <div className="flex-1 h-2 bg-navy/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-navy transition-all duration-500"
                    style={{ width: `${aiConfidence}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Total Cases */}
            <div className="bg-white/60 backdrop-blur rounded-2xl p-4 border border-white/80">
              <p className="text-xs font-semibold text-ink/60 uppercase tracking-wide mb-2">
                Total Cases (30d)
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-alert">{totalReports}</span>
                <span className="text-sm font-semibold text-alert/70">cases</span>
              </div>
            </div>

            {/* Recovery Rate */}
            <div className="bg-white/60 backdrop-blur rounded-2xl p-4 border border-white/80">
              <p className="text-xs font-semibold text-ink/60 uppercase tracking-wide mb-2">
                Recovery Rate
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-green-600">{recoveryRate}%</span>
                <span className="text-sm font-semibold text-green-600/70">recovered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weather & Conditions Row */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Temperature */}
        <div className="bg-white rounded-2xl p-4 border border-navy/10 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
              <Cloud size={20} className="text-orange-600" />
            </div>
            <p className="text-sm font-semibold text-ink/60">Temperature</p>
          </div>
          <p className="text-2xl font-bold text-navy">28°C</p>
          <p className="text-xs text-ink/60 mt-1">Warm & humid</p>
        </div>

        {/* Humidity */}
        <div className="bg-white rounded-2xl p-4 border border-navy/10 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <Droplet size={20} className="text-blue-600" />
            </div>
            <p className="text-sm font-semibold text-ink/60">Humidity</p>
          </div>
          <p className="text-2xl font-bold text-navy">78%</p>
          <p className="text-xs text-ink/60 mt-1">High (mosquito breeding)</p>
        </div>

        {/* Wind Speed */}
        <div className="bg-white rounded-2xl p-4 border border-navy/10 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100">
              <Wind size={20} className="text-cyan-600" />
            </div>
            <p className="text-sm font-semibold text-ink/60">Wind Speed</p>
          </div>
          <p className="text-2xl font-bold text-navy">12 km/h</p>
          <p className="text-xs text-ink/60 mt-1">Light breeze</p>
        </div>
      </section>

      {/* 7-Day Forecast */}
      {forecast.length > 0 && (
        <section className="bg-white rounded-2xl p-6 border border-navy/10 shadow-sm">
          <h2 className="text-lg font-bold text-navy mb-4">7-Day Forecast</h2>
          <div className="overflow-x-auto -mx-6 px-6">
            <div className="flex gap-3 pb-2">
              {forecast.map((day, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-24 rounded-xl bg-gradient-to-br from-navy/5 to-navy/10 p-3 border border-navy/10 text-center"
                >
                  <p className="text-xs font-semibold text-ink/60 mb-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]}
                  </p>
                  <p className="text-lg font-bold text-navy">{day.riskPercentage}%</p>
                  <p className="text-xs text-ink/60 mt-1">Risk</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Risk Factors */}
      {prediction?.factors && (
        <section className="bg-white rounded-2xl p-6 border border-navy/10 shadow-sm">
          <h2 className="text-lg font-bold text-navy mb-4">Risk Factors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(prediction.factors).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-navy/5 rounded-lg border border-navy/10">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy/10">
                    <TrendingUp size={16} className="text-navy" />
                  </div>
                  <span className="text-sm font-medium text-ink capitalize">
                    {key.replace(/_/g, ' ')}
                  </span>
                </div>
                <span className="text-sm font-bold text-navy">{value}%</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recommendations */}
      <section className="bg-gradient-to-br from-alert/10 to-alert/5 rounded-2xl p-6 border border-alert/20 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-alert/20 flex-shrink-0 mt-0.5">
            <AlertCircle size={20} className="text-alert" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-alert mb-2">Health Recommendations</h3>
            <ul className="space-y-2 text-sm text-ink/70">
              <li className="flex items-start gap-2">
                <span className="text-alert mt-1">•</span>
                <span>Wear light-colored, long-sleeved clothing to avoid mosquito bites</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-alert mt-1">•</span>
                <span>Use insect repellent with DEET when going outdoors</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-alert mt-1">•</span>
                <span>Eliminate stagnant water around your home</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-alert mt-1">•</span>
                <span>If you develop fever, rash, or joint pain, seek medical attention</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Last Updated */}
      <div className="flex items-center justify-center gap-2 text-xs text-ink/50">
        <Clock size={14} />
        <span>Last updated: {timeString}</span>
      </div>

      {/* Error State */}
      {error && (
        <div className="rounded-2xl bg-red-50 border-2 border-red-200 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-800">{error}</p>
              <p className="text-sm text-red-700 mt-1">Please check your connection and try again</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default DashboardPage;
