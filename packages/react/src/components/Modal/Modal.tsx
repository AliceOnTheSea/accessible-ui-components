import React, { useId } from 'react';
import { useFocusTrap } from '../../hooks/useFocusTrap';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
}) => {
  const containerRef = useFocusTrap(isOpen, onClose);
  const titleId = useId();
  const descriptionId = useId();

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="a11y-dialog-backdrop"
      onClick={handleBackdropClick}
      data-testid="modal-backdrop"
    >
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className="a11y-dialog-panel"
      >
        <div className="a11y-dialog-header">
          <h2 id={titleId} className="a11y-dialog-title">
            {title}
          </h2>
          <button
            type="button"
            className="a11y-dialog-close-btn"
            onClick={onClose}
            aria-label="Close modal dialog"
          >
            ✕
          </button>
        </div>

        {description && (
          <p id={descriptionId} style={{ marginTop: 0, color: 'var(--a11y-text-muted)' }}>
            {description}
          </p>
        )}

        <div className="a11y-dialog-body">{children}</div>

        {footer && <div className="a11y-dialog-footer">{footer}</div>}
      </div>
    </div>
  );
};
