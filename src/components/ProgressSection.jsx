import React from 'react';
import { Target, Code2, GitBranch, Cpu } from 'lucide-react';

/**
 * Visual progress section showing overall completion percentage and
 * category-wise progress bars for DSA, Git, and Technical questions.
 */
const ProgressSection = ({ metrics }) => {
  const {
    total = 0,
    totalCompleted = 0,
    overallPercentage = 0,
    completedDsa = 0,
    dsaTotal = 0,
    dsaPercentage = 0,
    completedGit = 0,
    gitTotal = 0,
    gitPercentage = 0,
    completedTech = 0,
    techTotal = 0,
    techPercentage = 0,
  } = metrics;

  // SVG Ring calculation
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallPercentage / 100) * circumference;

  return (
    <section className="progress-card" aria-labelledby="progress-section-heading">
      <div className="progress-header">
        <div className="progress-title-group">
          <Target size={20} style={{ color: 'var(--primary)' }} aria-hidden="true" />
          <h2 id="progress-section-heading" className="progress-title">
            Preparation Progress
          </h2>
        </div>
        <span className="progress-header-badge">
          {totalCompleted} of {total} Completed
        </span>
      </div>

      <div className="progress-content-split">
        {/* Left: Overall Ring Indicator */}
        <div className="overall-progress-box">
          <div className="overall-progress-circle-wrap">
            <svg width="108" height="108" viewBox="0 0 108 108" aria-hidden="true">
              {/* Background circle */}
              <circle
                cx="54"
                cy="54"
                r={radius}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="9"
              />
              {/* Animated Progress circle */}
              <circle
                cx="54"
                cy="54"
                r={radius}
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="9"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 54 54)"
                style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <div
              style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span className="overall-percentage-value">{overallPercentage}%</span>
            </div>
          </div>

          <div>
            <div className="overall-ratio-text">
              {totalCompleted} / {total} Solved
            </div>
            <div className="overall-label">Overall Completion</div>
          </div>
        </div>

        {/* Right: Category Progress Bars */}
        <div className="category-progress-list">
          {/* DSA */}
          <div className="category-progress-item">
            <div className="cat-prog-header">
              <span className="cat-prog-name">
                <Code2 size={16} style={{ color: '#6d28d9' }} aria-hidden="true" />
                DSA Problems
              </span>
              <span className="cat-prog-stats">
                {completedDsa} of {dsaTotal} ({dsaPercentage}%)
              </span>
            </div>
            <div
              className="cat-prog-bar-track"
              role="progressbar"
              aria-valuenow={dsaPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label="DSA completion progress"
            >
              <div
                className="cat-prog-bar-fill dsa"
                style={{ width: `${dsaPercentage}%` }}
              />
            </div>
          </div>

          {/* Git */}
          <div className="category-progress-item">
            <div className="cat-prog-header">
              <span className="cat-prog-name">
                <GitBranch size={16} style={{ color: '#c2410c' }} aria-hidden="true" />
                Git & Version Control
              </span>
              <span className="cat-prog-stats">
                {completedGit} of {gitTotal} ({gitPercentage}%)
              </span>
            </div>
            <div
              className="cat-prog-bar-track"
              role="progressbar"
              aria-valuenow={gitPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label="Git completion progress"
            >
              <div
                className="cat-prog-bar-fill git"
                style={{ width: `${gitPercentage}%` }}
              />
            </div>
          </div>

          {/* Technical */}
          <div className="category-progress-item">
            <div className="cat-prog-header">
              <span className="cat-prog-name">
                <Cpu size={16} style={{ color: '#0369a1' }} aria-hidden="true" />
                Technical & Core Concepts
              </span>
              <span className="cat-prog-stats">
                {completedTech} of {techTotal} ({techPercentage}%)
              </span>
            </div>
            <div
              className="cat-prog-bar-track"
              role="progressbar"
              aria-valuenow={techPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label="Technical completion progress"
            >
              <div
                className="cat-prog-bar-fill tech"
                style={{ width: `${techPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressSection;
