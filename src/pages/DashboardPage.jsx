<<<<<<< HEAD
import { useEffect, useState } from 'react';
import BrandMark from '../components/BrandMark';
import api from '../services/api';

const reminders = [
  'Remove stagnant water from containers and outdoor areas.',
  'Use mosquito repellent and wear long sleeves when possible.',
  'Seek medical attention early if fever symptoms appear.',
];
=======
import { TrendingUp, TrendingDown, AlertCircle, MapPin } from 'lucide-react';
>>>>>>> origin/frontend-ui-updates

const getRiskLevel = (totalCases) => {
  if (totalCases >= 50) return { level: 'High', color: 'text-alert', badge: 'bg-alert/10 text-alert border-alert/20' };
  if (totalCases >= 20) return { level: 'Medium', color: 'text-yellow-500', badge: 'bg-yellow-50 text-yellow-600 border-yellow-200' };
  return { level: 'Low', color: 'text-green-500', badge: 'bg-green-50 text-green-600 border-green-200' };
};

function DashboardPage() {
<<<<<<< HEAD
  const userName = localStorage.getItem('denguewatch.userName') || 'Community Resident';
  const selectedBarangay = localStorage.getItem('denguewatch.selectedBarangay') || 'Barangay 1';

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getSummary()
      .then(res => {
        if (res.success) setSummary(res.data);
        else setError('Failed to load data');
      })
      .catch(() => setError('Could not connect to server'))
      .finally(() => setLoading(false));
  }, []);

  const totalCases = summary?.totalCases || 0;
  const risk = getRiskLevel(totalCases);

  return (
    <main className="py-8 sm:py-10">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="rounded-[2rem] bg-paper/95 px-6 py-8 shadow-soft sm:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <BrandMark compact />
              <div className="mt-6">
                <p className="text-base text-ink/70 sm:text-lg">
                  Hello, <span className="font-extrabold text-navy">{userName}</span>
                </p>
                <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-navy sm:text-4xl">
                  Dengue risk overview
                </h1>
                <p className="mt-3 text-sm leading-7 text-ink/70 sm:text-base">
                  Selected barangay:{' '}
                  <span className="font-semibold text-navy">{selectedBarangay}</span>
                </p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-navy/10 bg-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-navy shadow-soft sm:text-xs">
              <span className="h-2.5 w-2.5 rounded-full bg-alert" />
              Community Dashboard
            </div>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-[2rem] bg-paper/95 px-6 py-8 shadow-soft sm:px-8">
            {loading ? (
              <p className="text-sm text-ink/60">Loading risk data...</p>
            ) : error ? (
              <p className="text-sm text-red-500">{error}</p>
            ) : (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy/60">
                      Current Risk
                    </p>
                    <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-navy">
                      <span className={risk.color}>{risk.level}</span> risk
                    </h2>
                  </div>
                  <span className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] ${risk.badge}`}>
                    {risk.level} Alert
                  </span>
                </div>

                <p className="mt-6 max-w-2xl text-sm leading-7 text-ink/75 sm:text-base">
                  Based on {summary?.totalReports || 0} reports in the system. Stay alert and take precautions.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[2rem] border border-navy/10 bg-white px-5 py-5 shadow-soft">
                    <p className="text-sm font-semibold text-navy/60">Reported Cases</p>
                    <p className="mt-3 text-3xl font-black tracking-tight text-navy">{totalCases}</p>
                    <p className="mt-2 text-sm text-ink/65">Total cases recorded</p>
                  </div>
                  <div className="rounded-[2rem] border border-navy/10 bg-white px-5 py-5 shadow-soft">
                    <p className="text-sm font-semibold text-navy/60">Total Reports</p>
                    <p className="mt-3 text-3xl font-black tracking-tight text-navy">{summary?.totalReports || 0}</p>
                    <p className="mt-2 text-sm text-ink/65">Avg {summary?.averageCasesPerReport || 0} cases/report</p>
                  </div>
                </div>
              </>
            )}
          </article>

          <aside className="rounded-[2rem] bg-paper/95 px-6 py-8 shadow-soft sm:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy/60">
              Health Reminders
            </p>
            <div className="mt-6 space-y-4">
              {reminders.map((reminder, index) => (
                <div key={reminder} className="rounded-[1.5rem] border border-navy/10 bg-white px-5 py-4 shadow-soft">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-alert">Alert {index + 1}</p>
                  <p className="mt-2 text-sm leading-7 text-ink/75">{reminder}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>
=======
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
>>>>>>> origin/frontend-ui-updates
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