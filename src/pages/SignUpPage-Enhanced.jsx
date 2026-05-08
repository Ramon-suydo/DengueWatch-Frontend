import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import BrandMark from '../components/BrandMark';
import LandingLayout from '../layout/LandingLayout';
import { useToast } from '../components/ToastProvider';
import { validateEmail, validatePassword, validatePasswordMatch } from '../utils/validation';
import api from '../services/api';
import { ScaleBounceWrapper } from '../components/Animations';

function SignUpPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Check password strength in real-time
    if (name === 'password') {
      const strength = validatePassword(value).strength;
      setPasswordStrength(strength);
    }
  };

  const getStrengthLabel = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength === 1) return 'Weak';
    if (passwordStrength === 2) return 'Fair';
    if (passwordStrength === 3) return 'Good';
    return 'Strong';
  };

  const getStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-300';
    if (passwordStrength === 1) return 'bg-red-500';
    if (passwordStrength === 2) return 'bg-yellow-500';
    if (passwordStrength === 3) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setLoading(true);

    const newErrors = {};

    // Validate Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Validate Email
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.valid) {
      newErrors.email = emailValidation.error;
    }

    // Validate Password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.valid) {
        newErrors.password = passwordValidation.error;
      }
    }

    // Validate Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (!validatePasswordMatch(formData.password, formData.confirmPassword)) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast('Please fix the errors below', 'error');
      setLoading(false);
      return;
    }

    try {
      // Call signup API
      const res = await api.signup?.(
        formData.fullName.trim(),
        formData.email.trim(),
        formData.password
      ) || { success: true };

      if (res.success) {
        // Store user info
        localStorage.setItem('denguewatch.userName', formData.fullName.trim());
        localStorage.setItem('denguewatch.userEmail', formData.email.trim());

        showToast(`Welcome, ${formData.fullName.trim()}! Account created successfully.`, 'success');
        
        // Redirect to city selection
        setTimeout(() => {
          navigate('/select-city');
        }, 1500);
      } else {
        showToast(res.message || 'Failed to create account', 'error');
      }
    } catch (err) {
      showToast('Could not connect to server. Please try again.', 'error');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.fullName && formData.email && formData.password && 
                     formData.confirmPassword && !Object.keys(errors).length;

  return (
    <LandingLayout>
      <main className="flex flex-1 items-center justify-center py-10 sm:py-16">
        <ScaleBounceWrapper>
          <section className="w-full max-w-md rounded-[2rem] bg-paper/95 px-6 py-8 shadow-soft sm:px-8 sm:py-10 border border-navy/10">
            <div className="flex flex-col items-center text-center">
              <BrandMark compact />
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-navy shadow-soft sm:text-xs">
                <span className="h-2.5 w-2.5 rounded-full bg-alert animate-pulse" />
                Community Access
              </div>
              <h1 className="mt-6 text-3xl font-black tracking-[-0.04em] text-navy sm:text-4xl">
                Create your account
              </h1>
              <p className="mt-3 text-sm leading-7 text-ink/70 sm:text-base">
                Join DengueWatch AI to receive localized dengue updates, alerts, and health insights.
              </p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              {/* Full Name Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-navy" htmlFor="fullName">
                    Full Name
                  </label>
                  {formData.fullName && !errors.fullName && (
                    <CheckCircle size={16} className="text-green-500" />
                  )}
                </div>
                <input
                  className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-base text-ink shadow-soft outline-none transition placeholder:text-ink/35 focus:ring-4 ${
                    errors.fullName
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                      : 'border-navy/10 focus:border-navy/30 focus:ring-navy/10'
                  }`}
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? 'fullName-error' : ''}
                />
                {errors.fullName && (
                  <p id="fullName-error" className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} /> {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-navy" htmlFor="email">
                    Email
                  </label>
                  {formData.email && !errors.email && (
                    <CheckCircle size={16} className="text-green-500" />
                  )}
                </div>
                <input
                  className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-base text-ink shadow-soft outline-none transition placeholder:text-ink/35 focus:ring-4 ${
                    errors.email
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                      : 'border-navy/10 focus:border-navy/30 focus:ring-navy/10'
                  }`}
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : ''}
                />
                {errors.email && (
                  <p id="email-error" className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} /> {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-navy" htmlFor="password">
                    Password
                  </label>
                  {passwordStrength > 0 && (
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      passwordStrength === 1 ? 'bg-red-100 text-red-700' :
                      passwordStrength === 2 ? 'bg-yellow-100 text-yellow-700' :
                      passwordStrength === 3 ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {getStrengthLabel()}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    className={`w-full rounded-2xl border bg-white px-4 py-3.5 pr-12 text-base text-ink shadow-soft outline-none transition placeholder:text-ink/35 focus:ring-4 ${
                      errors.password
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                        : 'border-navy/10 focus:border-navy/30 focus:ring-navy/10'
                    }`}
                    id="password"
                    name="password"
                    placeholder="Create a strong password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'password-error' : ''}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/50 hover:text-ink transition"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {passwordStrength > 0 && (
                  <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${getStrengthColor()}`}
                      style={{ width: `${(passwordStrength / 4) * 100}%` }}
                    />
                  </div>
                )}
                {errors.password && (
                  <p id="password-error" className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} /> {errors.password}
                  </p>
                )}
                <p className="mt-2 text-xs text-ink/60">
                  Password must be at least 8 characters with uppercase, lowercase, and number
                </p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-navy" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  {formData.confirmPassword && !errors.confirmPassword && formData.password === formData.confirmPassword && (
                    <CheckCircle size={16} className="text-green-500" />
                  )}
                </div>
                <div className="relative">
                  <input
                    className={`w-full rounded-2xl border bg-white px-4 py-3.5 pr-12 text-base text-ink shadow-soft outline-none transition placeholder:text-ink/35 focus:ring-4 ${
                      errors.confirmPassword
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                        : 'border-navy/10 focus:border-navy/30 focus:ring-navy/10'
                    }`}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    type={showConfirm ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    aria-invalid={!!errors.confirmPassword}
                    aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : ''}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/50 hover:text-ink transition"
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p id="confirmPassword-error" className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} /> {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                className={`w-full rounded-2xl px-8 py-4 text-base font-semibold shadow-button transition hover:-translate-y-0.5 ${
                  isFormValid && !loading
                    ? 'bg-navy text-paper hover:bg-[#0f3460]'
                    : 'bg-navy/50 text-paper/70 cursor-not-allowed'
                }`}
                type="submit"
                disabled={!isFormValid || loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </div>
                ) : (
                  'Create Account'
                )}
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
        </ScaleBounceWrapper>
      </main>
    </LandingLayout>
  );
}

export default SignUpPage;
