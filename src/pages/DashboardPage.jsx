import BrandMark from '../components/BrandMark';

const mockRisk = {
  level: 'High',
  color: 'text-alert',
  badge: 'bg-alert/10 text-alert border-alert/20',
  summary:
    'Humidity and recent case clustering suggest elevated dengue activity in your area this week.',
};

const mockStats = [
  { label: 'Reported Cases', value: '18', note: '+4 from last week' },
  { label: 'Trend', value: 'Rising', note: 'Monitor symptoms closely' },
];

const reminders = [
  'Remove stagnant water from containers and outdoor areas.',
  'Use mosquito repellent and wear long sleeves when possible.',
  'Seek medical attention early if fever symptoms appear.',
];

function DashboardPage() {
  const userName =
    localStorage.getItem('denguewatch.userName') || 'Community Resident';
  const selectedBarangay =
    localStorage.getItem('denguewatch.selectedBarangay') || 'Barangay 1';

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
                  <span className="font-semibold text-navy">
                    {selectedBarangay}
                  </span>
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
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy/60">
                  Current Risk
                </p>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-navy">
                  <span className={mockRisk.color}>{mockRisk.level}</span> risk
                </h2>
              </div>
              <span
                className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] ${mockRisk.badge}`}
              >
                {mockRisk.level} Alert
              </span>
            </div>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-ink/75 sm:text-base">
              {mockRisk.summary}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {mockStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[2rem] border border-navy/10 bg-white px-5 py-5 shadow-soft"
                >
                  <p className="text-sm font-semibold text-navy/60">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-3xl font-black tracking-tight text-navy">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-ink/65">{stat.note}</p>
                </div>
              ))}
            </div>
          </article>

          <aside className="rounded-[2rem] bg-paper/95 px-6 py-8 shadow-soft sm:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy/60">
              Health Reminders
            </p>
            <div className="mt-6 space-y-4">
              {reminders.map((reminder, index) => (
                <div
                  key={reminder}
                  className="rounded-[1.5rem] border border-navy/10 bg-white px-5 py-4 shadow-soft"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-alert">
                    Alert {index + 1}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-ink/75">
                    {reminder}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}

export default DashboardPage;
