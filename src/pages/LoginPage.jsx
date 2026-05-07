import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BrandMark from '../components/BrandMark';
import LandingLayout from '../layout/LandingLayout';
import { useToast } from '../components/ToastProvider';
import { validateEmail } from '../utils/validation';
import api from '../services/api';

function LoginPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    // Validate input
    const validationErrors = {};

    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      validationErrors.email = emailValidation.error;
    }

    if (!password) {
      validationErrors.password = 'Password is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast('Please fix the errors below', 'error');
      setLoading(false);
      return;
    }

    try {
      const res = await api.login(email, password);

      if (res.success) {
        // Admin login
        localStorage.setItem('denguewatch.token', res.data.token);
        localStorage.setItem('denguewatch.userName', res.data.user.name);
        localStorage.setItem('denguewatch.role', res.data.user.role);
        
        showToast(`Welcome back, ${res.data.user.name}!`, 'success');
        navigate('/dashboard');
      } else {
        showToast(res.message || 'Invalid credentials', 'error');
      }
    } catch (err) {
      showToast('Could not connect to server. Please check your connection.', 'error');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LandingLayout>
      <main className="flex flex-1 items-center justify-center py-10 sm:py-16">
        <section className="w-full max-w-md rounded-[2rem] bg-paper/95 px-6 py-8 shadow-soft sm:px-8 sm:py-10">
          <div className="flex flex-col items-center text-center">
            <BrandMark compact />
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-navy shadow-soft sm:text-xs">
              <span className="h-2.5 w-2.5 rounded-full bg-alert" />
              Secure Access
            </div>
            <h1 className="mt-6 text-3xl font-black tracking-[-0.04em] text-navy sm:text-4xl">
              Welcome back
            </h1>
            <p className="mt-3 text-sm leading-7 text-ink/70 sm:text-base">
              Log in to view localized dengue risk updates, alerts, and community insights.
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-semibold text-navy" htmlFor="email">
                Email
              </label>
              <input
                className={`w-full rounded-2xl border ${
                  errors.email ? 'border-red-300 bg-red-50' : 'border-navy/10 bg-white'
                } px-4 py-3.5 text-base text-ink shadow-soft outline-none transition placeholder:text-ink/35 focus:border-navy/30 focus:ring-4 focus:ring-navy/10`}
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                type="email"
                disabled={loading}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <div id="email-error" role="alert" className="mt-1 text-sm text-red-600">
                  {errors.email}
                </div>
              )}
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label className="block text-sm font-semibold text-navy" htmlFor="password">
                  Password
                </label>
              </div>
              <input
                className={`w-full rounded-2xl border ${
                  errors.password ? 'border-red-300 bg-red-50' : 'border-navy/10 bg-white'
                } px-4 py-3.5 text-base text-ink shadow-soft outline-none transition placeholder:text-ink/35 focus:border-navy/30 focus:ring-4 focus:ring-navy/10`}
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                type="password"
                disabled={loading}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              {errors.password && (
                <div id="password-error" role="alert" className="mt-1 text-sm text-red-600">
                  {errors.password}
                </div>
              )}
            </div>

            <button
              className="w-full rounded-2xl bg-navy px-8 py-4 text-base font-semibold text-paper shadow-button transition hover:-translate-y-0.5 hover:bg-[#0f3460] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={loading}
              type="submit"
              aria-busy={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink/70">
            Don&apos;t have an account?{' '}
            <Link
              className="font-semibold text-navy underline decoration-navy/30 underline-offset-4 transition hover:text-alert"
              to="/signup"
            >
              Sign Up
            </Link>
          </p>
        </section>
      </main>
    </LandingLayout>
  );
}

export default LoginPage;