function AlertsPage() {
  const mockAlerts = [
    {
      id: 1,
      title: 'High Dengue Activity Detected',
      description: 'Cases increased by 4 this week in your area',
      severity: 'high',
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      title: 'Weather Conditions Favorable for Mosquitoes',
      description: 'High humidity expected this week',
      severity: 'medium',
      timestamp: '5 hours ago',
    },
    {
      id: 3,
      title: 'New Case Reported Nearby',
      description: 'A confirmed case was reported 0.5km away',
      severity: 'high',
      timestamp: '1 day ago',
    },
  ];

  return (
    <main className="py-8 sm:py-10">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="rounded-[2rem] bg-paper/95 px-6 py-8 shadow-soft sm:px-8">
          <h1 className="text-3xl font-black tracking-[-0.04em] text-navy sm:text-4xl">
            Alerts
          </h1>
          <p className="mt-4 text-base text-ink/70">
            Real-time alerts about dengue activity and risk factors.
          </p>

          <div className="mt-8 space-y-4">
            {mockAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`rounded-lg border-l-4 p-4 ${
                  alert.severity === 'high'
                    ? 'border-l-alert bg-alert/5'
                    : 'border-l-yellow-500 bg-yellow-50'
                }`}
              >
                <h3 className="font-semibold text-navy">{alert.title}</h3>
                <p className="mt-1 text-sm text-ink/70">{alert.description}</p>
                <p className="mt-2 text-xs text-ink/50">{alert.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default AlertsPage;
