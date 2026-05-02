function MapPage() {
  return (
    <main className="py-8 sm:py-10">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="rounded-[2rem] bg-paper/95 px-6 py-8 shadow-soft sm:px-8">
          <h1 className="text-3xl font-black tracking-[-0.04em] text-navy sm:text-4xl">
            Map View
          </h1>
          <p className="mt-4 text-base text-ink/70">
            Interactive map showing dengue cases and risk areas in your barangay.
          </p>
          <div className="mt-8 h-96 rounded-lg border border-navy/10 bg-sand flex items-center justify-center">
            <p className="text-ink/50">Map visualization coming soon</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MapPage;
