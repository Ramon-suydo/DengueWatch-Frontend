import { Link } from 'react-router-dom';
import BrandMark from './BrandMark';

function LandingNavbar() {
  return (
    <nav className="rounded-[2rem] bg-paper/90 px-5 py-4 shadow-soft backdrop-blur sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <Link to="/">
          <BrandMark compact />
        </Link>

        <div className="flex items-center gap-3">
          <Link
            className="rounded-full px-4 py-2 text-sm font-semibold text-navy transition hover:bg-navy/5"
            to="/login"
          >
            Login
          </Link>
          <button
            className="rounded-2xl bg-navy px-5 py-3 text-sm font-semibold text-paper shadow-button transition hover:-translate-y-0.5 hover:bg-[#0f3460]"
            type="button"
          >
            Get Alerts
          </button>
        </div>
      </div>
    </nav>
  );
}

export default LandingNavbar;
