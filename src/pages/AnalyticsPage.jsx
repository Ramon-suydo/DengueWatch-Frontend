function AnalyticsPage() {
  const mockStats = [
    { label: 'Total Cases (30 days)', value: '47', trend: '+12%' },
    { label: 'Average Weekly Cases', value: '11.75', trend: '+8%' },
    { label: 'Recovery Rate', value: '94%', trend: '+2%' },
    { label: 'Active Cases', value: '3', trend: '-1' },
  ];

  return (
    <main className="py-8 sm:py-10">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="rounded-[2rem] bg-paper/95 px-6 py-8 shadow-soft sm:px-8">
          <h1 className="text-3xl font-black tracking-[-0.04em] text-navy sm:text-4xl">
            Analytics
          </h1>
          <p className="mt-4 text-base text-ink/70">
            Detailed analytics and trends for dengue activity in your area.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {mockStats.map((stat, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-navy/10 bg-sand/50 p-6"
              >
                <p className="text-sm font-medium text-ink/70">{stat.label}</p>
                <div className="mt-2 flex items-end justify-between">
                  <p className="text-2xl font-bold text-navy">{stat.value}</p>
                  <p className="text-sm font-semibold text-alert">{stat.trend}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-navy">Trend Chart</h2>
            <div className="mt-4 h-64 rounded-lg border border-navy/10 bg-sand flex items-center justify-center">
              <p className="text-ink/50">Chart visualization coming soon</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AnalyticsPage;
