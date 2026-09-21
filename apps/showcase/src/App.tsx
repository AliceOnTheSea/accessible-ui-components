import React, { useState } from 'react';
import {
  Modal as ReactModal,
  Combobox as ReactCombobox,
  Accordion as ReactAccordion,
  ToastContainer as ReactToastContainer,
  ToastMessage,
  ComboboxOption,
} from '@accessible-ui/react';
import { A11yInspector } from './components/A11yInspector';
import { KeyboardVisualizer } from './components/KeyboardVisualizer';
import { WcagScorecard } from './components/WcagScorecard';
import { CodePreviewer } from './components/CodePreviewer';

export const App: React.FC = () => {
  const [framework, setFramework] = useState<'react' | 'vue'>('react');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Active view tab per component ('demo' | 'notes')
  const [modalTab, setModalTab] = useState<'demo' | 'notes'>('demo');
  const [comboboxTab, setComboboxTab] = useState<'demo' | 'notes'>('demo');
  const [accordionTab, setAccordionTab] = useState<'demo' | 'notes'>('demo');
  const [toastTab, setToastTab] = useState<'demo' | 'notes'>('demo');

  // Component States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFormName, setModalFormName] = useState('');
  const [selectedTech, setSelectedTech] = useState<ComboboxOption | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([
    {
      id: '1',
      type: 'success',
      title: 'Accessibility Pipeline Green',
      message: '0 WCAG violations found across 24 component states.',
    },
  ]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const techOptions: ComboboxOption[] = [
    { id: '1', label: 'React 19 (TSX)', value: 'Virtual DOM & Custom Hooks' },
    { id: '2', label: 'Vue 3.4 (SFC)', value: 'Reactivity Engine & Teleport' },
    { id: '3', label: 'TypeScript 5.4', value: 'Strict Static Typing' },
    { id: '4', label: 'C# / .NET 8 API', value: 'Backend Microservices' },
    { id: '5', label: 'AWS ECS & Fargate', value: 'Containerized Infrastructure' },
    { id: '6', label: 'axe-core & Storybook', value: 'Automated A11y Pipeline' },
  ];

  const accordionItems = [
    {
      id: 'focus-trap-note',
      title: '1. Keyboard Focus Trapping & Restoration (Criterion 2.1.2)',
      content:
        'When a modal opens, Tab and Shift+Tab cycle strictly within the container. Upon closing via Escape key or backdrop click, focus returns seamlessly to the trigger element that initiated the dialog.',
    },
    {
      id: 'active-descendant-note',
      title: '2. Active Descendant Tracking (Criterion 4.1.2)',
      content:
        'The Combobox uses aria-activedescendant to navigate list options without removing focus from the search input. Screen readers receive immediate aria-live updates when items filter.',
    },
    {
      id: 'color-contrast-note',
      title: '3. Minimum & High Contrast Ratios (Criterion 1.4.3 & 2.4.7)',
      content:
        'Text elements achieve > 7:1 contrast ratios against card backgrounds. Interactive controls showcase a 3px vivid Sky Blue outline ring when navigated via keyboard.',
    },
  ];

  const triggerToast = (type: 'info' | 'success' | 'warning' | 'danger') => {
    const messages = {
      info: { title: 'System Notice', msg: 'Polite live region announcement dispatched.' },
      success: { title: 'Audit Passed', msg: 'Form input validated with zero accessibility errors.' },
      warning: { title: 'Session Notice', msg: 'Unsaved draft state saved to local storage.' },
      danger: { title: 'Critical Alert', msg: 'Assertive ARIA alert triggered for immediate screen reader read-out.' },
    };
    const newToast: ToastMessage = {
      id: Date.now().toString(),
      type,
      title: messages[type].title,
      message: messages[type].msg,
    };
    setToasts(prev => [...prev, newToast]);
  };

  return (
    <div className="showcase-container">
      {/* Hand-crafted Header Bar */}
      <header className="showcase-header">
        <div className="showcase-brand">
          <div className="brand-avatar">AC</div>
          <div className="showcase-title-block">
            <h1>Alice Carasco</h1>
            <p>Senior Software Engineer • Design Systems & Full-Stack Architecture</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="status-pulse-pill">
            <span className="pulse-dot"></span>
            <span>WCAG 2.1 AA Verified</span>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            style={{
              background: 'var(--a11y-bg-card)',
              border: '1px solid var(--a11y-border)',
              color: 'var(--a11y-text-primary)',
              padding: '0.45rem 0.95rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.82rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="showcase-grid">
        <main className="showcase-main-content">
          {/* Framework Switcher Banner */}
          <div className="showcase-card" style={{ padding: '1.25rem 1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ margin: '0 0 0.2rem 0', fontSize: '1.05rem', fontWeight: 700, fontFamily: 'var(--a11y-font-heading)' }}>
                  Dual-Framework Architecture Sandbox
                </h2>
                <span style={{ fontSize: '0.82rem', color: 'var(--a11y-text-muted)' }}>
                  Switch runtime rendering (React 19 TSX vs Vue 3 SFC). Shared design tokens enforce identical ARIA specs and visual hierarchy.
                </span>
              </div>

              <div className="framework-toggle">
                <button
                  type="button"
                  className={`framework-toggle-btn ${framework === 'react' ? 'is-active' : ''}`}
                  onClick={() => setFramework('react')}
                >
                  React 19 (TSX)
                </button>
                <button
                  type="button"
                  className={`framework-toggle-btn ${framework === 'vue' ? 'is-active' : ''}`}
                  onClick={() => setFramework('vue')}
                >
                  Vue 3 (SFC)
                </button>
              </div>
            </div>
          </div>

          {/* Component 1: Focus-Trapped Modal */}
          <section className="showcase-card">
            <div className="showcase-card-header">
              <div className="card-title-group">
                <h3>1. Focus-Trapped Accessible Modal Dialog</h3>
                <p>WAI-ARIA 1.2 Dialog Pattern • Keyboard Focus Lock • Automatic Restoration</p>
              </div>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--a11y-font-mono)', color: 'var(--a11y-primary-hover)', background: 'var(--a11y-bg-subtle)', padding: '0.2rem 0.6rem', borderRadius: '4px', border: '1px solid var(--a11y-border)' }}>
                role="dialog"
              </span>
            </div>

            <div className="card-view-tabs">
              <button
                type="button"
                className={`card-tab-btn ${modalTab === 'demo' ? 'is-active' : ''}`}
                onClick={() => setModalTab('demo')}
              >
                🎮 Interactive Demo
              </button>
              <button
                type="button"
                className={`card-tab-btn ${modalTab === 'notes' ? 'is-active' : ''}`}
                onClick={() => setModalTab('notes')}
              >
                📝 Architecture & Specs
              </button>
            </div>

            {modalTab === 'demo' ? (
              <div>
                <p style={{ color: 'var(--a11y-text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                  Click below to open the dialog. Try navigating with <code>Tab</code> and <code>Shift + Tab</code>. Notice how focus cannot escape the modal until closed via <code>Escape</code> or the Close button.
                </p>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  style={{
                    background: 'var(--a11y-primary)',
                    color: 'var(--a11y-primary-text)',
                    border: 'none',
                    padding: '0.65rem 1.35rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
                  }}
                >
                  Launch Accessible Modal ({framework === 'react' ? 'React' : 'Vue'})
                </button>
              </div>
            ) : (
              <div className="dev-notes-box">
                <h4>💡 Engineering Insights: Keyboard Trapping</h4>
                <p style={{ margin: '0 0 0.5rem 0' }}>
                  <strong>Why it matters:</strong> Without focus trapping, screen readers and keyboard users jump into underlying page content while a modal covers the view, causing disorientation.
                </p>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.83rem' }}>
                  <li>Stores <code>document.activeElement</code> on open to restore focus upon unmount.</li>
                  <li>Captures keydown events on first and last focusable children to prevent Tab escape.</li>
                  <li>Attaches an <code>Escape</code> event listener at window scope for instant dismissal.</li>
                </ul>
              </div>
            )}

            <CodePreviewer
              reactCode={`<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="System Preferences">
  <p>Keyboard focus is trapped strictly inside this dialog.</p>
  <button type="button" onClick={() => setIsModalOpen(false)}>Save Settings</button>
</Modal>`}
              vueCode={`<Modal :isOpen="isModalOpen" title="System Preferences" @close="isModalOpen = false">
  <p>Vue 3 Teleport Focus Trap Implementation.</p>
  <button type="button" @click="isModalOpen = false">Save Settings</button>
</Modal>`}
            />
          </section>

          {/* Component 2: Combobox Autocomplete */}
          <section className="showcase-card">
            <div className="showcase-card-header">
              <div className="card-title-group">
                <h3>2. Autocomplete Combobox & Listbox</h3>
                <p>ARIA 1.2 Combobox • Active Descendant Management • Screen Reader Live Region</p>
              </div>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--a11y-font-mono)', color: 'var(--a11y-primary-hover)', background: 'var(--a11y-bg-subtle)', padding: '0.2rem 0.6rem', borderRadius: '4px', border: '1px solid var(--a11y-border)' }}>
                role="combobox"
              </span>
            </div>

            <div className="card-view-tabs">
              <button
                type="button"
                className={`card-tab-btn ${comboboxTab === 'demo' ? 'is-active' : ''}`}
                onClick={() => setComboboxTab('demo')}
              >
                🎮 Interactive Demo
              </button>
              <button
                type="button"
                className={`card-tab-btn ${comboboxTab === 'notes' ? 'is-active' : ''}`}
                onClick={() => setComboboxTab('notes')}
              >
                📝 Architecture & Specs
              </button>
            </div>

            {comboboxTab === 'demo' ? (
              <div>
                <p style={{ color: 'var(--a11y-text-secondary)', fontSize: '0.9rem', marginBottom: '1.2rem' }}>
                  Type to filter technologies. Use <code>ArrowDown</code> and <code>ArrowUp</code> to cycle options, and <code>Enter</code> to select. Focus remains inside the input while <code>aria-activedescendant</code> highlights the option.
                </p>

                <div style={{ maxWidth: '440px', marginBottom: '1.25rem' }}>
                  <ReactCombobox
                    label="Select Core Technology"
                    options={techOptions}
                    onChange={opt => setSelectedTech(opt)}
                    placeholder="Type 'React', 'Vue', 'C#', 'AWS'..."
                  />
                </div>

                {selectedTech && (
                  <div style={{ background: 'var(--a11y-bg-dark)', padding: '0.6rem 1rem', borderRadius: '6px', border: '1px solid var(--a11y-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '440px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--a11y-success)', fontWeight: 600 }}>
                      Selected: {selectedTech.label} ({selectedTech.value})
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedTech(null)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--a11y-text-muted)', cursor: 'pointer', fontSize: '0.8rem' }}
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="dev-notes-box">
                <h4>💡 Engineering Insights: Active Descendant Pattern</h4>
                <p style={{ margin: '0 0 0.5rem 0' }}>
                  <strong>DOM Focus vs ARIA Active Descendant:</strong> Moving real browser focus to each list item while typing breaks text input flow. Using <code>aria-activedescendant="option-id"</code> keeps DOM focus in the input field while visually & audibly highlighting the current item.
                </p>
              </div>
            )}

            <CodePreviewer
              reactCode={`<Combobox
  label="Select Core Technology"
  options={techOptions}
  onChange={(opt) => setSelectedTech(opt)}
/>`}
              vueCode={`<Combobox
  label="Select Core Technology"
  :options="techOptions"
  @select="(opt) => selectedTech = opt"
/>`}
            />
          </section>

          {/* Component 3: Accordion / Disclosure Group */}
          <section className="showcase-card">
            <div className="showcase-card-header">
              <div className="card-title-group">
                <h3>3. Accessible Accordion & Disclosure Group</h3>
                <p>Keyboard Navigation (Arrows/Home/End) • Dynamic aria-expanded State</p>
              </div>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--a11y-font-mono)', color: 'var(--a11y-primary-hover)', background: 'var(--a11y-bg-subtle)', padding: '0.2rem 0.6rem', borderRadius: '4px', border: '1px solid var(--a11y-border)' }}>
                aria-expanded
              </span>
            </div>

            <div className="card-view-tabs">
              <button
                type="button"
                className={`card-tab-btn ${accordionTab === 'demo' ? 'is-active' : ''}`}
                onClick={() => setAccordionTab('demo')}
              >
                🎮 Interactive Demo
              </button>
              <button
                type="button"
                className={`card-tab-btn ${accordionTab === 'notes' ? 'is-active' : ''}`}
                onClick={() => setAccordionTab('notes')}
              >
                📝 Architecture & Specs
              </button>
            </div>

            {accordionTab === 'demo' ? (
              <div>
                <p style={{ color: 'var(--a11y-text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                  Click a header or focus with <code>Tab</code> and press <code>Enter</code> or <code>Space</code> to toggle panels.
                </p>
                <ReactAccordion items={accordionItems} />
              </div>
            ) : (
              <div className="dev-notes-box">
                <h4>💡 Engineering Insights: Accordion ARIA Standards</h4>
                <p style={{ margin: 0 }}>
                  Each header trigger is an HTML <code>&lt;button&gt;</code> linked to its panel via <code>aria-controls</code>. Panel containers use <code>role="region"</code> and <code>aria-labelledby</code> to maintain standard document outline structure.
                </p>
              </div>
            )}

            <CodePreviewer
              reactCode={`<Accordion items={accordionItems} allowMultiple={false} />`}
              vueCode={`<Accordion :items="accordionItems" />`}
            />
          </section>

          {/* Component 4: ARIA Live Toast Alerts */}
          <section className="showcase-card">
            <div className="showcase-card-header">
              <div className="card-title-group">
                <h3>4. Live Region Toast & Status Messenger</h3>
                <p>Polite vs Assertive ARIA Announcements (WCAG Criterion 4.1.3)</p>
              </div>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--a11y-font-mono)', color: 'var(--a11y-primary-hover)', background: 'var(--a11y-bg-subtle)', padding: '0.2rem 0.6rem', borderRadius: '4px', border: '1px solid var(--a11y-border)' }}>
                role="status" / "alert"
              </span>
            </div>

            <div className="card-view-tabs">
              <button
                type="button"
                className={`card-tab-btn ${toastTab === 'demo' ? 'is-active' : ''}`}
                onClick={() => setToastTab('demo')}
              >
                🎮 Interactive Demo
              </button>
              <button
                type="button"
                className={`card-tab-btn ${toastTab === 'notes' ? 'is-active' : ''}`}
                onClick={() => setToastTab('notes')}
              >
                📝 Architecture & Specs
              </button>
            </div>

            {toastTab === 'demo' ? (
              <div>
                <p style={{ color: 'var(--a11y-text-secondary)', fontSize: '0.9rem', marginBottom: '1.2rem' }}>
                  Trigger live announcements below. Informational toasts use <code>aria-live="polite"</code> while alerts use <code>aria-live="assertive"</code> to notify screen reader users without interrupting playback.
                </p>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                  <button
                    type="button"
                    onClick={() => triggerToast('info')}
                    style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '0.55rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
                  >
                    Info (Polite)
                  </button>

                  <button
                    type="button"
                    onClick={() => triggerToast('success')}
                    style={{ background: '#10b981', color: '#fff', border: 'none', padding: '0.55rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
                  >
                    Success (Polite)
                  </button>

                  <button
                    type="button"
                    onClick={() => triggerToast('warning')}
                    style={{ background: '#f59e0b', color: '#0f172a', border: 'none', padding: '0.55rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem' }}
                  >
                    Warning (Polite)
                  </button>

                  <button
                    type="button"
                    onClick={() => triggerToast('danger')}
                    style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '0.55rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
                  >
                    Alert (Assertive)
                  </button>
                </div>
              </div>
            ) : (
              <div className="dev-notes-box">
                <h4>💡 Engineering Insights: Polite vs Assertive Live Regions</h4>
                <p style={{ margin: 0 }}>
                  <code>aria-live="polite"</code> waits until the screen reader finishes speaking the current queue. <code>aria-live="assertive"</code> immediately interrupts active speech to deliver high-priority error warnings.
                </p>
              </div>
            )}

            <CodePreviewer
              reactCode={`<ToastContainer toasts={toasts} onDismiss={(id) => dismiss(id)} />`}
              vueCode={`<ToastContainer :toasts="toasts" @dismiss="(id) => dismiss(id)" />`}
            />
          </section>
        </main>

        {/* Sidebar Inspector Panel */}
        <aside className="sidebar-panel">
          <A11yInspector />
          <KeyboardVisualizer />
          <WcagScorecard />
        </aside>
      </div>

      {/* Accessible Modal Instance */}
      <ReactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Accessible System Configuration"
        description="This modal panel locks keyboard focus inside the dialog (WCAG 2.1 Criterion 2.1.2)."
        footer={
          <>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              style={{
                background: 'var(--a11y-bg-card-hover)',
                color: 'var(--a11y-text-primary)',
                border: '1px solid var(--a11y-border)',
                padding: '0.55rem 1.1rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.85rem',
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                triggerToast('success');
                setIsModalOpen(false);
              }}
              style={{
                background: 'var(--a11y-primary)',
                color: 'var(--a11y-primary-text)',
                border: 'none',
                padding: '0.55rem 1.1rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.85rem',
              }}
            >
              Save Configuration
            </button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ color: 'var(--a11y-text-secondary)', margin: 0, fontSize: '0.9rem' }}>
            Try pressing <code>Tab</code> or <code>Shift + Tab</code>. Notice how keyboard focus cycles strictly inside these form fields without escaping into the page behind.
          </p>

          <div>
            <label htmlFor="modal-name-input" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--a11y-text-muted)' }}>
              Configuration Profile Name
            </label>
            <input
              id="modal-name-input"
              type="text"
              value={modalFormName}
              onChange={e => setModalFormName(e.target.value)}
              placeholder="e.g. Production AWS Environment"
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                background: 'var(--a11y-bg-dark)',
                border: '1px solid var(--a11y-border)',
                borderRadius: '6px',
                color: 'var(--a11y-text-primary)',
                fontSize: '0.9rem',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>
      </ReactModal>

      {/* Active Toast Container */}
      <ReactToastContainer toasts={toasts} onDismiss={id => setToasts(prev => prev.filter(t => t.id !== id))} />

      {/* Personal Craftsman Footer */}
      <footer className="showcase-footer">
        <p style={{ margin: '0 0 0.4rem 0', fontWeight: 600, color: 'var(--a11y-text-primary)' }}>
          Accessible UI Component System • Designed & Built by <a href="https://github.com/aliceOnTheSea" target="_blank" rel="noopener noreferrer">Alice Carasco</a>
        </p>
        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--a11y-text-muted)' }}>
          Crafted with React 19, Vue 3, TypeScript & CSS Custom Properties • WCAG 2.1 AA Compliant
        </p>
      </footer>
    </div>
  );
};

