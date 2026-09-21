import React, { useState, useEffect } from 'react';

export const KeyboardVisualizer: React.FC = () => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [keyHistory, setKeyHistory] = useState<string[]>([]);

  useEffect(() => {
    const handleDown = (e: KeyboardEvent) => {
      setPressedKeys(prev => new Set(prev).add(e.key));
      setKeyHistory(prev => [e.key === ' ' ? 'Space' : e.key, ...prev.slice(0, 4)]);
    };

    const handleUp = (e: KeyboardEvent) => {
      setPressedKeys(prev => {
        const next = new Set(prev);
        next.delete(e.key);
        return next;
      });
    };

    window.addEventListener('keydown', handleDown);
    window.addEventListener('keyup', handleUp);

    return () => {
      window.removeEventListener('keydown', handleDown);
      window.removeEventListener('keyup', handleUp);
    };
  }, []);

  const keysToTrack = ['Tab', 'Escape', 'Enter', ' ', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];

  return (
    <div className="inspector-box">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <h3 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 700, color: 'var(--a11y-primary-hover)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span>⌨️</span> Live Keyboard Listener
        </h3>
        <span style={{ fontSize: '0.7rem', color: 'var(--a11y-text-muted)', fontFamily: 'var(--a11y-font-mono)' }}>WCAG 2.1.1</span>
      </div>

      <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.78rem', color: 'var(--a11y-text-muted)' }}>
        Press navigation keys to test focus traps and ARIA active descendants:
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.85rem' }}>
        {keysToTrack.map(k => {
          const isPressed = pressedKeys.has(k);
          const label = k === ' ' ? 'Space' : k;

          return (
            <span key={k} className={`key-badge ${isPressed ? 'is-pressed' : ''}`}>
              {label}
            </span>
          );
        })}
      </div>

      {keyHistory.length > 0 && (
        <div style={{ background: 'var(--a11y-bg-dark)', padding: '0.4rem 0.65rem', borderRadius: '6px', border: '1px solid var(--a11y-border)', fontSize: '0.75rem' }}>
          <span style={{ color: 'var(--a11y-text-muted)' }}>Recent Key Stream: </span>
          <span style={{ color: 'var(--a11y-accent-amber)', fontFamily: 'var(--a11y-font-mono)', fontWeight: 600 }}>
            {keyHistory.join(' → ')}
          </span>
        </div>
      )}
    </div>
  );
};

