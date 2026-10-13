import React from 'react';
import { Menu, Plus, Sparkles } from 'lucide-react';

/**
 * Top Header component with mobile menu toggle and quick action buttons.
 */
const Header = ({
  onToggleMobileSidebar,
  onOpenAddModal,
  onLoadSamples,
  hasQuestions,
}) => {
  return (
    <header className="top-header" role="banner">
      <div className="header-left">
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={onToggleMobileSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>
        <div className="header-title-area">
          <h1 className="header-page-title">Weekly Interview Tracker</h1>
          <p className="header-page-subtitle">Track problems, master core concepts & visualize milestones</p>
        </div>
      </div>

      <div className="header-right">
        {!hasQuestions && (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onLoadSamples}
            title="Load 8 realistic practice questions"
          >
            <Sparkles size={14} style={{ color: '#4f46e5' }} />
            <span className="btn-label-responsive">Sample Data</span>
          </button>
        )}
        <button
          type="button"
          className="btn btn-primary"
          onClick={onOpenAddModal}
          id="btn-add-question"
        >
          <Plus size={16} />
          <span>Add Question</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
