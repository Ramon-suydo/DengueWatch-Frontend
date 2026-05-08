import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Check, ChevronRight, MapPin } from 'lucide-react';
import BrandMark from '../components/BrandMark';
import LandingLayout from '../layout/LandingLayout';

const NCR_CITIES = [
  'CALOOCAN CITY',
  'LAS PINAS CITY',
  'MAKATI CITY',
  'MALABON CITY',
  'MANDALUYONG CITY',
  'MANILA CITY',
  'MARIKINA CITY',
  'MUNTINLUPA CITY',
  'NAVOTAS CITY',
  'PARANAQUE CITY',
  'PASAY CITY',
  'PASIG CITY',
  'PATEROS',
  'QUEZON CITY',
  'SAN JUAN CITY',
  'TAGUIG CITY',
  'VALENZUELA CITY',
];

function CitySelectionPage() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const filtered = NCR_CITIES.filter(c =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  const handleContinue = async () => {
    if (!selectedCity) return;
    setLoading(true);
    localStorage.setItem('denguewatch.selectedCity', selectedCity);
    
    // Simulate brief delay for UX
    setTimeout(() => {
      navigate('/select-district');
    }, 300);
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
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-navy text-white flex items-center justify-center text-[10px] font-black">
                  1
                </div>
                <span>City</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-navy/30" />
              <div className="flex items-center gap-1.5 opacity-50">
                <div className="w-6 h-6 rounded-full border-2 border-navy/30 flex items-center justify-center text-[10px] font-black">
                  2
                </div>
                <span>District</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-navy/30" />
              <div className="flex items-center gap-1.5 opacity-50">
                <div className="w-6 h-6 rounded-full border-2 border-navy/30 flex items-center justify-center text-[10px] font-black">
                  3
                </div>
                <span>Barangay</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-navy leading-tight">
              Where do you live?
            </h1>

            <p className="mt-2 sm:mt-3 text-sm text-ink/60 leading-relaxed">
              Select your city in Metro Manila to get personalized dengue risk updates
            </p>
          </div>

          {/* Selection Card */}
          <div className="rounded-3xl bg-white border border-navy/5 shadow-soft overflow-hidden">
            <div className="p-6 sm:p-8">
              {/* Search Bar */}
              <div className="mb-6">
                <label htmlFor="city-search" className="block text-sm font-semibold text-navy mb-3">
                  Search or select
                </label>
                <div className="relative">
                  <Search
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40 pointer-events-none"
                  />
                  <input
                    id="city-search"
                    type="text"
                    placeholder="Type city name..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-navy/10 bg-navy/2 outline-none transition focus:border-navy/30 focus:ring-4 focus:ring-navy/10 text-base placeholder:text-ink/35"
                  />
                </div>
              </div>

              {/* City List */}
              <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                {filtered.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <MapPin size={32} className="text-ink/20 mb-2" />
                    <p className="text-sm text-ink/50 font-medium">No cities found</p>
                    <p className="text-xs text-ink/40 mt-1">Try a different search</p>
                  </div>
                ) : (
                  filtered.map((city) => {
                    const isSelected = selectedCity === city;
                    return (
                      <button
                        key={city}
                        onClick={() => setSelectedCity(city)}
                        className={`w-full px-4 py-4 rounded-2xl border-2 flex items-center justify-between gap-3 transition active:scale-95 ${
                          isSelected
                            ? 'border-navy bg-navy/5 shadow-md'
                            : 'border-navy/10 bg-white hover:border-navy/20 hover:bg-navy/2'
                        }`}
                        type="button"
                        aria-pressed={isSelected}
                      >
                        <div className="flex items-center gap-3 flex-1 text-left min-w-0">
                          <MapPin
                            size={20}
                            className={`flex-shrink-0 ${
                              isSelected ? 'text-navy' : 'text-navy/40'
                            }`}
                          />
                          <span className={`font-semibold text-base tracking-tight truncate ${
                            isSelected ? 'text-navy' : 'text-ink'
                          }`}>
                            {city}
                          </span>
                        </div>

                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition ${
                          isSelected
                            ? 'border-navy bg-navy'
                            : 'border-navy/20 bg-transparent'
                        }`}>
                          {isSelected && <Check size={16} className="text-white" />}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Selected Display */}
              {selectedCity && (
                <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                  <Check size={20} className="text-emerald-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-900">Selected</p>
                    <p className="text-sm font-semibold text-emerald-900 truncate">{selectedCity}</p>
                  </div>
                </div>
              )}

              {/* Continue Button */}
              <button
                onClick={handleContinue}
                disabled={!selectedCity || loading}
                className={`w-full mt-8 rounded-2xl font-semibold text-base py-3.5 transition flex items-center justify-center gap-2 ${
                  selectedCity && !loading
                    ? 'bg-navy hover:bg-navy text-paper shadow-button hover:shadow-lg hover:scale-105 active:scale-95'
                    : 'bg-navy/60 text-paper/80 cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-paper/30 border-t-paper rounded-full animate-spin" />
                    <span>Continuing...</span>
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ChevronRight size={20} />
                  </>
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="bg-navy/2 border-t border-navy/5 px-6 sm:px-8 py-4">
              <p className="text-xs text-ink/50 text-center">
                Don't see your city? <span className="font-semibold">All 17 NCR cities are supported</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </LandingLayout>
  );
}

export default CitySelectionPage;
