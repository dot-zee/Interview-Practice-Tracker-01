import React, { useState } from 'react';
import {
  Edit2,
  Trash2,
  Calendar,
  ChevronDown,
  FileText,
  Clock,
  CheckCircle2,
  CircleDot,
} from 'lucide-react';
import { CATEGORIES, STATUSES, STATUS_OPTIONS, DIFFICULTIES } from '../constants/options';
import { formatDate } from '../utils/questionUtils';

/**
 * Question card component displaying question title, category, difficulty,
 * status badge with direct status change dropdown, notes, and actions.
 */
const QuestionCard = ({
  question,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const { id, title, category, difficulty, status, notes, createdAt } = question;
  const [showNotes, setShowNotes] = useState(true);

  // Helper for category badge class
  const getCategoryClass = (cat) => {
    switch (cat) {
      case CATEGORIES.DSA:
        return 'badge-cat-dsa';
      case CATEGORIES.GIT:
        return 'badge-cat-git';
      case CATEGORIES.TECHNICAL:
        return 'badge-cat-tech';
      default:
        return 'badge-cat-tech';
    }
  };

  // Helper for difficulty badge class
  const getDifficultyClass = (diff) => {
    switch (diff) {
      case DIFFICULTIES.EASY:
        return 'badge-diff-easy';
      case DIFFICULTIES.MEDIUM:
        return 'badge-diff-med';
      case DIFFICULTIES.HARD:
        return 'badge-diff-hard';
      default:
        return 'badge-diff-med';
    }
  };

  // Helper for status badge class
  const getStatusClass = (st) => {
    switch (st) {
      case STATUSES.COMPLETED:
        return 'badge-status-completed';
      case STATUSES.IN_PROGRESS:
        return 'badge-status-progress';
      case STATUSES.PENDING:
      default:
        return 'badge-status-pending';
    }
  };

  // Status icon helper
  const getStatusIcon = (st) => {
    switch (st) {
      case STATUSES.COMPLETED:
        return <CheckCircle2 size={13} aria-hidden="true" />;
      case STATUSES.IN_PROGRESS:
        return <CircleDot size={13} aria-hidden="true" />;
      case STATUSES.PENDING:
      default:
        return <Clock size={13} aria-hidden="true" />;
    }
  };

  return (
    <article className="question-card" aria-label={`Question: ${title}`}>
      {/* Top Header: Title and Badges */}
      <div className="question-card-top">
        <div className="question-card-main">
          <h3 className="question-title">{title}</h3>
          <div className="question-badges-wrap">
            {/* Category Badge */}
            <span className={`badge ${getCategoryClass(category)}`}>
              {category}
            </span>

            {/* Difficulty Badge */}
            <span className={`badge ${getDifficultyClass(difficulty)}`}>
              {difficulty}
            </span>

            {/* Direct Status Selector Dropdown */}
            <div className="status-dropdown-wrap">
              <label htmlFor={`status-select-${id}`} className="sr-only">
                Update status for {title}
              </label>
              <select
                id={`status-select-${id}`}
                className={`status-select-btn ${getStatusClass(status)}`}
                value={status}
                onChange={(e) => onStatusChange(id, e.target.value)}
                title="Click to change question status directly"
              >
                {STATUS_OPTIONS.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Optional Notes Section */}
      {notes && notes.trim() !== '' && (
        <div className="question-notes-box">
          <span className="notes-label">Notes & Solutions</span>
          {notes}
        </div>
      )}

      {/* Card Footer: Creation Date and Action Buttons */}
      <div className="question-card-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          {createdAt && (
            <>
              <Calendar size={13} aria-hidden="true" />
              <span>Added {formatDate(createdAt)}</span>
            </>
          )}
        </div>

        <div className="card-actions-group">
          <button
            type="button"
            className="card-action-btn"
            onClick={() => onEdit(question)}
            aria-label={`Edit ${title}`}
            title="Edit question details"
          >
            <Edit2 size={13} />
            Edit
          </button>
          <button
            type="button"
            className="card-action-btn delete"
            onClick={() => onDelete(question)}
            aria-label={`Delete ${title}`}
            title="Delete this question"
          >
            <Trash2 size={13} />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default QuestionCard;
