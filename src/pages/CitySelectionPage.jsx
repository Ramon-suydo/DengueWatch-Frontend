import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

function BarangaySelectionPage() {
    const navigate = useNavigate();
    const [selectedCity, setSelectedCity] = useState('');
    const [search, setSearch] = useState('');

    const filtered = NCR_CITIES.filter(c =>
        c.toLowerCase().includes(search.toLowerCase())
    );

    const handleContinue = () => {
        if (!selectedCity) return;
        localStorage.setItem('denguewatch.selectedCity', selectedCity);
        navigate('/select-district');
    };

    return (
        <LandingLayout>
            <main className="flex flex-1 items-center justify-center py-10 sm:py-16">
                <section className="w-full max-w-2xl rounded-[2rem] bg-paper/95 px-6 py-8 shadow-soft sm:px-8 sm:py-10">
                    <div className="flex flex-col items-center text-center">
                        <BrandMark compact />
                        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-navy shadow-soft sm:text-xs">
                            <span className="h-2.5 w-2.5 rounded-full bg-alert" />
                            Step 1 of 3
                        </div>
                        <h1 className="mt-6 text-3xl font-black tracking-[-0.04em] text-navy sm:text-4xl">
                            Select Your City
                        </h1>
                        <p className="mt-3 max-w-xl text-sm leading-7 text-ink/70 sm:text-base">
                            Select your city in Metro Manila to get accurate dengue risk predictions.
                        </p>
                    </div>

                    <div className="mt-8">
                        <input
                            className="w-full rounded-2xl border border-navy/10 bg-white px-4 py-3.5 text-base text-ink shadow-soft outline-none transition placeholder:text-ink/35 focus:border-navy/30 focus:ring-4 focus:ring-navy/10"
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search city..."
                            type="text"
                            value={search}
                        />
                    </div>

                    <div className="mt-4 grid max-h-72 gap-3 overflow-y-auto pr-1">
                        {filtered.length === 0 ? (
                            <p className="py-4 text-center text-sm text-ink/50">No city found</p>
                        ) : (
                            filtered.map((city) => {
                                const isSelected = selectedCity === city;
                                return (
                                    <button
                                        key={city}
                                        className={`w-full rounded-[1.5rem] border px-5 py-4 text-left shadow-soft transition ${
                                            isSelected
                                                ? 'border-navy bg-navy text-paper shadow-button'
                                                : 'border-navy/10 bg-white text-navy hover:-translate-y-0.5 hover:border-navy/20 hover:bg-navy/[0.03]'
                                        }`}
                                        onClick={() => setSelectedCity(city)}
                                        type="button"
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            <p className="font-bold tracking-tight">{city}</p>
                                            <span
                                                className={`h-5 w-5 flex-shrink-0 rounded-full border-2 ${
                                                    isSelected ? 'border-paper bg-paper' : 'border-navy/20 bg-transparent'
                                                }`}
                                            />
                                        </div>
                                    </button>
                                );
                            })
                        )}
                    </div>

                    {selectedCity && (
                        <p className="mt-4 text-center text-sm font-semibold text-navy">
                            Selected: {selectedCity}
                        </p>
                    )}

                    <button
                        className={`mt-6 w-full rounded-2xl px-8 py-4 text-base font-semibold transition ${
                            selectedCity
                                ? 'bg-navy text-paper shadow-button hover:-translate-y-0.5 hover:bg-[#0f3460]'
                                : 'cursor-not-allowed bg-navy/20 text-navy/50'
                        }`}
                        disabled={!selectedCity}
                        onClick={handleContinue}
                        type="button"
                    >
                        Continue →
                    </button>
                </section>
            </main>
        </LandingLayout>
    );
}

export default BarangaySelectionPage;