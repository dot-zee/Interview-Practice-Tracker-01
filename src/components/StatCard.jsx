import React from 'react';
import { MACHINE_CODING_OPTIONS } from '../constants/options';

/**
 * Summary card for key metrics.
 * Supports static numeric display or interactive machine coding status selector.
 */
const StatCard = ({
  icon: Icon,
  iconColorClass = 'blue',
  label,
  value,
  subtext,
  isMachineCoding = false,
  machineCodingStatus,
  onMachineCodingChange,
}) => {
  return (
    <div className="stat-card" role="region" aria-label={label}>
      <div className="stat-card-header">
        <span className="stat-card-label">{label}</span>
        <div className={`stat-card-icon ${iconColorClass}`}>
          <Icon size={18} aria-hidden="true" />
        </div>
      </div>

      <div className="stat-card-body">
        {isMachineCoding ? (
          <div>
            <div className="stat-card-value" style={{ fontSize: '1.25rem', marginBottom: '0.35rem' }}>
              {machineCodingStatus}
            </div>
            <div className="mc-status-selector">
              <label htmlFor="mc-status-select" className="sr-only">
                Change Machine Coding Status
              </label>
              <select
                id="mc-status-select"
                className="mc-select"
                value={machineCodingStatus}
                onChange={(e) => onMachineCodingChange(e.target.value)}
              >
                {MACHINE_CODING_OPTIONS.map((st) => (
                  <option key={st} value={st}>
                    Set: {st}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <div className="stat-card-value">{value}</div>
        )}
        {subtext && <div className="stat-card-subtext">{subtext}</div>}
      </div>
    </div>
  );
};

export default StatCard;
