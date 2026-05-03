import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandMark from '../components/BrandMark';
import LandingLayout from '../layout/LandingLayout';

<<<<<<< HEAD
const BARANGAYS = [
  'Barangay 1', 'Barangay 2', 'Barangay 3', 'Barangay 4', 'Barangay 5',
  'Barangay 6', 'Barangay 7', 'Barangay 8', 'Barangay 9', 'Barangay 10',
  'Barangay 11', 'Barangay 12', 'Barangay 13', 'Barangay 14', 'Barangay 15',
  'Barangay 16', 'Barangay 17', 'Barangay 18', 'Barangay 19', 'Barangay 20',
  'Barangay 21', 'Barangay 22', 'Barangay 23', 'Barangay 24', 'Barangay 25',
  'Barangay 26', 'Barangay 27', 'Barangay 28', 'Barangay 29', 'Barangay 30',
  'Barangay 31', 'Barangay 32', 'Barangay 33', 'Barangay 34', 'Barangay 35',
  'Barangay 36', 'Barangay 37', 'Barangay 38', 'Barangay 39', 'Barangay 40',
  'Barangay 41', 'Barangay 42', 'Barangay 43', 'Barangay 44', 'Barangay 45',
  'Barangay 46', 'Barangay 47', 'Barangay 48', 'Barangay 49', 'Barangay 50',
  'Barangay 51', 'Barangay 52', 'Barangay 53', 'Barangay 54', 'Barangay 55',
  'Barangay 56', 'Barangay 57', 'Barangay 58', 'Barangay 59', 'Barangay 60',
  'Barangay 61', 'Barangay 62', 'Barangay 63', 'Barangay 64', 'Barangay 65',
  'Barangay 66', 'Barangay 67', 'Barangay 68', 'Barangay 69', 'Barangay 70',
  'Barangay 71', 'Barangay 72', 'Barangay 73', 'Barangay 74', 'Barangay 75',
  'Barangay 76', 'Barangay 77', 'Barangay 78', 'Barangay 79', 'Barangay 80',
  'Barangay 81', 'Barangay 82', 'Barangay 83', 'Barangay 84', 'Barangay 85',
  'Barangay 86', 'Barangay 87', 'Barangay 88', 'Barangay 89', 'Barangay 90',
  'Barangay 91', 'Barangay 92', 'Barangay 93', 'Barangay 94', 'Barangay 95',
  'Barangay 96', 'Barangay 97', 'Barangay 98', 'Barangay 99', 'Barangay 100',
  'Barangay 101', 'Barangay 102', 'Barangay 103', 'Barangay 104', 'Barangay 105',
];
=======
const BARANGAYS = ['Brgy. 001 - Tondo', 'Brgy. 002 - Tondo', 'Brgy. 003 - Tondo', 'Brgy. 004 - Tondo', 'Brgy. 005 - Tondo'];
>>>>>>> origin/frontend-ui-updates

function BarangaySelectionPage() {
  const navigate = useNavigate();
  const [selectedBarangay, setSelectedBarangay] = useState('');
  const [search, setSearch] = useState('');

  const filtered = BARANGAYS.filter(b =>
    b.toLowerCase().includes(search.toLowerCase())
  );

  const handleContinue = () => {
<<<<<<< HEAD
    if (!selectedBarangay) return;
    localStorage.setItem('denguewatch.selectedBarangay', selectedBarangay);
=======
    if (!selectedBarangay) {
      return;
    }

    localStorage.setItem('selectedBarangay', selectedBarangay);
>>>>>>> origin/frontend-ui-updates
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
              Tondo, Manila
            </div>
            <h1 className="mt-6 text-3xl font-black tracking-[-0.04em] text-navy sm:text-4xl">
              Select Your Barangay
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-ink/70 sm:text-base">
              This helps us provide accurate dengue risk predictions for your area in Tondo, Manila.
            </p>
          </div>

          {/* Search */}
          <div className="mt-8">
            <input
              className="w-full rounded-2xl border border-navy/10 bg-white px-4 py-3.5 text-base text-ink shadow-soft outline-none transition placeholder:text-ink/35 focus:border-navy/30 focus:ring-4 focus:ring-navy/10"
              onChange={e => setSearch(e.target.value)}
              placeholder="Search barangay..."
              type="text"
              value={search}
            />
          </div>

          {/* Barangay List */}
          <div className="mt-4 grid max-h-72 gap-3 overflow-y-auto pr-1">
            {filtered.length === 0 ? (
              <p className="py-4 text-center text-sm text-ink/50">No barangay found</p>
            ) : (
              filtered.map((barangay) => {
                const isSelected = selectedBarangay === barangay;
                return (
                  <button
                    key={barangay}
                    className={`w-full rounded-[1.5rem] border px-5 py-4 text-left shadow-soft transition ${
                      isSelected
                        ? 'border-navy bg-navy text-paper shadow-button'
                        : 'border-navy/10 bg-white text-navy hover:-translate-y-0.5 hover:border-navy/20 hover:bg-navy/[0.03]'
                    }`}
                    onClick={() => setSelectedBarangay(barangay)}
                    type="button"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-bold tracking-tight">{barangay}</p>
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

          {selectedBarangay && (
            <p className="mt-4 text-center text-sm font-semibold text-navy">
              Selected: {selectedBarangay}
            </p>
          )}

          <button
            className={`mt-6 w-full rounded-2xl px-8 py-4 text-base font-semibold transition ${
              selectedBarangay
                ? 'bg-navy text-paper shadow-button hover:-translate-y-0.5 hover:bg-[#0f3460]'
                : 'cursor-not-allowed bg-navy/20 text-navy/50'
            }`}
            disabled={!selectedBarangay}
            onClick={handleContinue}
            type="button"
          >
            Continue to Dashboard
          </button>
        </section>
      </main>
    </LandingLayout>
  );
}

export default BarangaySelectionPage;