import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BrandMark from '../components/BrandMark';
import LandingLayout from '../layout/LandingLayout';

function SignUpPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    const formData = new FormData(event.currentTarget);
    const fullName = formData.get('fullName');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

<<<<<<< HEAD
    // Validation
    if (!fullName.trim()) {
      setError('Full name is required.');
      return;
    }
    if (!email.trim()) {
      setError('Email is required.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Save to localStorage
    localStorage.setItem('denguewatch.userName', fullName.trim());
    localStorage.setItem('denguewatch.userEmail', email.trim());
=======
    localStorage.setItem(
      'userName',
      typeof fullName === 'string' && fullName.trim()
        ? fullName.trim()
        : 'User'
    );
>>>>>>> origin/frontend-ui-updates

    navigate('/select-barangay');
  };

  return (
    <LandingLayout>
      <main className="flex flex-1 items-center justify-center py-10 sm:py-16">
        <section className="w-full max-w-md rounded-[2rem] bg-paper/95 px-6 py-8 shadow-soft sm:px-8 sm:py-10">
          <div className="flex flex-col items-center text-center">
            <BrandMark compact />
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-navy shadow-soft sm:text-xs">
              <span className="h-2.5 w-2.5 rounded-full bg-alert" />
              Community Access
            </div>
            <h1 className="mt-6 text-3xl font-black tracking-[-0.04em] text-navy sm:text-4xl">
              Create your account
            </h1>
            <p className="mt-3 text-sm leading-7 text-ink/70 sm:text-base">
              Join DengueWatch AI to receive localized dengue updates, alerts, and health insights for your community.
            </p>
          </div>

          {error && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-semibold text-navy" htmlFor="fullName">
                Full Name
              </label>
              <input
                className="w-full rounded-2xl border border-navy/10 bg-white px-4 py-3.5 text-base text-ink shadow-soft outline-none transition placeholder:text-ink/35 focus:border-navy/30 focus:ring-4 focus:ring-navy/10"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                required
                type="text"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-navy" htmlFor="email">
                Email
              </label>
              <input
                className="w-full rounded-2xl border border-navy/10 bg-white px-4 py-3.5 text-base text-ink shadow-soft outline-none transition placeholder:text-ink/35 focus:border-navy/30 focus:ring-4 focus:ring-navy/10"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                type="email"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-navy" htmlFor="password">
                Password
              </label>
              <input
                className="w-full rounded-2xl border border-navy/10 bg-white px-4 py-3.5 text-base text-ink shadow-soft outline-none transition placeholder:text-ink/35 focus:border-navy/30 focus:ring-4 focus:ring-navy/10"
                id="password"
                name="password"
                placeholder="Create a password (min. 6 characters)"
                required
                type="password"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-navy" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="w-full rounded-2xl border border-navy/10 bg-white px-4 py-3.5 text-base text-ink shadow-soft outline-none transition placeholder:text-ink/35 focus:border-navy/30 focus:ring-4 focus:ring-navy/10"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                required
                type="password"
              />
            </div>

            <button
              className="w-full rounded-2xl bg-navy px-8 py-4 text-base font-semibold text-paper shadow-button transition hover:-translate-y-0.5 hover:bg-[#0f3460]"
              type="submit"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink/70">
            Already have an account?{' '}
            <Link
              className="font-semibold text-navy underline decoration-navy/30 underline-offset-4 transition hover:text-alert"
              to="/login"
            >
              Login
            </Link>
          </p>
        </section>
      </main>
    </LandingLayout>
  );
}

export default SignUpPage;