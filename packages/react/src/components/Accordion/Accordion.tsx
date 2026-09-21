import React, { useState, useId, useRef } from 'react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false }) => {
  const [openIds, setOpenIds] = useState<string[]>([items[0]?.id || '']);
  const baseId = useId();
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));
    } else {
      setOpenIds(prev => (prev.includes(id) ? [] : [id]));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = (index + 1) % items.length;
        triggerRefs.current[nextIndex]?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = (index - 1 + items.length) % items.length;
        triggerRefs.current[prevIndex]?.focus();
        break;
      case 'Home':
        e.preventDefault();
        triggerRefs.current[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        triggerRefs.current[items.length - 1]?.focus();
        break;
    }
  };

  return (
    <div className="a11y-accordion">
      {items.map((item, index) => {
        const isOpen = openIds.includes(item.id);
        const triggerId = `${baseId}-trigger-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;

        return (
          <div key={item.id} className="a11y-accordion-item">
            <h3>
              <button
                ref={el => (triggerRefs.current[index] = el)}
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="a11y-accordion-trigger"
                onClick={() => toggleItem(item.id)}
                onKeyDown={e => handleKeyDown(e, index)}
              >
                <span>{item.title}</span>
                <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms' }}>
                  ▼
                </span>
              </button>
            </h3>

            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className="a11y-accordion-panel"
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
