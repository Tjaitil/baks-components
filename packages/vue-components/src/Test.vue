<template>
  <div @click="done">{{ name }}</div>
</template>

<script setup lang="ts">
interface Props {
  name: string;
}
const props = defineProps<Props>();
const emit = defineEmits(['done']);
const done = () => {
  console.log('emit done');
  emit('done');
};
</script>

<style scoped></style>
