import { CATEGORIES, STATUSES } from '../constants/options';

/**
 * Generates a unique UUID with fallback.
 * @returns {string} Unique identifier
 */
export const generateId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'q-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 9);
};

/**
 * Calculates all dashboard metrics from the current questions array.
 * Derived values without duplicate state.
 * @param {Array} questions - Array of questions
 * @returns {Object} Dashboard metrics object
 */
export const calculateMetrics = (questions = []) => {
  const safeQuestions = Array.isArray(questions) ? questions : [];
  const total = safeQuestions.length;

  // Filtered counts
  const completedQuestions = safeQuestions.filter((q) => q.status === STATUSES.COMPLETED);
  const totalCompleted = completedQuestions.length;

  const dsaQuestions = safeQuestions.filter((q) => q.category === CATEGORIES.DSA);
  const completedDsa = dsaQuestions.filter((q) => q.status === STATUSES.COMPLETED).length;

  const gitQuestions = safeQuestions.filter((q) => q.category === CATEGORIES.GIT);
  const completedGit = gitQuestions.filter((q) => q.status === STATUSES.COMPLETED).length;

  const techQuestions = safeQuestions.filter((q) => q.category === CATEGORIES.TECHNICAL);
  const completedTech = techQuestions.filter((q) => q.status === STATUSES.COMPLETED).length;

  // Completed Interview Questions = Technical + Git combined
  const completedInterview = completedGit + completedTech;

  // Percentages with safe 0 fallbacks (avoid NaN / division by zero)
  const overallPercentage = total > 0 ? Math.round((totalCompleted / total) * 100) : 0;
  const dsaPercentage = dsaQuestions.length > 0 ? Math.round((completedDsa / dsaQuestions.length) * 100) : 0;
  const gitPercentage = gitQuestions.length > 0 ? Math.round((completedGit / gitQuestions.length) * 100) : 0;
  const techPercentage = techQuestions.length > 0 ? Math.round((completedTech / techQuestions.length) * 100) : 0;

  return {
    total,
    totalCompleted,
    overallPercentage,
    completedDsa,
    dsaTotal: dsaQuestions.length,
    dsaPercentage,
    completedInterview, // Git + Technical combined
    interviewTotal: gitQuestions.length + techQuestions.length,
    completedGit,
    gitTotal: gitQuestions.length,
    gitPercentage,
    completedTech,
    techTotal: techQuestions.length,
    techPercentage,
  };
};

/**
 * Filters questions based on search query and category/difficulty/status filters.
 * @param {Array} questions - Question list
 * @param {Object} filters - Active filters: { search, category, difficulty, status }
 * @returns {Array} Filtered questions
 */
export const filterQuestions = (questions = [], filters = {}) => {
  const { search = '', category = 'All', difficulty = 'All', status = 'All' } = filters;
  const trimmedSearch = search.trim().toLowerCase();

  return questions.filter((item) => {
    // 1. Search filter by title
    if (trimmedSearch && !item.title.toLowerCase().includes(trimmedSearch)) {
      return false;
    }

    // 2. Category filter
    if (category !== 'All' && item.category !== category) {
      return false;
    }

    // 3. Difficulty filter
    if (difficulty !== 'All' && item.difficulty !== difficulty) {
      return false;
    }

    // 4. Status filter
    if (status !== 'All' && item.status !== status) {
      return false;
    }

    return true;
  });
};

/**
 * Formats an ISO date string or timestamp into a readable date.
 * @param {string} dateString - Date string
 * @returns {string} Formatted date (e.g., "Oct 12, 2026")
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  } catch {
    return '';
  }
};
