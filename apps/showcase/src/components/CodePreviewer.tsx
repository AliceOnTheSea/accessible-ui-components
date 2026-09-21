import React, { useState } from 'react';

export interface CodePreviewerProps {
  reactCode: string;
  vueCode: string;
}

export const CodePreviewer: React.FC<CodePreviewerProps> = ({ reactCode, vueCode }) => {
  const [tab, setTab] = useState<'react' | 'vue'>('react');
  const [copied, setCopied] = useState(false);

  const activeCode = tab === 'react' ? reactCode : vueCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            type="button"
            onClick={() => setTab('react')}
            style={{
              background: tab === 'react' ? 'var(--a11y-primary)' : 'transparent',
              color: tab === 'react' ? '#ffffff' : 'var(--a11y-text-muted)',
              border: 'none',
              padding: '0.25rem 0.65rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: 700,
            }}
          >
            React 19 (TSX)
          </button>

          <button
            type="button"
            onClick={() => setTab('vue')}
            style={{
              background: tab === 'vue' ? '#41b883' : 'transparent',
              color: tab === 'vue' ? '#0f172a' : 'var(--a11y-text-muted)',
              border: 'none',
              padding: '0.25rem 0.65rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: 700,
            }}
          >
            Vue 3 (SFC)
          </button>
        </div>

        <button type="button" className="copy-btn" onClick={handleCopy}>
          {copied ? '✓ Copied!' : '📋 Copy Snippet'}
        </button>
      </div>

      <pre className="code-block">
        <code>{activeCode}</code>
      </pre>
    </div>
  );
};

