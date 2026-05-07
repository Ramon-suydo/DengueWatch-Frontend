/**
 * API Error Handling Utilities
 */

/**
 * Parse API error response
 * @param {Response|Error} error
 * @returns {object} { message: string, status: number, details: any }
 */
export const parseError = async (error) => {
  // Network error
  if (error instanceof TypeError) {
    return {
      message: 'Network error. Please check your connection.',
      status: 0,
      details: error.message
    };
  }

  // Fetch API response error
  if (error instanceof Response || error.status) {
    try {
      const data = await (error.json?.() || error.json());
      return {
        message: data.message || 'An error occurred',
        status: error.status,
        details: data
      };
    } catch {
      return {
        message: `HTTP Error ${error.status}`,
        status: error.status,
        details: error
      };
    }
  }

  // Generic error
  return {
    message: error?.message || 'An unexpected error occurred',
    status: error?.status || 500,
    details: error
  };
};

/**
 * Handle API response with standardized error handling
 * @param {Promise} promise
 * @param {Function} onError - Optional error handler
 * @returns {Promise}
 */
export const handleApiResponse = async (promise, onError = null) => {
  try {
    const response = await promise;
    
    if (!response.ok) {
      const error = new Error(response.statusText);
      error.status = response.status;
      throw error;
    }

    const data = await response.json();
    
    if (!data.success && data.message) {
      const error = new Error(data.message);
      error.status = response.status;
      throw error;
    }

    return data;
  } catch (error) {
    const parsed = await parseError(error);
    
    if (onError) {
      onError(parsed);
    }
    
    throw parsed;
  }
};

/**
 * Get user-friendly error message based on status code
 * @param {number} status
 * @param {string} message
 * @returns {string}
 */
export const getErrorMessage = (status, message = '') => {
  const messages = {
    0: 'Connection error. Please check your internet connection.',
    400: message || 'Invalid request. Please check your input.',
    401: 'Session expired. Please log in again.',
    403: 'You do not have permission to access this resource.',
    404: 'Resource not found.',
    408: 'Request timeout. Please try again.',
    429: 'Too many requests. Please wait a moment and try again.',
    500: 'Server error. Please try again later.',
    502: 'Service temporarily unavailable. Please try again later.',
    503: 'Service is down for maintenance. Please try again later.'
  };

  return messages[status] || message || 'An error occurred. Please try again.';
};

/**
 * Retry failed API call with exponential backoff
 * @param {Function} fn - Async function to retry
 * @param {number} retries - Number of retries
 * @param {number} delay - Initial delay in ms
 * @returns {Promise}
 */
export const retryApiCall = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0 || error.status === 401 || error.status === 403) {
      throw error;
    }

    await new Promise(resolve => setTimeout(resolve, delay));
    return retryApiCall(fn, retries - 1, delay * 2);
  }
};

/**
 * Create cancel token for fetch requests
 * @returns {object} { token: AbortSignal, cancel: Function }
 */
export const createCancelToken = () => {
  const controller = new AbortController();
  return {
    token: controller.signal,
    cancel: () => controller.abort()
  };
};
