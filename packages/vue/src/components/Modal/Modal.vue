<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  isOpen: boolean;
  title: string;
  description?: string;
}>();

const emit = defineEmits(['close']);

const modalId = `vue-modal-${Math.random().toString(36).substring(2, 9)}`;
const titleId = `${modalId}-title`;
const descId = `${modalId}-desc`;
const containerRef = ref<HTMLElement | null>(null);
let previousActive: HTMLElement | null = null;

const handleKeyDown = (e: KeyboardEvent) => {
  if (!props.isOpen) return;

  if (e.key === 'Escape') {
    emit('close');
    return;
  }

  if (e.key === 'Tab' && containerRef.value) {
    const focusables = Array.from(
      containerRef.value.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
};

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    previousActive = document.activeElement as HTMLElement;
    setTimeout(() => {
      const firstBtn = containerRef.value?.querySelector('button');
      if (firstBtn) (firstBtn as HTMLElement).focus();
    }, 50);
  } else if (previousActive) {
    previousActive.focus();
  }
});

onMounted(() => window.addEventListener('keydown', handleKeyDown));
onUnmounted(() => window.removeEventListener('keydown', handleKeyDown));
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="a11y-dialog-backdrop"
      @click.self="emit('close')"
    >
      <div
        ref="containerRef"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        :aria-describedby="description ? descId : undefined"
        tabindex="-1"
        className="a11y-dialog-panel"
      >
        <div className="a11y-dialog-header">
          <h2 :id="titleId" className="a11y-dialog-title">
            {{ title }}
          </h2>
          <button
            type="button"
            className="a11y-dialog-close-btn"
            aria-label="Close modal dialog"
            @click="emit('close')"
          >
            ✕
          </button>
        </div>

        <p v-if="description" :id="descId" style="margin-top: 0; color: var(--a11y-text-muted);">
          {{ description }}
        </p>

        <div className="a11y-dialog-body">
          <slot />
        </div>

        <div className="a11y-dialog-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>
