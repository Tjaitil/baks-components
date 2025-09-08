<template>
  <div
    :id
    part="bk-tab-panel"
    role="tabpanel"
    class="p-4 bk-tab-panel"
    :class="{ hidden: !isVisible }"
    :aria-labelledby="controlledBy"
    tabindex="0"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';

type Props = {
  id?: string;
  isVisible?: boolean;
  controlledBy: string;
};

const { id = 'tab-panel-' + uuidv4() } = defineProps<Props>();
</script>
