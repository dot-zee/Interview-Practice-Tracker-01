import { STORAGE_KEYS, MACHINE_CODING_STATUSES } from '../constants/options';

/**
 * Safely retrieves an item from LocalStorage with JSON parsing and fallback.
 * @param {string} key - LocalStorage key
 * @param {*} defaultValue - Fallback value if missing or invalid
 * @returns {*} Parsed value or defaultValue
 */
export const getItem = (key, defaultValue = null) => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return defaultValue;
    }
    const item = window.localStorage.getItem(key);
    if (item === null || item === undefined) {
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (error) {
    console.warn(`[Storage] Failed to read key "${key}" from localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Safely saves an item to LocalStorage with JSON serialization.
 * @param {string} key - LocalStorage key
 * @param {*} value - Value to serialize and store
 * @returns {boolean} Success status
 */
export const setItem = (key, value) => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`[Storage] Failed to save key "${key}" to localStorage:`, error);
    return false;
  }
};

/**
 * Removes an item from LocalStorage.
 * @param {string} key - LocalStorage key
 */
export const removeItem = (key) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(key);
    }
  } catch (error) {
    console.warn(`[Storage] Failed to remove key "${key}" from localStorage:`, error);
  }
};

/**
 * Loads stored questions from LocalStorage.
 * Returns empty array if none found or on corruption.
 * @returns {Array} List of questions
 */
export const loadStoredQuestions = () => {
  const data = getItem(STORAGE_KEYS.QUESTIONS, []);
  if (Array.isArray(data)) {
    return data;
  }
  return [];
};

/**
 * Persists questions to LocalStorage.
 * @param {Array} questions - Array of questions
 */
export const saveStoredQuestions = (questions) => {
  setItem(STORAGE_KEYS.QUESTIONS, Array.isArray(questions) ? questions : []);
};

/**
 * Loads machine coding status from LocalStorage.
 * Returns 'Not Started' as default fallback.
 * @returns {string} Machine coding status
 */
export const loadMachineCodingStatus = () => {
  const status = getItem(STORAGE_KEYS.MACHINE_CODING_STATUS, MACHINE_CODING_STATUSES.NOT_STARTED);
  if (typeof status === 'string' && Object.values(MACHINE_CODING_STATUSES).includes(status)) {
    return status;
  }
  return MACHINE_CODING_STATUSES.NOT_STARTED;
};

/**
 * Persists machine coding status to LocalStorage.
 * @param {string} status - New machine coding status
 */
export const saveMachineCodingStatus = (status) => {
  setItem(STORAGE_KEYS.MACHINE_CODING_STATUS, status);
};
