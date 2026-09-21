import React, { useEffect } from 'react';

export interface ToastMessage {
  id: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  title: string;
  message?: string;
}

export interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
  autoDismissMs?: number;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss, autoDismissMs = 4000 }) => {
  useEffect(() => {
    if (toasts.length === 0 || !autoDismissMs) return;

    const timer = setTimeout(() => {
      onDismiss(toasts[0].id);
    }, autoDismissMs);

    return () => clearTimeout(timer);
  }, [toasts, onDismiss, autoDismissMs]);

  if (toasts.length === 0) return null;

  return (
    <div className="a11y-toast-container" aria-label="Notifications" role="region">
      {toasts.map(toast => {
        const isAssertive = toast.type === 'danger' || toast.type === 'warning';

        return (
          <div
            key={toast.id}
            role={isAssertive ? 'alert' : 'status'}
            aria-live={isAssertive ? 'assertive' : 'polite'}
            aria-atomic="true"
            className={`a11y-toast a11y-toast--${toast.type}`}
          >
            <div>
              <strong style={{ display: 'block' }}>{toast.title}</strong>
              {toast.message && <small style={{ color: 'var(--a11y-text-muted)' }}>{toast.message}</small>}
            </div>
            <button
              type="button"
              aria-label={`Dismiss ${toast.title} notification`}
              onClick={() => onDismiss(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--a11y-text-muted)',
                cursor: 'pointer',
                fontSize: '1rem',
                padding: '4px 8px',
                marginLeft: '1rem',
              }}
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
};
