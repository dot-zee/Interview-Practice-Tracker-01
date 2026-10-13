import React from 'react';
import { Search, X, RotateCcw, Filter } from 'lucide-react';
import {
  CATEGORY_OPTIONS,
  DIFFICULTY_OPTIONS,
  STATUS_OPTIONS,
} from '../constants/options';

/**
 * Search input and combined filter toolbar for questions.
 */
const SearchFilters = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalCount,
  filteredCount,
}) => {
  const { search, category, difficulty, status } = filters;

  const isFilterActive =
    search.trim() !== '' ||
    category !== 'All' ||
    difficulty !== 'All' ||
    status !== 'All';

  return (
    <div className="filters-card" role="search" aria-label="Search and filter questions">
      {/* Search Input Row */}
      <div className="search-row">
        <div className="search-input-wrap">
          <Search size={16} className="search-icon" aria-hidden="true" />
          <input
            type="text"
            className="search-input"
            placeholder="Search questions by title (e.g. Binary Tree, Git, Event Loop)..."
            value={search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            aria-label="Search questions by title"
          />
          {search && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => onFilterChange('search', '')}
              aria-label="Clear search text"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Filters Row */}
      <div className="filters-row">
        {/* Category Pills/Tabs */}
        <div className="category-tabs" role="tablist" aria-label="Filter by category">
          <button
            type="button"
            className={`category-tab-btn ${category === 'All' ? 'active' : ''}`}
            onClick={() => onFilterChange('category', 'All')}
            role="tab"
            aria-selected={category === 'All'}
          >
            All Categories
          </button>
          {CATEGORY_OPTIONS.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`category-tab-btn ${category === cat ? 'active' : ''}`}
              onClick={() => onFilterChange('category', cat)}
              role="tab"
              aria-selected={category === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Difficulty, Status & Clear Button Group */}
        <div className="filter-controls-group">
          {/* Difficulty Dropdown */}
          <div className="filter-select-wrap">
            <label htmlFor="filter-difficulty" className="filter-label">
              Difficulty:
            </label>
            <select
              id="filter-difficulty"
              className="filter-select"
              value={difficulty}
              onChange={(e) => onFilterChange('difficulty', e.target.value)}
            >
              <option value="All">All Difficulties</option>
              {DIFFICULTY_OPTIONS.map((diff) => (
                <option key={diff} value={diff}>
                  {diff}
                </option>
              ))}
            </select>
          </div>

          {/* Status Dropdown */}
          <div className="filter-select-wrap">
            <label htmlFor="filter-status" className="filter-label">
              Status:
            </label>
            <select
              id="filter-status"
              className="filter-select"
              value={status}
              onChange={(e) => onFilterChange('status', e.target.value)}
            >
              <option value="All">All Statuses</option>
              {STATUS_OPTIONS.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters button if active */}
          {isFilterActive && (
            <button
              type="button"
              className="clear-filters-btn"
              onClick={onResetFilters}
              title="Reset search and filters to default"
            >
              <RotateCcw size={13} />
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
