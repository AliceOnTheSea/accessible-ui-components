# ♿ Accessible UI Component Library & Design System

[![CI Accessibility Audit](https://github.com/aliceOnTheSea/accessible-ui-components/actions/workflows/ci.yml/badge.svg)](https://github.com/aliceOnTheSea/accessible-ui-components/actions)
[![WCAG Compliance](https://img.shields.io/badge/WCAG-2.1%20AA%20Compliant-34d399?style=flat-square)](https://www.w3.org/TR/WCAG21/)
[![License](https://img.shields.io/badge/License-MIT-38bdf8?style=flat-square)](LICENSE)
[![Frameworks](https://img.shields.io/badge/Frameworks-React%20%7C%20Vue%203-f43f5e?style=flat-square)](https://react.dev)

[🚀 Live Interactive Showcase & ARIA Inspector](https://aliceonthesea.github.io/accessible-ui-components/)

> Production-ready, **WCAG 2.1 AA compliant** UI design system built in a **pnpm monorepo workspace**. Features parallel implementations in **React 19 (TypeScript)** and **Vue 3 (Composition API)** using shared SCSS tokens, zero `axe-core` accessibility violations, focus trap mechanics, and real-time ARIA inspection.

---

## 🌟 Key Engineering Features

- **Parallel Framework Architecture:** Single monorepo powering both `@accessible-ui/react` and `@accessible-ui/vue` with zero duplicated styling.
- **Strict Keyboard Focus Trapping (Criterion 2.1.2):** Focus trap composables & hooks automatically trap `Tab` and `Shift+Tab` cycles within active modal dialogs, and restore focus to trigger buttons on dismiss.
- **Active Descendant Navigation (Criterion 4.1.2):** Combobox Autocomplete utilizes `aria-activedescendant` and `role="combobox"` without losing input cursor position.
- **Live Region Announcements (Criterion 4.1.3):** Toast & status notifications announce changes via `aria-live="polite"` and `aria-live="assertive"`.
- **Contrast & High-Visibility Focus Rings (Criterion 1.4.3 & 2.4.7):** All tokens maintain contrast > 4.5:1 on dark and light themes, accompanied by a 3px Rose focus indicator.
- **Automated CI Accessibility Audits:** CI pipeline running `axe-core` unit test suites on every pull request.

---

## 📐 Monorepo Package Architecture

```
accessible-ui-components/
├── packages/
│   ├── core-tokens/          # Shared CSS Custom Properties, WCAG contrast tokens, focus ring utilities
│   ├── react/                # React 19 + TypeScript component primitives & accessibility hooks
│   └── vue/                  # Vue 3 (Composition API <script setup>) components & composables
├── apps/
│   └── showcase/             # Interactive Vite Portfolio Dashboard (ARIA Inspector, Keyboard Visualizer)
├── .github/
│   └── workflows/ci.yml      # GitHub Actions CI for linting and axe-core unit testing
└── README.md
```

---

## 🛡️ WCAG 2.1 AA Compliance Scorecard

| WCAG Guideline | Name | Implementation Strategy | Status |
| :--- | :--- | :--- | :--- |
| **1.4.3** | Contrast (Minimum) | Color design tokens maintain min 4.5:1 ratio for text & controls | **PASSED** |
| **2.1.1** | Keyboard Access | 100% interactive elements triggerable via keyboard | **PASSED** |
| **2.1.2** | No Focus Trap | Modals handle `Escape` key dismiss and trap focus safely | **PASSED** |
| **2.4.7** | Focus Visible | High-visibility 3px Rose focus outline indicator (`:focus-visible`) | **PASSED** |
| **4.1.2** | Name, Role, Value | WAI-ARIA pattern implementations (`dialog`, `combobox`, `region`) | **PASSED** |
| **4.1.3** | Status Messages | Polite and assertive dynamic live regions | **PASSED** |

---

## ⌨️ Keyboard Shortcuts & Interaction Matrix

| Component | Shortcut | Action |
| :--- | :--- | :--- |
| **Modal Dialog** | `Escape` | Dismisses modal and restores focus to trigger button |
| **Modal Dialog** | `Tab` / `Shift + Tab` | Cycles focus strictly within active modal controls |
| **Combobox** | `ArrowDown` / `ArrowUp` | Navigates through filtered listbox options |
| **Combobox** | `Enter` | Selects active option and closes listbox |
| **Combobox** | `Escape` | Closes option listbox without changing selection |
| **Accordion** | `ArrowDown` / `ArrowUp` | Moves focus between accordion header triggers |
| **Accordion** | `Home` / `End` | Jumps focus to first or last accordion header |

---

## 🚀 Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/aliceOnTheSea/accessible-ui-components.git
cd accessible-ui-components

# Install monorepo dependencies
pnpm install

# Start the interactive Showcase Web App
pnpm dev

# Run automated axe-core accessibility unit tests
pnpm test
```

---

## 👤 Author

**Alice Carasco**  
*Senior Full-Stack & Frontend Software Engineer*  
📍 Portland Metro Area, OR • [LinkedIn](https://www.linkedin.com/in/alicecarasco/) • [Email](mailto:alicecarasco@engineer.com)
