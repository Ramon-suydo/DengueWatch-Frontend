import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-20 lg:py-24">
      <div className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-navy shadow-soft sm:text-xs">
        <span className="h-2.5 w-2.5 rounded-full bg-alert" />
        Predictive Intelligence
      </div>

      <h1 className="mt-8 max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.05em] text-navy sm:text-6xl md:text-7xl lg:text-[5.5rem]">
        Predict <span className="text-alert">dengue</span> risks in your
        community
      </h1>

      <p className="mt-8 max-w-2xl text-base leading-8 text-ink/80 sm:text-lg">
        Harness the power of AI-driven epidemiological modeling to help
        residents spot risk patterns earlier, understand local exposure, and
        respond to outbreaks with more confidence.
      </p>

      <div className="mt-10 flex w-full max-w-md flex-col gap-4 sm:max-w-none sm:flex-row sm:justify-center">
        <Link
          className="rounded-2xl bg-navy px-8 py-4 text-base font-semibold text-paper shadow-button transition hover:-translate-y-0.5 hover:bg-[#0f3460]"
          to="/signup"
        >
          Create Account
        </Link>
        <button
          className="rounded-2xl border border-navy/10 bg-white px-8 py-4 text-base font-semibold text-navy shadow-soft transition hover:-translate-y-0.5 hover:bg-navy/[0.03]"
          type="button"
        >
          Learn More
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
