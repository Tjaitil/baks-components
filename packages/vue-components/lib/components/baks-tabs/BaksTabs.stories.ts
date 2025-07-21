import type { Meta, StoryObj } from '@storybook/vue3-vite';

import BaksTab from './BaksTab.vue';
import BaksTabPanel from './BaksTabPanel.vue';
import { useBaksTabs } from '../../composables/useBaksTabs';

const meta = {
  component: BaksTab,
  title: 'BaksTabs',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'dark', 'light', 'warning', 'success', 'error', 'info'],
      defaultValue: 'primary'
    }
  },
  args: {
    variant: 'primary'
  }
} satisfies Meta<typeof BaksTab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SingleTab: Story = {
  render: (args) => ({
    components: { BaksTab },
    setup() {
      return { args };
    },
    template: `
      <BaksTab 
        v-bind="args"
      >
        Tab 1
      </BaksTab>
    `
  }),
  args: {
    variant: 'primary',
    tabGroup: 'example',
    controls: 'panel-1',
    selected: true
  }
};

export const TabsWithPanels: Story = {
  render: (args) => ({
    components: { BaksTab, BaksTabPanel },
    setup() {
      const tabs = ['tab1', 'tab2', 'tab3'] as const;
      const { selectedTab, handleTabClick, isTabSelected } = useBaksTabs(tabs, 'tab1');

      return {
        args,
        selectedTab,
        handleTabClick,
        isTabSelected
      };
    },
    template: `
      <div>
        <div class="flex gap-2 mb-4" role="tablist">
          <BaksTab 
            v-bind="args"
            tabGroup="demo"
            controls="panel-1"
            :selected="isTabSelected('tab1')"
            @click="handleTabClick('tab1')"
          >
            First Tab
          </BaksTab>
          
          <BaksTab 
            v-bind="args"
            tabGroup="demo"
            controls="panel-2"
            :selected="isTabSelected('tab2')"
            @click="handleTabClick('tab2')"
          >
            Second Tab
          </BaksTab>
          
          <BaksTab 
            v-bind="args"
            tabGroup="demo"
            controls="panel-3"
            :selected="isTabSelected('tab3')"
            @click="handleTabClick('tab3')"
          >
            Third Tab
          </BaksTab>
        </div>
        
        <div>
          <BaksTabPanel 
            id="panel-1" 
            controlledBy="tab1" 
            :isVisible="isTabSelected('tab1')"
          >
            <h3>Content for First Tab</h3>
            <p>This is the content that shows when the first tab is selected.</p>
          </BaksTabPanel>
          
          <BaksTabPanel 
            id="panel-2" 
            controlledBy="tab2" 
            :isVisible="isTabSelected('tab2')"
          >
            <h3>Content for Second Tab</h3>
            <p>This is the content that shows when the second tab is selected.</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </BaksTabPanel>
          
          <BaksTabPanel 
            id="panel-3" 
            controlledBy="tab3" 
            :isVisible="isTabSelected('tab3')"
          >
            <h3>Content for Third Tab</h3>
            <p>This is the content that shows when the third tab is selected.</p>
            <div class="bg-gray-100 p-4 rounded">
              <p>Some highlighted content in the third panel.</p>
            </div>
          </BaksTabPanel>
        </div>
      </div>
    `
  }),
  args: {
    variant: 'primary',
    tabGroup: 'demo',
    controls: 'panel-1'
  }
};

export const DifferentVariants: Story = {
  render: () => ({
    components: { BaksTab, BaksTabPanel },
    setup() {
      const tabs = ['primary', 'secondary', 'success'] as const;
      const { selectedTab, handleTabClick, isTabSelected } = useBaksTabs(tabs, 'primary');

      return {
        selectedTab,
        handleTabClick,
        isTabSelected
      };
    },
    template: `
      <div>
        <div class="flex gap-2 mb-4" role="tablist">
          <BaksTab 
            variant="primary"
            tabGroup="variants"
            controls="primary-panel"
            :selected="isTabSelected('primary')"
            @click="handleTabClick('primary')"
          >
            Primary
          </BaksTab>
          
          <BaksTab 
            variant="secondary"
            tabGroup="variants"
            controls="secondary-panel"
            :selected="isTabSelected('secondary')"
            @click="handleTabClick('secondary')"
          >
            Secondary
          </BaksTab>
          
          <BaksTab 
            variant="success"
            tabGroup="variants"
            controls="success-panel"
            :selected="isTabSelected('success')"
            @click="handleTabClick('success')"
          >
            Success
          </BaksTab>
        </div>
        
        <div>
          <BaksTabPanel 
            id="primary-panel" 
            controlledBy="primary" 
            :isVisible="isTabSelected('primary')"
          >
            <h3>Primary Tab Content</h3>
            <p>This tab uses the primary variant styling.</p>
          </BaksTabPanel>
          
          <BaksTabPanel 
            id="secondary-panel" 
            controlledBy="secondary" 
            :isVisible="isTabSelected('secondary')"
          >
            <h3>Secondary Tab Content</h3>
            <p>This tab uses the secondary variant styling.</p>
          </BaksTabPanel>
          
          <BaksTabPanel 
            id="success-panel" 
            controlledBy="success" 
            :isVisible="isTabSelected('success')"
          >
            <h3>Success Tab Content</h3>
            <p>This tab uses the success variant styling.</p>
          </BaksTabPanel>
        </div>
      </div>
    `
  }),
  args: {
    variant: 'primary',
    tabGroup: 'variants',
    controls: 'primary-panel'
  }
};

export const ManyTabs: Story = {
  render: (args) => ({
    components: { BaksTab, BaksTabPanel },
    setup() {
      const tabs = ['tab1', 'tab2', 'tab3', 'tab4', 'tab5', 'tab6'] as const;
      const { selectedTab, handleTabClick, isTabSelected } = useBaksTabs(tabs, 'tab1');

      return {
        args,
        selectedTab,
        handleTabClick,
        isTabSelected,
        tabs
      };
    },
    template: `
      <div>
        <div class="flex gap-1 mb-4 overflow-x-auto" role="tablist">
          <BaksTab 
            v-for="(tab, index) in tabs"
            :key="tab"
            v-bind="args"
            tabGroup="many"
            :controls="'panel-' + tab"
            :selected="isTabSelected(tab)"
            @click="handleTabClick(tab)"
          >
            Tab {{ index + 1 }}
          </BaksTab>
        </div>
        
        <div>
          <BaksTabPanel 
            v-for="(tab, index) in tabs"
            :key="tab"
            :id="'panel-' + tab" 
            :controlledBy="tab" 
            :isVisible="isTabSelected(tab)"
          >
            <h3>Tab {{ index + 1 }} Content</h3>
            <p>This is the content for tab {{ index + 1 }}.</p>
          </BaksTabPanel>
        </div>
      </div>
    `
  }),
  args: {
    variant: 'info',
    tabGroup: 'many',
    controls: 'panel-tab1'
  }
};
