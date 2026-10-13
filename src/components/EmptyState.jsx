import React from 'react';
import { SearchX, FolderPlus, Plus, RotateCcw, Sparkles } from 'lucide-react';

/**
 * Handles both "no questions in tracker" and "no search/filter results".
 */
const EmptyState = ({
  type = 'no-questions',
  onAddQuestion,
  onResetFilters,
  onLoadSamples,
}) => {
  if (type === 'no-results') {
    return (
      <div className="empty-state-card" role="region" aria-label="No results found">
        <div className="empty-state-icon" style={{ backgroundColor: '#f1f5f9', color: '#64748b' }}>
          <SearchX size={26} aria-hidden="true" />
        </div>
        <h3 className="empty-state-title">No Matching Questions</h3>
        <p className="empty-state-desc">
          No questions match your current search query or filter criteria. Try adjusting your search term or clearing the active filters.
        </p>
        <div className="empty-state-actions">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onResetFilters}
          >
            <RotateCcw size={15} />
            Reset All Filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="empty-state-card" role="region" aria-label="No questions added yet">
      <div className="empty-state-icon">
        <FolderPlus size={26} aria-hidden="true" />
      </div>
      <h3 className="empty-state-title">No Questions Added Yet</h3>
      <p className="empty-state-desc">
        Welcome to your <strong>Interview Practice Tracker</strong>! Start organizing your weekly prep by adding your first DSA, Git, or Technical interview question.
      </p>
      <div className="empty-state-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={onAddQuestion}
        >
          <Plus size={16} />
          Add First Question
        </button>
        {onLoadSamples && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onLoadSamples}
            title="Load 8 curated practice questions for quick preview"
          >
            <Sparkles size={16} style={{ color: '#4f46e5' }} />
            Load Sample Questions
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
