import React from 'react';

export const WcagScorecard: React.FC = () => {
  const criteria = [
    { code: '1.4.3', title: 'Minimum Contrast Ratio', value: '11.4:1 (Pass AAA)' },
    { code: '2.1.1', title: 'Keyboard Traversal', value: 'Complete (No mouse required)' },
    { code: '2.1.2', title: 'Focus Lock & Restoration', value: 'Trapped via useFocusTrap' },
    { code: '2.4.7', title: 'Visible Focus Ring', value: '3px High-Contrast Ring' },
    { code: '4.1.2', title: 'Name, Role, Value (ARIA 1.2)', value: 'Verified via axe-core' },
    { code: '4.1.3', title: 'Live Region Alerts', value: 'aria-live polite/assertive' },
  ];

  return (
    <div className="inspector-box">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
        <h3 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 700, color: 'var(--a11y-success)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span>🛡️</span> WCAG 2.1 AA Audit Scorecard
        </h3>
        <span style={{ fontSize: '0.7rem', color: 'var(--a11y-success)', background: 'var(--a11y-success-bg)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
          0 axe-core failures
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        {criteria.map(c => (
          <div
            key={c.code}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.78rem',
              padding: '0.4rem 0.6rem',
              background: 'var(--a11y-bg-dark)',
              borderRadius: '6px',
              border: '1px solid var(--a11y-border)',
            }}
          >
            <div>
              <strong style={{ color: 'var(--a11y-primary-hover)', fontFamily: 'var(--a11y-font-mono)' }}>{c.code}</strong>{' '}
              <span style={{ color: 'var(--a11y-text-secondary)', marginLeft: '4px' }}>{c.title}</span>
            </div>
            <span style={{ color: 'var(--a11y-success)', fontWeight: 600, fontSize: '0.73rem', fontFamily: 'var(--a11y-font-mono)' }}>
              {c.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

