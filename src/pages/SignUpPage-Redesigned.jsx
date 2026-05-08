import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, CheckCircle, AlertCircle } from 'lucide-react';
import BrandMark from '../components/BrandMark';
import LandingLayout from '../layout/LandingLayout';
import { useToast } from '../components/ToastProvider';
import api from '../services/api';

const getPasswordStrength = (password) => {
  if (!password) return { level: 0, label: '', color: '' };
  
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z\d]/.test(password)) strength++;

  if (strength <= 2) return { level: 1, label: 'Weak', color: 'bg-red-500' };
  if (strength <= 3) return { level: 2, label: 'Fair', color: 'bg-orange-500' };
  if (strength <= 4) return { level: 3, label: 'Good', color: 'bg-yellow-500' };
  return { level: 4, label: 'Strong', color: 'bg-emerald-500' };
};

function SignUpPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const passwordStrength = getPasswordStrength(formData.password);
  const passwordsMatch = formData.password && formData.confirmPassword === formData.password;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter a valid name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (passwordStrength.level <= 1) {
      newErrors.password = 'Password is too weak. Add uppercase, numbers, or symbols';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast('Please fix the errors below', 'error');
      return;
    }

    setLoading(true);

    try {
      // Call signup API
      const res = await api.signup({
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password
      });

      if (res.success) {
        localStorage.setItem('denguewatch.userName', formData.fullName.trim());
        localStorage.setItem('denguewatch.userEmail', formData.email.trim());
        
        showToast('Account created successfully! Setting up your location...', 'success');
        navigate('/select-city');
      } else {
        setErrors({ submit: res.message || 'Could not create account' });
        showToast(res.message || 'Could not create account', 'error');
      }
    } catch (err) {
      setErrors({ submit: 'Connection error. Please try again.' });
      showToast('Could not connect to server', 'error');
      console.error('Signup error:', err);
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
              Community Access
            </div>

            <h1 className="mt-6 text-2xl sm:text-3xl font-black tracking-tight text-navy leading-tight">
              Create Account
            </h1>
            
            <p className="mt-2 sm:mt-3 text-sm text-ink/60 leading-relaxed">
              Join our community for localized dengue updates and health insights
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-3xl bg-white border border-navy/5 shadow-soft overflow-hidden">
            <form className="p-6 sm:p-8 space-y-5" onSubmit={handleSubmit}>
              {/* Full Name Field */}
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-semibold text-navy">
                  Full Name
                </label>
                <div className="relative group">
                  <User
                    size={20}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy/40 group-focus-within:text-navy transition-colors pointer-events-none"
                  />
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    disabled={loading}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border text-base text-ink placeholder:text-ink/35 outline-none transition focus:ring-4 ${
                      errors.fullName
                        ? 'border-red-300 bg-red-50/50 focus:ring-red-100'
                        : 'border-navy/10 bg-navy/2 focus:border-navy/30 focus:ring-navy/10'
                    } disabled:bg-navy/5 disabled:cursor-not-allowed`}
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                  />
                </div>
                {errors.fullName && (
                  <div id="fullName-error" role="alert" className="flex items-center gap-2 text-sm text-red-600 mt-1.5">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    {errors.fullName}
                  </div>
                )}
              </div>

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
                <label htmlFor="password" className="block text-sm font-semibold text-navy">
                  Password
                </label>
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

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="space-y-2 mt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-ink/60">Strength</span>
                      <span className={`text-xs font-bold ${
                        passwordStrength.level === 1 ? 'text-red-600' :
                        passwordStrength.level === 2 ? 'text-orange-600' :
                        passwordStrength.level === 3 ? 'text-yellow-600' :
                        'text-emerald-600'
                      }`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 h-1.5 rounded-full transition-colors ${
                            i < passwordStrength.level ? passwordStrength.color : 'bg-navy/10'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-ink/50">
                      {passwordStrength.level <= 1 && 'Add uppercase, numbers, or symbols for stronger security'}
                      {passwordStrength.level === 2 && 'Good, but consider adding more variety'}
                      {passwordStrength.level === 3 && 'Good strength'}
                      {passwordStrength.level === 4 && 'Excellent security!'}
                    </p>
                  </div>
                )}

                {errors.password && (
                  <div id="password-error" role="alert" className="flex items-center gap-2 text-sm text-red-600 mt-1.5">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-navy">
                  Confirm Password
                </label>
                <div className="relative group">
                  <Lock
                    size={20}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy/40 group-focus-within:text-navy transition-colors pointer-events-none"
                  />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    disabled={loading}
                    className={`w-full pl-11 pr-12 py-3.5 rounded-2xl border text-base text-ink placeholder:text-ink/35 outline-none transition focus:ring-4 ${
                      errors.confirmPassword
                        ? 'border-red-300 bg-red-50/50 focus:ring-red-100'
                        : 'border-navy/10 bg-navy/2 focus:border-navy/30 focus:ring-navy/10'
                    } disabled:bg-navy/5 disabled:cursor-not-allowed`}
                    aria-invalid={!!errors.confirmPassword}
                    aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading || !formData.confirmPassword}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-navy/40 hover:text-navy transition disabled:opacity-50 disabled:cursor-not-allowed p-1"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Password Match Indicator */}
                {formData.confirmPassword && (
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                    passwordsMatch
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                      : 'bg-red-50 border border-red-200 text-red-700'
                  }`}>
                    {passwordsMatch ? (
                      <>
                        <CheckCircle size={16} />
                        <span>Passwords match</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle size={16} />
                        <span>Passwords do not match</span>
                      </>
                    )}
                  </div>
                )}

                {errors.confirmPassword && (
                  <div id="confirmPassword-error" role="alert" className="flex items-center gap-2 text-sm text-red-600 mt-1.5">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    {errors.confirmPassword}
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
                    <span>Creating account...</span>
                  </>
                ) : (
                  'Create Account'
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

              {/* Login Link */}
              <div className="text-center">
                <p className="text-sm text-ink/60 mb-3">
                  Already have an account?
                </p>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center w-full rounded-2xl border-2 border-navy/20 hover:border-navy/40 bg-navy/5 hover:bg-navy/10 py-3 px-4 text-sm font-semibold text-navy transition"
                >
                  Log In
                </Link>
              </div>
            </form>

            {/* Footer Info */}
            <div className="bg-navy/2 border-t border-navy/5 px-6 sm:px-8 py-4">
              <p className="text-xs text-ink/50 text-center leading-relaxed">
                Your data is protected with enterprise-grade encryption
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

export default SignUpPage;
