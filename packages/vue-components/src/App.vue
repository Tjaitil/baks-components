<template>
  <div>App</div>
  <BaksSelect :options v-model="selected" name="test" variant="primary" />
  <BaksAccordion variant="primary">
    <template #header>
      Accordion
    </template>
    <template #content>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum iste, aliquid saepe, quo mollitia et laboriosam tempora, reprehenderit neque asperiores similique quis rerum quaerat molestias? Eaque odit nisi dignissimos suscipit.
      </p>
    </template>
  </BaksAccordion>
  <div class="p-4 bg-red-50">
    hello
  </div>
</template>

<script lang="ts" setup>
import BaksAccordion from "@/components/baks-accordion/BaksAccordion.vue";
import BaksSelect from "@/components/baks-select/BaksSelect.vue";
import { ref } from "vue";

const options = ref([{ label: "hello", value: "hello" }]);
const selected = ref("hello");
</script>
