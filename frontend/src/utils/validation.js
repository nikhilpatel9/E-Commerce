// Validation utilities for forms

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (basic)
// eslint-disable-next-line no-useless-escape
const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;

// Validation rules
export const validators = {
  // Required field validator
  required: (value, fieldName = 'Field') => {
    if (!value || value.toString().trim() === '') {
      return `${fieldName} is required`;
    }
    return null;
  },

  // Email validator
  email: (value) => {
    if (!value) return null; // Only validate if value exists
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },

  // Minimum length validator
  minLength: (value, minLen, fieldName = 'Field') => {
    if (!value) return null;
    if (value.toString().length < minLen) {
      return `${fieldName} must be at least ${minLen} characters long`;
    }
    return null;
  },

  // Phone validator
  phone: (value) => {
    if (!value) return null;
    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
      return 'Please enter a valid phone number';
    }
    return null;
  },

  // Postal code validator (basic)
  postalCode: (value) => {
    if (!value) return null;
    if (value.toString().length < 3) {
      return 'Please enter a valid postal code';
    }
    return null;
  }
};

// Validate single field with multiple rules
export const validateField = (value, rules) => {
  for (const rule of rules) {
    const error = rule(value);
    if (error) return error;
  }
  return null;
};

// Validate entire form
export const validateForm = (formData, validationRules) => {
  const errors = {};
  let isValid = true;

  for (const [fieldName, rules] of Object.entries(validationRules)) {
    const error = validateField(formData[fieldName], rules);
    if (error) {
      errors[fieldName] = error;
      isValid = false;
    }
  }

  return { isValid, errors };
};

// Checkout form validation rules
export const checkoutValidationRules = {
  name: [
    (value) => validators.required(value, 'Name'),
    (value) => validators.minLength(value, 2, 'Name')
  ],
  email: [
    (value) => validators.required(value, 'Email'),
    (value) => validators.email(value)
  ],
  address: [
    (value) => validators.required(value, 'Address'),
    (value) => validators.minLength(value, 10, 'Address')
  ],
  city: [
    (value) => validators.required(value, 'City'),
    (value) => validators.minLength(value, 2, 'City')
  ],
  postalCode: [
    (value) => validators.required(value, 'Postal Code'),
    (value) => validators.postalCode(value)
  ]
};

// Format price utility
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};

// Format rating
export const formatRating = (rating) => {
  return Math.round(rating * 10) / 10;
};

// Truncate text utility
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};