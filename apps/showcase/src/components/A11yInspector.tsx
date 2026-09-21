import React, { useState, useEffect } from 'react';

export const A11yInspector: React.FC = () => {
  const [activeInfo, setActiveInfo] = useState<{
    tagName: string;
    role: string;
    ariaExpanded: string | null;
    ariaHasPopup: string | null;
    ariaControls: string | null;
    ariaModal: string | null;
    tabIndex: string | null;
    label: string | null;
    className: string | null;
  }>({
    tagName: 'BODY',
    role: 'document',
    ariaExpanded: null,
    ariaHasPopup: null,
    ariaControls: null,
    ariaModal: null,
    tabIndex: null,
    label: null,
    className: null,
  });

  useEffect(() => {
    const handleFocus = () => {
      const el = document.activeElement as HTMLElement | null;
      if (!el) return;

      setActiveInfo({
        tagName: el.tagName,
        role: el.getAttribute('role') || 'implicit (' + el.tagName.toLowerCase() + ')',
        ariaExpanded: el.getAttribute('aria-expanded'),
        ariaHasPopup: el.getAttribute('aria-haspopup'),
        ariaControls: el.getAttribute('aria-controls'),
        ariaModal: el.getAttribute('aria-modal'),
        tabIndex: el.getAttribute('tabindex'),
        label: el.getAttribute('aria-label') || el.innerText?.slice(0, 24) || null,
        className: el.className ? String(el.className).slice(0, 30) : null,
      });
    };

    window.addEventListener('focusin', handleFocus);
    handleFocus();

    return () => window.removeEventListener('focusin', handleFocus);
  }, []);

  return (
    <div className="inspector-box">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
        <h3 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 700, color: 'var(--a11y-primary-hover)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span>🎯</span> Live Focus ARIA Inspector
        </h3>
        <span style={{ fontSize: '0.7rem', color: 'var(--a11y-success)', background: 'var(--a11y-success-bg)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
          Active
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.82rem', fontFamily: 'var(--a11y-font-mono)' }}>
        <div style={{ background: 'var(--a11y-bg-dark)', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid var(--a11y-border)' }}>
          <span style={{ color: 'var(--a11y-text-muted)' }}>DOM Node: </span>
          <code style={{ color: 'var(--syn-tag)', fontWeight: 700 }}>&lt;{activeInfo.tagName.toLowerCase()}&gt;</code>
          {activeInfo.label && <span style={{ color: 'var(--a11y-text-secondary)', marginLeft: '6px' }}>"{activeInfo.label.trim()}"</span>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
          <div style={{ background: 'var(--a11y-bg-dark)', padding: '0.4rem 0.6rem', borderRadius: '4px', border: '1px solid var(--a11y-border)' }}>
            <span style={{ color: 'var(--a11y-text-muted)', display: 'block', fontSize: '0.7rem' }}>role</span>
            <code style={{ color: 'var(--syn-role)' }}>"{activeInfo.role}"</code>
          </div>

          <div style={{ background: 'var(--a11y-bg-dark)', padding: '0.4rem 0.6rem', borderRadius: '4px', border: '1px solid var(--a11y-border)' }}>
            <span style={{ color: 'var(--a11y-text-muted)', display: 'block', fontSize: '0.7rem' }}>tabIndex</span>
            <code style={{ color: 'var(--syn-val)' }}>{activeInfo.tabIndex !== null ? `"${activeInfo.tabIndex}"` : '0 (native focus)'}</code>
          </div>
        </div>

        {activeInfo.ariaExpanded !== null && (
          <div style={{ background: 'var(--a11y-bg-dark)', padding: '0.4rem 0.6rem', borderRadius: '4px', border: '1px solid var(--a11y-border)' }}>
            <span style={{ color: 'var(--a11y-text-muted)' }}>aria-expanded = </span>
            <code style={{ color: 'var(--syn-attr)' }}>"{activeInfo.ariaExpanded}"</code>
          </div>
        )}

        {activeInfo.ariaControls !== null && (
          <div style={{ background: 'var(--a11y-bg-dark)', padding: '0.4rem 0.6rem', borderRadius: '4px', border: '1px solid var(--a11y-border)' }}>
            <span style={{ color: 'var(--a11y-text-muted)' }}>aria-controls = </span>
            <code style={{ color: 'var(--syn-tag)' }}>"{activeInfo.ariaControls}"</code>
          </div>
        )}

        {activeInfo.ariaModal !== null && (
          <div style={{ background: 'var(--a11y-bg-dark)', padding: '0.4rem 0.6rem', borderRadius: '4px', border: '1px solid var(--a11y-border)' }}>
            <span style={{ color: 'var(--a11y-text-muted)' }}>aria-modal = </span>
            <code style={{ color: 'var(--syn-modal)' }}>"{activeInfo.ariaModal}"</code>
          </div>
        )}
      </div>
    </div>
  );
};

