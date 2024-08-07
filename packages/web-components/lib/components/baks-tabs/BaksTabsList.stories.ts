import type { Meta, StoryObj } from '@storybook/web-components';
import { register } from '../../';

import { html } from 'lit';
import { variantsOptions } from 'baks-components-styles';
import { expect, within } from '@storybook/test';

const meta: Meta = {
  component: 'baks-button',
  argTypes: {
    direction: {
      options: ['horizontal', 'vertical'],
      control: { type: 'select' }
    },
    variant: {
      options: variantsOptions,
      control: { type: 'select' }
    }
  }
};

export default meta;
type Story = StoryObj;

register(['BaksTabList', 'BaksTab', 'BaksTabPanel']);

export const Normal: Story = {
  args: {
    direction: "vertical",
    variant: 'primary'
  },
  render: ({ direction, variant }) => {
    return html`
    <div class="flex flex-col">
      <baks-tab-list direction="${direction}" role="tablist">
        <baks-tab variant="${variant}" tab-group="sidebar-tab" controls="sidebar-log-tabpanel" role="tab" id="tab1">
          Test 1
        </baks-tab>
        <baks-tab variant="${variant}" tab-group="sidebar-tab" controls="sidebar-log-tabpanel2" role="tab" id="tab2" selected>
          Test 2
        </baks-tab>
      </baks-tab-list>
      <div>
          <baks-tab-panel id="sidebar-log-tabpanel" controlled-by="tab1" role="tabpanel">Hello</baks-tab-panel>
          <baks-tab-panel id="sidebar-log-tabpanel2" controlled-by="tab2" role="tabpanel">2</baks-tab-panel>
      </div>
    </div>
    `;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('tab');
    const button = buttons.find((button) => button.getAttribute("selected") === null);
    const clickedButton = buttons.find((button) => button.getAttribute("selected") !== null);
    button.click();

    expect(button.getAttribute("selected")).not.toBe(null);
    expect(clickedButton.getAttribute("selected")).toBe(null);

    const panelShouldBeVisibleId = button.getAttribute("controls");
    const panels = canvas.getAllByRole("tabpanel");
    const panel = panels.find((panel) => panel.getAttribute("id") === panelShouldBeVisibleId);

    expect(panel.getAttribute("is-visible")).not.toBe(null);
  }
};
