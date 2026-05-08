import { Link } from 'react-router-dom';
import { TrendingUp, MapPin, AlertCircle } from 'lucide-react';

function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background gradient blobs (mobile-optimized) */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-navy/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-80 h-80 bg-alert/3 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:py-24 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/70 backdrop-blur-sm px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-navy shadow-soft sm:px-4 sm:py-2 sm:text-xs">
          <span className="h-2 w-2 rounded-full bg-alert animate-pulse" />
          AI-Powered Intelligence
        </div>

        {/* Main Headline */}
        <h1 className="mt-6 sm:mt-8 max-w-3xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-navy">
          Predict dengue risks{' '}
          <span className="relative inline-block">
            <span className="text-alert">in your community</span>
            <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-alert/60 via-alert to-alert/60 blur-sm rounded-full" />
          </span>
        </h1>

        {/* Subheading */}
        <p className="mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-ink/70">
          Get AI-driven dengue risk predictions for your barangay. Understand local patterns, 
          receive timely alerts, and take action to protect your community.
        </p>

        {/* Feature Pills */}
        <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-2 text-sm text-emerald-700 font-medium">
            <TrendingUp size={16} />
            <span className="hidden sm:inline">Real-time Predictions</span>
            <span className="sm:hidden">Real-time</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-4 py-2 text-sm text-blue-700 font-medium">
            <MapPin size={16} />
            <span className="hidden sm:inline">Location-Based Alerts</span>
            <span className="sm:hidden">Location-Based</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-orange-50 border border-orange-200 px-4 py-2 text-sm text-orange-700 font-medium">
            <AlertCircle size={16} />
            <span className="hidden sm:inline">Early Warning System</span>
            <span className="sm:hidden">Early Warning</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 sm:mt-12 w-full flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-sm sm:max-w-none">
          <Link
            to="/signup"
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-navy to-[#0f3460] px-8 py-3.5 sm:py-4 text-base sm:text-lg font-bold text-paper shadow-button hover:shadow-lg transition hover:scale-105 active:scale-95 duration-200"
          >
            Get Started Free
          </Link>
          <button
            className="inline-flex items-center justify-center rounded-2xl border-2 border-navy/20 bg-white hover:bg-navy/5 px-8 py-3.5 sm:py-4 text-base sm:text-lg font-bold text-navy transition hover:border-navy/40 active:scale-95 duration-200"
            type="button"
            aria-label="Learn more about DengueWatch AI"
          >
            Learn More
          </button>
        </div>

        {/* Social Proof / Stats */}
        <div className="mt-12 sm:mt-16 w-full py-8 sm:py-12 border-t border-navy/10">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-ink/50 mb-8">Trusted by health departments & communities</p>
          <div className="grid grid-cols-3 gap-6 sm:gap-8 max-w-xl mx-auto">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-black text-navy">17</p>
              <p className="text-xs sm:text-sm text-ink/60 mt-1">Cities Covered</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-black text-navy">95%</p>
              <p className="text-xs sm:text-sm text-ink/60 mt-1">Accuracy Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-black text-navy">24/7</p>
              <p className="text-xs sm:text-sm text-ink/60 mt-1">Real-time Updates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-navy/20 to-transparent" />
    </section>
  );
}

export default HeroSection;
