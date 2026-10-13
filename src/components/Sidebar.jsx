import React from 'react';
import {
  Layers,
  Code2,
  GitBranch,
  Cpu,
  X,
  Laptop,
  CheckCircle2,
  HardDrive,
} from 'lucide-react';
import { CATEGORIES } from '../constants/options';

/**
 * Sidebar component supporting desktop sticky mode and mobile slide-in drawer.
 */
const Sidebar = ({
  isOpen,
  onClose,
  activeCategory,
  onSelectCategory,
  metrics,
  machineCodingStatus,
}) => {
  const { total = 0, dsaTotal = 0, gitTotal = 0, techTotal = 0 } = metrics;

  const navItems = [
    {
      id: 'All',
      label: 'All Questions',
      icon: Layers,
      count: total,
    },
    {
      id: CATEGORIES.DSA,
      label: 'DSA Problems',
      icon: Code2,
      count: dsaTotal,
    },
    {
      id: CATEGORIES.GIT,
      label: 'Git & Workflows',
      icon: GitBranch,
      count: gitTotal,
    },
    {
      id: CATEGORIES.TECHNICAL,
      label: 'Technical Concepts',
      icon: Cpu,
      count: techTotal,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar Panel */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`} aria-label="Sidebar Navigation">
        <div className="sidebar-header">
          <div className="brand-badge">
            <div className="brand-icon-wrapper">
              <Code2 size={20} />
            </div>
            <div>
              <div className="brand-title">PrepTracker</div>
              <div className="brand-subtitle">Interview Practice OS</div>
            </div>
          </div>
          <button
            type="button"
            className="sidebar-close-btn"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        <div className="sidebar-content">
          <div>
            <div className="nav-section-title">Navigation & Categories</div>
            <ul className="nav-list" role="list">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeCategory === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`nav-item-btn ${isActive ? 'active' : ''}`}
                      onClick={() => {
                        onSelectCategory(item.id);
                        if (window.innerWidth < 1024) {
                          onClose();
                        }
                      }}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span className="nav-item-left">
                        <IconComponent size={17} aria-hidden="true" />
                        <span>{item.label}</span>
                      </span>
                      <span className="nav-badge">{item.count}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Machine Coding Widget Preview in Sidebar */}
          <div className="sidebar-widget">
            <div className="sidebar-widget-title">
              <Laptop size={15} style={{ color: 'var(--primary)' }} aria-hidden="true" />
              <span>Machine-Coding</span>
            </div>
            <div className="sidebar-widget-status">
              Status: <strong>{machineCodingStatus}</strong>
            </div>
          </div>
        </div>

        <div className="sidebar-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
            <HardDrive size={13} style={{ color: '#10b981' }} aria-hidden="true" />
            <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>LocalStorage Synced</span>
          </div>
          <div>All progress persists in your browser.</div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
