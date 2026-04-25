import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandMark from '../components/BrandMark';
import LandingLayout from '../layout/LandingLayout';

const BARANGAYS = ['Barangay 1', 'Barangay 2', 'Barangay 3'];

function BarangaySelectionPage() {
  const navigate = useNavigate();
  const [selectedBarangay, setSelectedBarangay] = useState('');

  const handleContinue = () => {
    if (!selectedBarangay) {
      return;
    }

    localStorage.setItem('denguewatch.selectedBarangay', selectedBarangay);
    navigate('/dashboard');
  };

  return (
    <LandingLayout>
      <main className="flex flex-1 items-center justify-center py-10 sm:py-16">
        <section className="w-full max-w-2xl rounded-[2rem] bg-paper/95 px-6 py-8 shadow-soft sm:px-8 sm:py-10">
          <div className="flex flex-col items-center text-center">
            <BrandMark compact />
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-navy shadow-soft sm:text-xs">
              <span className="h-2.5 w-2.5 rounded-full bg-alert" />
              Localized Setup
            </div>
            <h1 className="mt-6 text-3xl font-black tracking-[-0.04em] text-navy sm:text-4xl">
              Select Your Barangay
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-ink/70 sm:text-base">
              This helps us provide accurate dengue risk predictions in your
              area.
            </p>
          </div>

          <div className="mt-8 grid gap-4">
            {BARANGAYS.map((barangay) => {
              const isSelected = selectedBarangay === barangay;

              return (
                <button
                  key={barangay}
                  className={`w-full rounded-[1.5rem] border px-5 py-5 text-left shadow-soft transition ${
                    isSelected
                      ? 'border-navy bg-navy text-paper shadow-button'
                      : 'border-navy/10 bg-white text-navy hover:-translate-y-0.5 hover:border-navy/20 hover:bg-navy/[0.03]'
                  }`}
                  onClick={() => setSelectedBarangay(barangay)}
                  type="button"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-lg font-bold tracking-tight">
                        {barangay}
                      </p>
                      <p
                        className={`mt-1 text-sm ${
                          isSelected ? 'text-paper/80' : 'text-ink/60'
                        }`}
                      >
                        Use this barangay for personalized alerts and dengue
                        risk updates.
                      </p>
                    </div>
                    <span
                      className={`h-5 w-5 rounded-full border-2 ${
                        isSelected
                          ? 'border-paper bg-paper'
                          : 'border-navy/20 bg-transparent'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <button
            className={`mt-8 w-full rounded-2xl px-8 py-4 text-base font-semibold transition ${
              selectedBarangay
                ? 'bg-navy text-paper shadow-button hover:-translate-y-0.5 hover:bg-[#0f3460]'
                : 'cursor-not-allowed bg-navy/20 text-navy/50 shadow-none'
            }`}
            disabled={!selectedBarangay}
            onClick={handleContinue}
            type="button"
          >
            Continue
          </button>
        </section>
      </main>
    </LandingLayout>
  );
}

export default BarangaySelectionPage;
