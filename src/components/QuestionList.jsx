import React, { useState, useMemo } from 'react';
import QuestionCard from './QuestionCard';
import EmptyState from './EmptyState';
import { ArrowUpDown, ListFilter } from 'lucide-react';

/**
 * QuestionList container handling question sorting, matching counts,
 * and displaying question cards or appropriate empty states.
 */
const QuestionList = ({
  questions,
  totalQuestionsCount,
  onEdit,
  onDelete,
  onStatusChange,
  onAddQuestion,
  onResetFilters,
  onLoadSamples,
}) => {
  const [sortBy, setSortBy] = useState('newest');

  // Sorted questions derived value
  const sortedQuestions = useMemo(() => {
    return [...questions].sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'difficulty') {
        const order = { Easy: 1, Medium: 2, Hard: 3 };
        return (order[a.difficulty] || 2) - (order[b.difficulty] || 2);
      }
      if (sortBy === 'status') {
        const order = { 'In Progress': 1, Pending: 2, Completed: 3 };
        return (order[a.status] || 2) - (order[b.status] || 2);
      }
      return 0;
    });
  }, [questions, sortBy]);

  // 1. If user has not added any questions to the tracker yet
  if (totalQuestionsCount === 0) {
    return (
      <EmptyState
        type="no-questions"
        onAddQuestion={onAddQuestion}
        onLoadSamples={onLoadSamples}
      />
    );
  }

  // 2. If questions exist in tracker, but none match current search/filters
  if (questions.length === 0) {
    return (
      <EmptyState
        type="no-results"
        onResetFilters={onResetFilters}
      />
    );
  }

  // 3. Questions exist and match filters
  return (
    <section className="tracker-section" aria-labelledby="tracker-heading">
      <div className="tracker-header">
        <div className="tracker-title-wrap">
          <h2 id="tracker-heading" className="tracker-title">
            Question Log
          </h2>
          <span className="tracker-counter-badge">
            Showing {questions.length} of {totalQuestionsCount}
          </span>
        </div>

        {/* Sort Options */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label htmlFor="sort-questions" className="filter-label" style={{ display: 'none' }}>
            Sort by
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <ArrowUpDown size={14} style={{ color: 'var(--text-muted)' }} aria-hidden="true" />
            <select
              id="sort-questions"
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort questions list"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="title">Sort: Title (A-Z)</option>
              <option value="difficulty">Sort: Difficulty (Easy to Hard)</option>
              <option value="status">Sort: Status Priority</option>
            </select>
          </div>
        </div>
      </div>

      <div className="questions-list">
        {sortedQuestions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </section>
  );
};

export default QuestionList;
