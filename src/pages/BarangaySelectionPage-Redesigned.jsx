import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Check, ChevronRight, Home } from 'lucide-react';
import BrandMark from '../components/BrandMark';
import LandingLayout from '../layout/LandingLayout';

function BarangaySelectionPage() {
  const navigate = useNavigate();
  const [selectedBarangay, setSelectedBarangay] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const barangays = JSON.parse(
    localStorage.getItem('denguewatch.districtBarangays') || '[]'
  );

  const selectedCity = localStorage.getItem('denguewatch.selectedCity') || '';
  const selectedDistrict = localStorage.getItem('denguewatch.selectedDistrict') || '';

  const filtered = barangays.filter(b =>
    b.toLowerCase().includes(search.toLowerCase())
  );

  const handleContinue = async () => {
    if (!selectedBarangay) return;
    setLoading(true);

    localStorage.setItem('denguewatch.selectedBarangay', selectedBarangay);

    // Simulate brief delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 500);
  };

  return (
    <LandingLayout>
      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 sm:py-12 md:py-16">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <BrandMark compact />
            </div>

            {/* Progress Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-navy/10 bg-white/70 backdrop-blur-sm px-4 py-2 text-xs font-bold uppercase tracking-widest text-navy shadow-soft mb-6">
              <div className="flex items-center gap-1.5 opacity-50">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black">
                  <Check size={16} />
                </div>
                <span>City</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-navy/30" />
              <div className="flex items-center gap-1.5 opacity-50">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black">
                  <Check size={16} />
                </div>
                <span>District</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-navy/30" />
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-navy text-white flex items-center justify-center text-[10px] font-black">
                  3
                </div>
                <span>Barangay</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-navy leading-tight">
              Final Step: Your Barangay
            </h1>

            <p className="mt-2 sm:mt-3 text-sm text-ink/60 leading-relaxed">
              Select your home barangay for precise dengue predictions
            </p>
          </div>

          {/* Selection Card */}
          <div className="rounded-3xl bg-white border border-navy/5 shadow-soft overflow-hidden">
            <div className="p-6 sm:p-8">
              {/* Location Breadcrumb */}
              <div className="mb-6 p-4 rounded-xl bg-navy/2 border border-navy/10">
                <p className="text-xs font-bold uppercase tracking-wider text-ink/60 mb-2">Current Selection</p>
                <div className="space-y-1 text-sm">
                  <p className="font-semibold text-navy">{selectedCity}</p>
                  <p className="text-ink/60">→ {selectedDistrict}</p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="mb-6">
                <label htmlFor="barangay-search" className="block text-sm font-semibold text-navy mb-3">
                  Search or select barangay
                </label>
                <div className="relative">
                  <Search
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40 pointer-events-none"
                  />
                  <input
                    id="barangay-search"
                    type="text"
                    placeholder="Type barangay name..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-navy/10 bg-navy/2 outline-none transition focus:border-navy/30 focus:ring-4 focus:ring-navy/10 text-base placeholder:text-ink/35"
                  />
                </div>
                <p className="text-xs text-ink/50 mt-2">
                  {filtered.length} of {barangays.length} barangay{barangays.length !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Barangay Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2">
                {filtered.length === 0 ? (
                  <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                    <Home size={32} className="text-ink/20 mb-2" />
                    <p className="text-sm text-ink/50 font-medium">No barangays found</p>
                    <p className="text-xs text-ink/40 mt-1">Try a different search</p>
                  </div>
                ) : (
                  filtered.map((barangay) => {
                    const isSelected = selectedBarangay === barangay;
                    return (
                      <button
                        key={barangay}
                        onClick={() => setSelectedBarangay(barangay)}
                        className={`px-4 py-4 rounded-2xl border-2 flex items-center justify-between gap-3 transition active:scale-95 text-left ${
                          isSelected
                            ? 'border-navy bg-navy/5 shadow-md'
                            : 'border-navy/10 bg-white hover:border-navy/20 hover:bg-navy/2'
                        }`}
                        type="button"
                        aria-pressed={isSelected}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <Home
                            size={18}
                            className={`flex-shrink-0 ${
                              isSelected ? 'text-navy' : 'text-navy/40'
                            }`}
                          />
                          <span className={`font-medium text-sm truncate ${
                            isSelected ? 'text-navy' : 'text-ink'
                          }`}>
                            {barangay}
                          </span>
                        </div>

                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition ${
                          isSelected
                            ? 'border-navy bg-navy'
                            : 'border-navy/20 bg-transparent'
                        }`}>
                          {isSelected && <Check size={14} className="text-white" />}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Selected Display */}
              {selectedBarangay && (
                <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                  <Check size={20} className="text-emerald-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-900">Your Location</p>
                    <p className="text-sm font-semibold text-emerald-900 truncate">{selectedBarangay}</p>
                  </div>
                </div>
              )}

              {/* Complete Button */}
              <button
                onClick={handleContinue}
                disabled={!selectedBarangay || loading}
                className={`w-full mt-8 rounded-2xl font-semibold text-base py-3.5 transition flex items-center justify-center gap-2 ${
                  selectedBarangay && !loading
                    ? 'bg-navy hover:bg-navy text-paper shadow-button hover:shadow-lg hover:scale-105 active:scale-95'
                    : 'bg-navy/60 text-paper/80 cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-paper/30 border-t-paper rounded-full animate-spin" />
                    <span>Setting up...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Setup</span>
                    <ChevronRight size={20} />
                  </>
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="bg-navy/2 border-t border-navy/5 px-6 sm:px-8 py-4">
              <p className="text-xs text-ink/50 text-center">
                Step 3 of 3 • After this, you'll see your personalized dashboard
              </p>
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-6 rounded-xl bg-blue-50 border border-blue-200 p-4 text-center">
            <p className="text-xs text-blue-900 leading-relaxed">
              <strong>Can't find your barangay?</strong> You can change your location anytime from the settings menu in your dashboard.
            </p>
          </div>
        </div>
      </main>
    </LandingLayout>
  );
}

export default BarangaySelectionPage;
