import { ref } from 'vue';

export function useBaksTabs<T extends readonly string[]>(tabs: T, defaultTab: T[number]) {
  const isTabSelected = (id: T[number]) => {
    return id === selectedTab.value;
  };
  const handleTabClick = (id: T[number]) => {
    selectedTab.value = id;
  };

  const selectedTab = ref(tabs[0]);

  return {
    selectedTab,
    handleTabClick,
    isTabSelected
  };
}
