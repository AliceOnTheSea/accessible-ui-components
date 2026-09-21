<script setup lang="ts">
import { ref } from 'vue';

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

const props = defineProps<{
  items: AccordionItem[];
}>();

const openIds = ref<string[]>([props.items[0]?.id || '']);

const toggleItem = (id: string) => {
  openIds.value = openIds.value.includes(id) ? [] : [id];
};
</script>

<template>
  <div className="a11y-accordion">
    <div v-for="item in items" :key="item.id" className="a11y-accordion-item">
      <h3>
        <button
          type="button"
          :aria-expanded="openIds.includes(item.id)"
          :aria-controls="`panel-${item.id}`"
          className="a11y-accordion-trigger"
          @click="toggleItem(item.id)"
        >
          <span>{{ item.title }}</span>
          <span :style="{ transform: openIds.includes(item.id) ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms' }">
            ▼
          </span>
        </button>
      </h3>

      <div
        v-if="openIds.includes(item.id)"
        :id="`panel-${item.id}`"
        role="region"
        className="a11y-accordion-panel"
      >
        {{ item.content }}
      </div>
    </div>
  </div>
</template>
