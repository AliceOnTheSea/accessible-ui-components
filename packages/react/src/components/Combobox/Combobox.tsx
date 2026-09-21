import React, { useState, useId, useRef, useEffect } from 'react';

export interface ComboboxOption {
  id: string;
  label: string;
  value: string;
}

export interface ComboboxProps {
  label: string;
  options: ComboboxOption[];
  value?: string;
  onChange?: (selected: ComboboxOption | null) => void;
  placeholder?: string;
}

export const Combobox: React.FC<ComboboxProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Type to search...',
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const inputId = useId();
  const listboxId = useId();
  const labelId = useId();
  const liveRegionId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setIsOpen(true);
      setActiveIndex(0);
      e.preventDefault();
      return;
    }

    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => (prev < filteredOptions.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => (prev > 0 ? prev - 1 : filteredOptions.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < filteredOptions.length) {
          selectOption(filteredOptions[activeIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setActiveIndex(-1);
        break;
      case 'Tab':
        setIsOpen(false);
        break;
    }
  };

  const selectOption = (option: ComboboxOption) => {
    setQuery(option.label);
    setIsOpen(false);
    setActiveIndex(-1);
    if (onChange) onChange(option);
  };

  const activeOptionId =
    activeIndex >= 0 && filteredOptions[activeIndex]
      ? `${listboxId}-option-${activeIndex}`
      : undefined;

  return (
    <div className="a11y-combobox-container">
      <label id={labelId} htmlFor={inputId} style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
        {label}
      </label>
      
      <div className="a11y-combobox-input-wrapper">
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-labelledby={labelId}
          aria-autocomplete="list"
          aria-activedescendant={activeOptionId}
          className="a11y-combobox-input"
          placeholder={placeholder}
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        
        {query && (
          <button
            type="button"
            aria-label="Clear input selection"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
              if (onChange) onChange(null);
              inputRef.current?.focus();
            }}
            style={{
              position: 'absolute',
              right: '0.75rem',
              background: 'none',
              border: 'none',
              color: 'var(--a11y-text-muted)',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Screen reader live region update */}
      <div id={liveRegionId} className="sr-only" aria-live="polite" aria-atomic="true">
        {isOpen && `${filteredOptions.length} options available.`}
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={labelId}
          className="a11y-combobox-listbox"
        >
          {filteredOptions.map((opt, index) => {
            const optionId = `${listboxId}-option-${index}`;
            const isSelected = activeIndex === index;

            return (
              <li
                key={opt.id}
                id={optionId}
                role="option"
                aria-selected={isSelected}
                className={`a11y-combobox-option ${isSelected ? 'is-focused' : ''}`}
                onClick={() => selectOption(opt)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <span>{opt.label}</span>
                {opt.value && <small style={{ color: 'var(--a11y-text-muted)' }}>{opt.value}</small>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
