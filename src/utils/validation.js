/**
 * Frontend Form Validation Utilities
 */

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[a-zA-Z\s\-\']+$/;

/**
 * Validate email format
 * @param {string} email
 * @returns {object} { valid: boolean, error: string }
 */
export const validateEmail = (email) => {
  if (!email) return { valid: false, error: 'Email is required' };
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }
  if (email.length > 255) {
    return { valid: false, error: 'Email is too long' };
  }
  return { valid: true, error: '' };
};

/**
 * Validate password strength
 * Minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number
 * @param {string} password
 * @returns {object} { valid: boolean, errors: string[], strength: 'weak'|'fair'|'good'|'strong' }
 */
export const validatePassword = (password) => {
  const errors = [];
  let strength = 'weak';

  if (!password) {
    return { valid: false, errors: ['Password is required'], strength };
  }

  if (password.length < 8) {
    errors.push('At least 8 characters');
  } else if (password.length >= 12) {
    strength = 'fair';
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('At least 1 uppercase letter');
  } else {
    strength = 'fair';
  }

  if (!/[a-z]/.test(password)) {
    errors.push('At least 1 lowercase letter');
  } else {
    strength = 'fair';
  }

  if (!/[0-9]/.test(password)) {
    errors.push('At least 1 number');
  } else {
    strength = 'fair';
  }

  if (/[!@#$%^&*]/.test(password)) {
    strength = 'strong';
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : [],
    strength: errors.length === 0 ? (strength === 'weak' ? 'good' : 'strong') : 'weak'
  };
};

/**
 * Validate name
 * @param {string} name
 * @returns {object} { valid: boolean, error: string }
 */
export const validateName = (name) => {
  if (!name) return { valid: false, error: 'Name is required' };
  if (name.trim().length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters' };
  }
  if (name.length > 100) {
    return { valid: false, error: 'Name must not exceed 100 characters' };
  }
  if (!nameRegex.test(name)) {
    return { valid: false, error: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
  }
  return { valid: true, error: '' };
};

/**
 * Validate password confirmation
 * @param {string} password
 * @param {string} confirmPassword
 * @returns {object} { valid: boolean, error: string }
 */
export const validatePasswordMatch = (password, confirmPassword) => {
  if (!confirmPassword) {
    return { valid: false, error: 'Please confirm your password' };
  }
  if (password !== confirmPassword) {
    return { valid: false, error: 'Passwords do not match' };
  }
  return { valid: true, error: '' };
};

/**
 * Validate form field (generic)
 * @param {string} value
 * @param {string} fieldType - 'email', 'password', 'name', 'text', 'required'
 * @param {object} options
 * @returns {object} { valid: boolean, error: string }
 */
export const validateField = (value, fieldType = 'text', options = {}) => {
  const { minLength = 0, maxLength = 255, required = true } = options;

  if (required && !value) {
    return { valid: false, error: `This field is required` };
  }

  if (!required && !value) {
    return { valid: true, error: '' };
  }

  switch (fieldType) {
    case 'email':
      return validateEmail(value);
    case 'password':
      return validatePassword(value);
    case 'name':
      return validateName(value);
    case 'text':
    default:
      if (value.length < minLength) {
        return { valid: false, error: `Must be at least ${minLength} characters` };
      }
      if (value.length > maxLength) {
        return { valid: false, error: `Must not exceed ${maxLength} characters` };
      }
      return { valid: true, error: '' };
  }
};

/**
 * Validate entire form
 * @param {object} formData
 * @param {object} validationRules - { fieldName: { type, required, ... } }
 * @returns {object} { valid: boolean, errors: { fieldName: string } }
 */
export const validateForm = (formData, validationRules) => {
  const errors = {};
  let valid = true;

  Object.keys(validationRules).forEach(fieldName => {
    const rule = validationRules[fieldName];
    const value = formData[fieldName] || '';
    const validation = validateField(value, rule.type, rule);

    if (!validation.valid) {
      errors[fieldName] = validation.error;
      valid = false;
    }
  });

  return { valid, errors };
};
