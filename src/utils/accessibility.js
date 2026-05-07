/**
 * Accessibility Utilities
 * Helpers for improving WCAG compliance
 */

/**
 * Get ARIA attributes for form inputs
 */
export const getAriaAttributes = (fieldName, error, required = false) => {
  return {
    'aria-label': fieldName,
    'aria-required': required,
    'aria-invalid': !!error,
    'aria-describedby': error ? `${fieldName}-error` : undefined
  };
};

/**
 * Get ARIA attributes for button
 */
export const getButtonAriaAttributes = (label, disabled = false, loading = false) => {
  return {
    'aria-label': label,
    'aria-disabled': disabled || loading,
    'aria-busy': loading
  };
};

/**
 * Skip to main content link (for keyboard navigation)
 */
export const SkipToMainLink = () => (
  <a
    href="#main-content"
    style={{
      position: 'absolute',
      top: '-40px',
      left: '0',
      background: '#000',
      color: 'white',
      padding: '8px',
      zIndex: 100,
      ':focus': {
        top: '0'
      }
    }}
    onFocus={(e) => {
      e.target.style.top = '0';
    }}
    onBlur={(e) => {
      e.target.style.top = '-40px';
    }}
  >
    Skip to main content
  </a>
);

/**
 * Check color contrast ratio (simple version)
 * Returns true if contrast is sufficient
 */
export const isContrastAccessible = (color1, color2) => {
  // Basic check - in production use a proper library like 'polished'
  return true; // Placeholder - implement proper contrast checking
};

/**
 * Get semantic button class
 */
export const getButtonClass = (variant = 'primary', state = 'default') => {
  const baseClass = 'px-4 py-2 rounded font-medium transition-colors';
  
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-300 text-gray-900 hover:bg-gray-400',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    success: 'bg-green-500 text-white hover:bg-green-600'
  };

  const stateClasses = {
    disabled: 'opacity-50 cursor-not-allowed',
    loading: 'opacity-75 cursor-wait',
    default: ''
  };

  return `${baseClass} ${variantClasses[variant] || variantClasses.primary} ${stateClasses[state] || ''}`;
};

/**
 * Add ARIA live region for dynamic content updates
 */
export const AnnouncementLiveRegion = ({ message, level = 'polite' }) => (
  <div
    aria-live={level}
    aria-atomic="true"
    style={{
      position: 'absolute',
      left: '-10000px',
      width: '1px',
      height: '1px',
      overflow: 'hidden'
    }}
  >
    {message}
  </div>
);

/**
 * Label component with proper association
 */
export const FormLabel = ({ htmlFor, required = false, children }) => (
  <label
    htmlFor={htmlFor}
    style={{
      display: 'block',
      marginBottom: '8px',
      fontWeight: '500',
      fontSize: '14px'
    }}
  >
    {children}
    {required && <span aria-label="required" style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>}
  </label>
);

/**
 * Error message component for form fields
 */
export const FormError = ({ fieldName, message }) => (
  <div
    id={`${fieldName}-error`}
    role="alert"
    style={{
      color: '#ef4444',
      fontSize: '12px',
      marginTop: '4px',
      display: message ? 'block' : 'none'
    }}
  >
    {message}
  </div>
);
