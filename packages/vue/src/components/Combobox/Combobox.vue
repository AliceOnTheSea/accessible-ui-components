<script setup lang="ts">
import { ref, computed } from 'vue';

export interface ComboboxOption {
  id: string;
  label: string;
  value: string;
}

const props = defineProps<{
  label: string;
  options: ComboboxOption[];
  placeholder?: string;
}>();

const emit = defineEmits(['select']);

const query = ref('');
const isOpen = ref(false);
const activeIndex = ref(-1);

const id = `vue-combobox-${Math.random().toString(36).substring(2, 9)}`;
const inputId = `${id}-input`;
const listboxId = `${id}-listbox`;

const filteredOptions = computed(() =>
  props.options.filter(opt => opt.label.toLowerCase().includes(query.value.toLowerCase()))
);

const handleKeyDown = (e: KeyboardEvent) => {
  if (!isOpen.value && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
    isOpen.value = true;
    activeIndex.value = 0;
    e.preventDefault();
    return;
  }

  if (!isOpen.value) return;

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      activeIndex.value = activeIndex.value < filteredOptions.value.length - 1 ? activeIndex.value + 1 : 0;
      break;
    case 'ArrowUp':
      e.preventDefault();
      activeIndex.value = activeIndex.value > 0 ? activeIndex.value - 1 : filteredOptions.value.length - 1;
      break;
    case 'Enter':
      e.preventDefault();
      if (activeIndex.value >= 0 && activeIndex.value < filteredOptions.value.length) {
        selectOption(filteredOptions.value[activeIndex.value]);
      }
      break;
    case 'Escape':
      isOpen.value = false;
      break;
  }
};

const selectOption = (opt: ComboboxOption) => {
  query.value = opt.label;
  isOpen.value = false;
  emit('select', opt);
};
</script>

<template>
  <div className="a11y-combobox-container">
    <label :for="inputId" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">
      {{ label }}
    </label>

    <div className="a11y-combobox-input-wrapper">
      <input
        :id="inputId"
        v-model="query"
        type="text"
        role="combobox"
        :aria-expanded="isOpen"
        aria-haspopup="listbox"
        :aria-controls="listboxId"
        aria-autocomplete="list"
        className="a11y-combobox-input"
        :placeholder="placeholder || 'Search options...'"
        @focus="isOpen = true"
        @keydown="handleKeyDown"
      />
    </div>

    <ul
      v-if="isOpen && filteredOptions.length"
      :id="listboxId"
      role="listbox"
      className="a11y-combobox-listbox"
    >
      <li
        v-for="(opt, index) in filteredOptions"
        :key="opt.id"
        role="option"
        :aria-selected="activeIndex === index"
        :class="['a11y-combobox-option', { 'is-focused': activeIndex === index }]"
        @click="selectOption(opt)"
        @mouseenter="activeIndex = index"
      >
        <span>{{ opt.label }}</span>
        <small style="color: var(--a11y-text-muted);">{{ opt.value }}</small>
      </li>
    </ul>
  </div>
</template>
