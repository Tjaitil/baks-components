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

register(['BaksTabListW', 'BaksTab', 'BaksTabPanel']);

export const Normal: Story = {
  args: {
    direction: 'horizontal',
    variant: 'primary'
  },
  render: ({ direction, variant }) => {
    return html`     <baks-tab-list-w direction="${direction}">
      <baks-tab variant="${variant}" tab-group="sidebar-tab" controls="sidebar-log-tabpanel" role="tab" selected>
        Test 1
      </baks-tab>
      <baks-tab variant="${variant}" tab-group="sidebar-tab" controls="sidebar-log-tabpanel2" role="tab">
        Test 2
      </baks-tab>
      <baks-tab variant="${variant}" tab-group="sidebar-tab" controls="sidebar-log-tabpanel3" role="tab">
        Test 3
      </baks-tab>
      <div slot="panel">
        <baks-tab-panel id="sidebar-log-tabpanel" role="tabpanel">Hello</baks-tab-panel>
        <baks-tab-panel id="sidebar-log-tabpanel2" role="tabpanel">2</baks-tab-panel>
        <baks-tab-panel id="sidebar-log-tabpanel3" role="tabpanel">3</baks-tab-panel>
      </div>
    </baks-tab-list-w>`;
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
