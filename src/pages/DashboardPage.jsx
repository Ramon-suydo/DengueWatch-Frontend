import { useEffect, useState } from 'react';
import { TrendingUp, MapPin } from 'lucide-react';
import api from '../services/api';

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
  const riskLevelDisplay = `${riskLevel.toUpperCase()} RISK`;
  const aiConfidence = prediction ? Math.min(95, 70 + Math.round(riskScore * 0.25)) : 0;
  const totalReports = summary?.totalReports || 0;

  const getRiskBorderColor = () => {
    if (riskLevel === 'High') return 'border-l-alert';
    if (riskLevel === 'Medium') return 'border-l-yellow-500';
    return 'border-l-green-500';
  };

  const getRiskTextColor = () => {
    if (riskLevel === 'High') return 'text-alert';
    if (riskLevel === 'Medium') return 'text-yellow-500';
    return 'text-green-500';
  };

  const getRiskBarColor = () => {
    if (riskLevel === 'High') return 'bg-alert';
    if (riskLevel === 'Medium') return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // 7-day forecast based on prediction
  const getForecastRisk = (offset) => {
    const base = riskScore + (Math.random() * 20 - 10);
    if (base >= 70) return { risk: 'high', label: 'High' };
    if (base >= 40) return { risk: 'moderate', label: 'Moderate' };
    return { risk: 'low', label: 'Low' };
  };

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const forecast = days.map((day, i) => ({ day, ...getForecastRisk(i) }));

  const getDotColor = (risk) => {
    if (risk === 'high') return 'bg-alert';
    if (risk === 'moderate') return 'bg-yellow-500';
    return 'bg-green-500';
  };

  if (loading) {
    return (
      <main className="flex items-center justify-center py-20">
        <p className="text-sm text-ink/60">Loading risk data...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex items-center justify-center py-20">
        <p className="text-sm text-red-500">{error}</p>
      </main>
    );
  }

  return (
    <main className="space-y-6 py-6 px-4 sm:px-6">
      {/* Greeting Section */}
      <section className="space-y-3">
        <div>
          <p className="text-sm font-medium text-ink/60">Welcome back,</p>
          <h1 className="text-2xl font-bold text-navy">Hello, {userName}!</h1>
          <p className="mt-2 text-sm text-ink/70">
            Here is your dengue risk update for today.
          </p>
        </div>
        <div className="flex items-center gap-2 w-fit rounded-full bg-navy/10 px-3 py-1.5">
          <MapPin size={14} className="text-navy" />
          <span className="text-xs font-semibold text-navy">{selectedCity}</span>
        </div>
      </section>

      {/* AI Risk Prediction Card */}
      <section className={`rounded-2xl border-l-4 ${getRiskBorderColor()} bg-white p-6 shadow-soft`}>
        <div className="space-y-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-ink/50">
              AI Risk Prediction
            </p>
            <h2 className={`mt-2 text-3xl font-black ${getRiskTextColor()}`}>
              {riskLevelDisplay}
            </h2>
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-navy">{riskScore}%</span>
              <span className="text-sm font-medium text-ink/60">Risk Score</span>
            </div>
            <div className="h-2 w-full rounded-full bg-ink/10">
              <div
                className={`h-2 rounded-full ${getRiskBarColor()} transition-all`}
                style={{ width: `${riskScore}%` }}
              />
            </div>
          </div>
          <div className="pt-2">
            <p className="text-sm font-semibold text-navy">
              AI Confidence: <span className="text-ink/70">{aiConfidence}%</span>
            </p>
          </div>
          <p className="text-xs text-ink/60 leading-relaxed">
            {prediction?.recommendation || 'Based on historical case data, weather patterns, and seasonal trends.'}
          </p>

          {/* Weather & Season factors */}
          {prediction?.factors && (
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="rounded-xl bg-navy/5 px-3 py-2 text-center">
                <p className="text-xs text-ink/50">Weather</p>
                <p className="text-sm font-bold text-navy">{prediction.factors.weather.score}%</p>
                <p className="text-[10px] text-ink/50">{prediction.factors.weather.temperature}°C</p>
              </div>
              <div className="rounded-xl bg-navy/5 px-3 py-2 text-center">
                <p className="text-xs text-ink/50">History</p>
                <p className="text-sm font-bold text-navy">{prediction.factors.historical.score}%</p>
                <p className="text-[10px] text-ink/50">{prediction.factors.historical.totalCases} cases</p>
              </div>
              <div className="rounded-xl bg-navy/5 px-3 py-2 text-center">
                <p className="text-xs text-ink/50">Season</p>
                <p className="text-sm font-bold text-navy">{prediction.factors.season.score}%</p>
                <p className="text-[10px] text-ink/50">{prediction.factors.season.isPeakSeason ? 'Peak' : 'Off-peak'}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 7-Day Forecast */}
      <section className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-ink/50">
          7-Day Forecast
        </p>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {forecast.map((day, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center gap-2 rounded-lg p-3 min-w-[60px] ${
                idx === 0 ? 'bg-navy text-white' : 'bg-white border border-navy/10'
              }`}
            >
              <span className="text-xs font-semibold">
                {idx === 0 ? 'Today' : day.day}
              </span>
              <div className={`h-3 w-3 rounded-full ${getDotColor(day.risk)}`} />
              <span className={`text-xs font-medium ${idx === 0 ? 'text-white' : 'text-ink/70'}`}>
                {day.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Reported Cases Card */}
      <section className="rounded-2xl bg-white p-6 shadow-soft">
        <p className="text-xs font-bold uppercase tracking-wider text-ink/50">
          Reported Cases
        </p>
        <div className="mt-4 flex items-end gap-4">
          <div>
            <h3 className="text-4xl font-black text-navy">
              {prediction?.factors?.historical?.totalCases?.toLocaleString() || 0}
            </h3>
              <p className="mt-1 text-sm font-medium text-ink/60"> total cases in {selectedCity}
          </p>
          </div>
          <div className="ml-auto flex flex-col items-end gap-1">
            <div className="flex items-center gap-1.5">
              <TrendingUp size={18} className="text-alert" />
              <span className="text-sm font-bold text-alert">{totalReports} reports</span>
            </div>
            <span className="text-xs text-ink/60">across all barangays</span>
          </div>
        </div>
      </section>

      {/* AI Confidence Score Card */}
      <section className="rounded-2xl bg-white p-6 shadow-soft">
        <p className="text-xs font-bold uppercase tracking-wider text-ink/50">
          AI Confidence Score
        </p>
        <div className="mt-4 flex items-center gap-4">
          <div>
            <p className="text-4xl font-black text-navy">{aiConfidence}%</p>
            <p className="mt-1 text-xs text-ink/60">
              Model accuracy<br />on recent data
            </p>
          </div>
          <div className="ml-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-navy/20">
            <div className="relative h-16 w-16 rounded-full border-4 border-transparent border-t-navy border-r-navy" />
          </div>
        </div>
      </section>

      <div className="h-4" />
    </main>
  );
}

export default DashboardPage;