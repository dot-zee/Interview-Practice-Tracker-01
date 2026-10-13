import React, { useState, useEffect, useRef } from 'react';
import { X, Check } from 'lucide-react';
import {
  CATEGORY_OPTIONS,
  DIFFICULTY_OPTIONS,
  STATUS_OPTIONS,
  STATUSES,
  CATEGORIES,
  DIFFICULTIES,
} from '../constants/options';

/**
 * Modal form for creating and editing questions.
 * Handles validation, whitespace trimming, and keyboard interactions.
 */
const QuestionFormModal = ({
  isOpen,
  initialData = null,
  onClose,
  onSubmit,
}) => {
  const isEditMode = Boolean(initialData && initialData.id);

  const [formData, setFormData] = useState({
    title: '',
    category: CATEGORIES.DSA,
    difficulty: DIFFICULTIES.MEDIUM,
    status: STATUSES.PENDING,
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const titleInputRef = useRef(null);

  // Sync formData with initialData when modal opens or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          title: initialData.title || '',
          category: initialData.category || CATEGORIES.DSA,
          difficulty: initialData.difficulty || DIFFICULTIES.MEDIUM,
          status: initialData.status || STATUSES.PENDING,
          notes: initialData.notes || '',
        });
      } else {
        setFormData({
          title: '',
          category: CATEGORIES.DSA,
          difficulty: DIFFICULTIES.MEDIUM,
          status: STATUSES.PENDING,
          notes: '',
        });
      }
      setErrors({});
      // Focus the title input after rendering
      setTimeout(() => {
        if (titleInputRef.current) {
          titleInputRef.current.focus();
        }
      }, 50);
    }
  }, [isOpen, initialData]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const trimmedTitle = formData.title.trim();

    if (!trimmedTitle) {
      newErrors.title = 'Question title is required and cannot be empty.';
    } else if (trimmedTitle.length < 3) {
      newErrors.title = 'Title must be at least 3 characters long.';
    }

    if (!formData.category || !CATEGORY_OPTIONS.includes(formData.category)) {
      newErrors.category = 'Please select a valid category.';
    }

    if (!formData.difficulty || !DIFFICULTY_OPTIONS.includes(formData.difficulty)) {
      newErrors.difficulty = 'Please select a valid difficulty.';
    }

    if (!formData.status || !STATUS_OPTIONS.includes(formData.status)) {
      newErrors.status = 'Please select a valid status.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const sanitizedData = {
      ...formData,
      title: formData.title.trim(),
      notes: formData.notes.trim(),
    };

    onSubmit(sanitizedData);
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="question-modal-title"
    >
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="question-modal-title" className="modal-title">
            {isEditMode ? 'Edit Question' : 'Add New Question'}
          </h2>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            {/* Title */}
            <div className="form-group">
              <label htmlFor="question-title" className="form-label">
                Question Title <span className="form-required">*</span>
              </label>
              <input
                ref={titleInputRef}
                id="question-title"
                name="title"
                type="text"
                className={`form-input ${errors.title ? 'error' : ''}`}
                placeholder="e.g. Invert a Binary Tree, Git Cherry-Pick Workflow"
                value={formData.title}
                onChange={handleChange}
                aria-invalid={Boolean(errors.title)}
                aria-describedby={errors.title ? 'title-error' : undefined}
                required
              />
              {errors.title && (
                <span id="title-error" className="form-error-msg" role="alert">
                  {errors.title}
                </span>
              )}
            </div>

            {/* Category and Difficulty row */}
            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="question-category" className="form-label">
                  Category <span className="form-required">*</span>
                </label>
                <select
                  id="question-category"
                  name="category"
                  className={`form-select ${errors.category ? 'error' : ''}`}
                  value={formData.category}
                  onChange={handleChange}
                >
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <span className="form-error-msg" role="alert">
                    {errors.category}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="question-difficulty" className="form-label">
                  Difficulty <span className="form-required">*</span>
                </label>
                <select
                  id="question-difficulty"
                  name="difficulty"
                  className={`form-select ${errors.difficulty ? 'error' : ''}`}
                  value={formData.difficulty}
                  onChange={handleChange}
                >
                  {DIFFICULTY_OPTIONS.map((diff) => (
                    <option key={diff} value={diff}>
                      {diff}
                    </option>
                  ))}
                </select>
                {errors.difficulty && (
                  <span className="form-error-msg" role="alert">
                    {errors.difficulty}
                  </span>
                )}
              </div>
            </div>

            {/* Status */}
            <div className="form-group">
              <label htmlFor="question-status" className="form-label">
                Status <span className="form-required">*</span>
              </label>
              <select
                id="question-status"
                name="status"
                className={`form-select ${errors.status ? 'error' : ''}`}
                value={formData.status}
                onChange={handleChange}
              >
                {STATUS_OPTIONS.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
              {errors.status && (
                <span className="form-error-msg" role="alert">
                  {errors.status}
                </span>
              )}
            </div>

            {/* Notes */}
            <div className="form-group">
              <label htmlFor="question-notes" className="form-label">
                Notes & Key Takeaways <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(Optional)</span>
              </label>
              <textarea
                id="question-notes"
                name="notes"
                className="form-textarea"
                rows={3}
                placeholder="Key patterns, edge cases, time/space complexity notes, gotchas..."
                value={formData.notes}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
            >
              <Check size={16} />
              {isEditMode ? 'Save Changes' : 'Add Question'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionFormModal;
