<script setup lang="ts">
export interface ToastMessage {
  id: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  title: string;
  message?: string;
}

defineProps<{
  toasts: ToastMessage[];
}>();

const emit = defineEmits(['dismiss']);
</script>

<template>
  <div className="a11y-toast-container" role="region" aria-label="Notifications">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :role="toast.type === 'danger' || toast.type === 'warning' ? 'alert' : 'status'"
      :aria-live="toast.type === 'danger' || toast.type === 'warning' ? 'assertive' : 'polite'"
      :class="['a11y-toast', `a11y-toast--${toast.type}`]"
    >
      <div>
        <strong style="display: block;">{{ toast.title }}</strong>
        <small v-if="toast.message" style="color: var(--a11y-text-muted);">{{ toast.message }}</small>
      </div>
      <button
        type="button"
        :aria-label="`Dismiss ${toast.title} notification`"
        style="background: none; border: none; color: var(--a11y-text-muted); cursor: pointer; padding: 4px 8px; margin-left: 1rem;"
        @click="emit('dismiss', toast.id)"
      >
        ✕
      </button>
    </div>
  </div>
</template>
