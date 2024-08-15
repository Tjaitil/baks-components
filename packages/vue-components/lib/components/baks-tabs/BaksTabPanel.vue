<template>
  <div
    part="bk-tab-panel"
    role="tabpanel"
    class="p-4 bk-tab-panel"
    :class="{ hidden: !props.isVisible }"
    :aria-labelledby="controlledBy"
    :id="($attrs.id as string)"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">

interface Props {
  isVisible?: boolean;
  controlledBy: string;
}

const props = withDefaults(defineProps<Props>(), {
  isVisible: false
});
</script>

<style>
@import url('../../app.css');
</style>
