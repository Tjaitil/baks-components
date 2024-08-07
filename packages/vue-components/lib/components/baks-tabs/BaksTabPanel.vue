<template>
  <div
    part="bk-tab-panel"
    role="tabpanel"
    class="p-4"
    :class="{ hidden: !props.isVisible }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">

interface Props {
  isVisible?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isVisible: false
});
</script>

<style>
@import url('../../app.css');
</style>
