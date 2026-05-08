import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle, Check } from 'lucide-react';
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
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setLoading(true);

    const email = formData.email.trim();
    const password = formData.password;

    // Validate input
    const validationErrors = {};

    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      validationErrors.email = emailValidation.error;
    }

    if (!password) {
      validationErrors.password = 'Password is required';
    } else if (password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters';
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
        setErrors({ submit: res.message || 'Invalid email or password' });
      }
    } catch (err) {
      showToast('Could not connect to server. Please check your connection.', 'error');
      setErrors({ submit: 'Connection error. Please try again.' });
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LandingLayout>
      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 sm:py-12 md:py-16">
        <div className="w-full max-w-sm">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <BrandMark compact />
            </div>
            
            <div className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-navy shadow-soft sm:px-4 sm:py-2 sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-alert animate-pulse" />
              Secure Access
            </div>

            <h1 className="mt-6 text-2xl sm:text-3xl font-black tracking-tight text-navy leading-tight">
              Welcome Back
            </h1>
            
            <p className="mt-2 sm:mt-3 text-sm text-ink/60 leading-relaxed">
              Access real-time dengue risk updates for your area
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-3xl bg-white border border-navy/5 shadow-soft overflow-hidden">
            <form className="p-6 sm:p-8 space-y-5" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-navy">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail
                    size={20}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy/40 group-focus-within:text-navy transition-colors pointer-events-none"
                  />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    disabled={loading}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border text-base text-ink placeholder:text-ink/35 outline-none transition focus:ring-4 ${
                      errors.email
                        ? 'border-red-300 bg-red-50/50 focus:ring-red-100'
                        : 'border-navy/10 bg-navy/2 focus:border-navy/30 focus:ring-navy/10'
                    } disabled:bg-navy/5 disabled:cursor-not-allowed`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {!errors.email && formData.email && (
                    <Check size={20} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-600" />
                  )}
                </div>
                {errors.email && (
                  <div id="email-error" role="alert" className="flex items-center gap-2 text-sm text-red-600 mt-1.5">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-semibold text-navy">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-navy hover:text-alert transition underline decoration-navy/30 underline-offset-2"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="relative group">
                  <Lock
                    size={20}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy/40 group-focus-within:text-navy transition-colors pointer-events-none"
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    disabled={loading}
                    className={`w-full pl-11 pr-12 py-3.5 rounded-2xl border text-base text-ink placeholder:text-ink/35 outline-none transition focus:ring-4 ${
                      errors.password
                        ? 'border-red-300 bg-red-50/50 focus:ring-red-100'
                        : 'border-navy/10 bg-navy/2 focus:border-navy/30 focus:ring-navy/10'
                    } disabled:bg-navy/5 disabled:cursor-not-allowed`}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading || !formData.password}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-navy/40 hover:text-navy transition disabled:opacity-50 disabled:cursor-not-allowed p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <div id="password-error" role="alert" className="flex items-center gap-2 text-sm text-red-600 mt-1.5">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div role="alert" className="flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 p-3.5">
                  <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{errors.submit}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                aria-busy={loading}
                className={`w-full mt-8 rounded-2xl font-semibold text-base py-3.5 transition flex items-center justify-center gap-2 ${
                  loading
                    ? 'bg-navy/60 text-paper/80 cursor-not-allowed'
                    : 'bg-navy hover:bg-navy text-paper shadow-button hover:shadow-lg hover:scale-105 active:scale-95'
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-paper/30 border-t-paper rounded-full animate-spin" />
                    <span>Logging in...</span>
                  </>
                ) : (
                  'Log In'
                )}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-navy/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-ink/60 font-medium">or</span>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-sm text-ink/60 mb-3">
                  New to DengueWatch?
                </p>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center w-full rounded-2xl border-2 border-navy/20 hover:border-navy/40 bg-navy/5 hover:bg-navy/10 py-3 px-4 text-sm font-semibold text-navy transition"
                >
                  Create an Account
                </Link>
              </div>
            </form>

            {/* Footer Info */}
            <div className="bg-navy/2 border-t border-navy/5 px-6 sm:px-8 py-4">
              <p className="text-xs text-ink/50 text-center leading-relaxed">
                We protect your data with industry-standard encryption. Your privacy matters.
              </p>
            </div>
          </div>

          {/* Security Badge */}
          <div className="mt-6 flex items-center justify-center gap-1 text-xs text-ink/50">
            <span>🔒</span>
            <span>SSL Secured • Data Encrypted</span>
          </div>
        </div>
      </main>
    </LandingLayout>
  );
}

export default LoginPage;
