<template>
  <div
    :id="$attrs.id as string"
    part="bk-tab-panel"
    role="tabpanel"
    class="p-4 bk-tab-panel"
    :class="{ hidden: !props.isVisible }"
    :aria-labelledby="controlledBy"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
type Props = {
  isVisible?: boolean;
  controlledBy: string;
};

const props = withDefaults(defineProps<Props>(), {
  isVisible: false
});
</script>
