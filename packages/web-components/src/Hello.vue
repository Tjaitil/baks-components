<template>
  <div>
    <slot @test="test"></slot>
  </div>
</template>

<script setup lang="ts">
import { onMounted, useSlots } from 'vue';
const test = () => {
  window.alert('Dialog should be closed!');
  console.log('closed!');
};
</script>
