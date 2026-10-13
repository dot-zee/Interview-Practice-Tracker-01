import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

/**
 * Non-intrusive toast notification component for user feedback.
 */
const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const isError = type === 'error';

  return (
    <div className="toast-container" role="status" aria-live="polite">
      <div className={`toast ${isError ? 'toast-error' : 'toast-success'}`}>
        {isError ? (
          <AlertCircle size={18} aria-hidden="true" style={{ color: '#ef4444' }} />
        ) : (
          <CheckCircle2 size={18} aria-hidden="true" style={{ color: '#10b981' }} />
        )}
        <span>{message}</span>
        <button
          type="button"
          className="toast-close-btn"
          onClick={onClose}
          aria-label="Dismiss notification"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
