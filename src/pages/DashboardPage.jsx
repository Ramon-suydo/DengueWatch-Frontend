import { TrendingUp, TrendingDown, AlertCircle, MapPin } from 'lucide-react';

function DashboardPage() {
  // Read from localStorage
  const userName = localStorage.getItem('userName') || 'User';
  const selectedBarangay = localStorage.getItem('selectedBarangay') || 'Brgy. 001 - Tondo';
  const riskScore = 78;
  const riskLevel = 'HIGH RISK';
  const aiConfidence = 92;
  const reportedCases = 18;
  const casesTrend = 4;

  // 7-day forecast mock data
  const forecast = [
    { day: 'Mon', risk: 'high', label: 'High' },
    { day: 'Tue', risk: 'high', label: 'High' },
    { day: 'Wed', risk: 'moderate', label: 'Moderate' },
    { day: 'Thu', risk: 'moderate', label: 'Moderate' },
    { day: 'Fri', risk: 'low', label: 'Low' },
    { day: 'Sat', risk: 'low', label: 'Low' },
    { day: 'Sun', risk: 'moderate', label: 'Moderate' },
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high':
        return 'bg-alert text-white';
      case 'moderate':
        return 'bg-yellow-500 text-white';
      case 'low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-300 text-white';
    }
  };

  const getDotColor = (risk) => {
    switch (risk) {
      case 'high':
        return 'bg-alert';
      case 'moderate':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

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

        {/* Barangay Badge */}
        <div className="flex items-center gap-2 w-fit rounded-full bg-navy/10 px-3 py-1.5">
          <MapPin size={14} className="text-navy" />
          <span className="text-xs font-semibold text-navy">{selectedBarangay}</span>
        </div>
      </section>

      {/* AI Risk Prediction Card - Most Prominent */}
      <section className="rounded-2xl border-l-4 border-l-alert bg-white p-6 shadow-soft">
        <div className="space-y-4">
          {/* Header */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-ink/50">
              AI Risk Prediction
            </p>
            <h2 className="mt-2 text-3xl font-black text-alert">{riskLevel}</h2>
          </div>

          {/* Risk Score with Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-navy">{riskScore}%</span>
              <span className="text-sm font-medium text-ink/60">Risk Score</span>
            </div>
            {/* Progress Bar */}
            <div className="h-2 w-full rounded-full bg-ink/10">
              <div
                className="h-2 rounded-full bg-alert transition-all"
                style={{ width: `${riskScore}%` }}
              />
            </div>
          </div>

          {/* AI Confidence */}
          <div className="pt-2">
            <p className="text-sm font-semibold text-navy">
              AI Confidence: <span className="text-ink/70">{aiConfidence}%</span>
            </p>
          </div>

          {/* Description */}
          <p className="text-xs text-ink/60 leading-relaxed">
            Based on historical case data, humidity patterns, and case clustering in your area.
          </p>
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
                idx === 0
                  ? 'bg-navy text-white'
                  : 'bg-white border border-navy/10'
              }`}
            >
              <span className="text-xs font-semibold">
                {idx === 0 ? 'Today' : day.day}
              </span>
              <div className={`h-3 w-3 rounded-full ${getDotColor(day.risk)}`} />
              <span
                className={`text-xs font-medium ${
                  idx === 0 ? 'text-white' : 'text-ink/70'
                }`}
              >
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
            <h3 className="text-4xl font-black text-navy">{reportedCases}</h3>
            <p className="mt-1 text-sm font-medium text-ink/60">cases this month</p>
          </div>
          <div className="ml-auto flex flex-col items-end gap-1">
            <div className="flex items-center gap-1.5">
              <TrendingUp size={18} className="text-alert" />
              <span className="text-sm font-bold text-alert">+{casesTrend}</span>
            </div>
            <span className="text-xs text-ink/60">from last week</span>
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
          {/* Circular progress indicator */}
          <div className="ml-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-navy/20">
            <div className="relative h-16 w-16 rounded-full border-4 border-transparent border-t-navy border-r-navy" />
          </div>
        </div>
      </section>

      {/* Bottom spacing for nav */}
      <div className="h-4" />
    </main>
  );
}

export default DashboardPage;
