import React, { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

/**
 * Confirmation dialog before destructive actions (e.g. deleting a question).
 */
const ConfirmDialog = ({
  isOpen,
  title = 'Delete Question',
  message = 'Are you sure you want to delete this question? This action cannot be undone.',
  itemTitle,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
    >
      <div
        className="modal-card"
        style={{ maxWidth: '440px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="confirm-dialog-content">
          <div className="confirm-dialog-icon">
            <AlertTriangle size={22} aria-hidden="true" />
          </div>
          <div className="confirm-dialog-text">
            <h3 id="confirm-dialog-title" className="confirm-dialog-title">
              {title}
            </h3>
            <p className="confirm-dialog-desc">{message}</p>
            {itemTitle && (
              <p
                style={{
                  marginTop: '0.4rem',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  backgroundColor: '#f1f5f9',
                  padding: '0.35rem 0.5rem',
                  borderRadius: '4px',
                }}
              >
                "{itemTitle}"
              </p>
            )}
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
