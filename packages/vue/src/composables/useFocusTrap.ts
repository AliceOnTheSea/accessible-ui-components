import { onMounted, onUnmounted, ref, type Ref } from 'vue';

export function useFocusTrap(isOpen: Ref<boolean>, onClose?: () => void) {
  const containerRef = ref<HTMLElement | null>(null);
  let previousActiveElement: HTMLElement | null = null;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen.value || !containerRef.value) return;

    if (e.key === 'Escape' && onClose) {
      e.preventDefault();
      onClose();
      return;
    }

    if (e.key !== 'Tab') return;

    const focusables = Array.from(
      containerRef.value.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter(el => el.offsetWidth > 0 || el.offsetHeight > 0);

    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  onMounted(() => {
    previousActiveElement = document.activeElement as HTMLElement;
    window.addEventListener('keydown', handleKeyDown);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
    if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
      previousActiveElement.focus();
    }
  });

  return { containerRef };
}
