<template>
  <div>App</div>
  <div>
    <div class="flex flex-row">
      <!-- <baks-tab
        tab-group="hello"
        variant="primary"
        controls="hei1"
        :selected="isTabSelected('hei1')"
        @bk-tab:click="handleTabClick('hei1')"
        >1</baks-tab
      >
      <baks-tab
        tab-group="hello"
        variant="primary"
        controls="hei2"
        :selected="isTabSelected('hei2')"
        @bk-tab:click="handleTabClick('hei2')"
        >2</baks-tab
      >
      <baks-tab
        tab-group="hello"
        variant="primary"
        controls="hei3"
        :selected="isTabSelected('hei3')"
        @bk-tab:click="handleTabClick('hei3')"
        >3</baks-tab
      >
      <baks-tab
        tab-group="hello"
        variant="primary"
        controls="hei4"
        :selected="isTabSelected('hei4')"
        @bk-tab:click="handleTabClick('hei4')"
        >3</baks-tab
      > -->
    </div>
    <br />
    <div class="flex flex-col">
      <!-- <baks-tab
        tab-group="hello"
        variant="primary"
        controls="hei1"
        :selected="isTabSelected('hei1')"
        @bk-tab:click="handleTabClick('hei1')"
        >1</baks-tab
      >
      <baks-tab
        tab-group="hello"
        variant="primary"
        controls="hei2"
        :selected="isTabSelected('hei2')"
        @bk-tab:click="handleTabClick('hei2')"
        >2</baks-tab
      >
      <baks-tab
        tab-group="hello"
        variant="primary"
        controls="hei3"
        :selected="isTabSelected('hei3')"
        @bk-tab:click="handleTabClick('hei3')"
        >3</baks-tab
      >
      <baks-tab
        tab-group="hello"
        variant="primary"
        controls="hei4"
        :selected="isTabSelected('hei4')"
        @bk-tab:click="handleTabClick('hei4')"
        >3</baks-tab
      >
    </div>

    <baks-tab-panel id="hei1" :is-visible="isTabSelected('hei1')" variant="light"
      >Hello</baks-tab-panel
    >
    <baks-tab-panel id="hei2" :is-visible="isTabSelected('hei2')" variant="light"
      >Hello2</baks-tab-panel
    >
    <baks-tab-panel id="hei3" :is-visible="isTabSelected('hei3')" variant="light"
      >Hello3</baks-tab-panel
    > -->
  </div>
  </div>
</template>

<script lang="ts" setup>
import { useBaksTabs } from '@/composables/useBaksTabs';

const tabs = ['hei1', 'hei2', 'hei3', 'hei4'] as const;
const { isTabSelected, handleTabClick } = useBaksTabs(tabs, 'hei1');
</script>

<style lang="scss" scoped></style>
