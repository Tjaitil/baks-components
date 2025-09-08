import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import BaksTabs from './BaksTabs.vue';
import type { ThemeVariant } from 'baks-components-styles';
import type { BaksTabItem } from '@/types/BaksTabItem';

vi.mock('baks-components-styles', () => ({
  resolveVariant: vi.fn((variant: string) => `variant-${variant}`)
}));

const defaultTabItems: BaksTabItem[] = [
  { label: 'Tab 1', key: 'tab1' },
  { label: 'Tab 2', key: 'tab2' },
  { label: 'Tab 3', key: 'tab3' }
];

const defaultProps = {
  variant: 'primary' as ThemeVariant,
  items: defaultTabItems,
  modelValue: 'tab1'
};

describe('BaksTabs', () => {
  test('renders with default props', () => {
    render(BaksTabs, { props: defaultProps });

    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();

    expect(screen.getByRole('tablist')).toBeInTheDocument();

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);
  });

  test('applies horizontal direction class by default', () => {
    render(BaksTabs, { props: defaultProps });

    const tabsContainer = screen.getByRole('tablist').parentElement;
    expect(tabsContainer).toHaveClass('horizontal');
  });

  test('applies vertical direction class when specified', () => {
    render(BaksTabs, {
      props: {
        ...defaultProps,
        direction: 'vertical'
      }
    });

    const tabsContainer = screen.getByRole('tablist').parentElement;
    expect(tabsContainer).toHaveClass('vertical');
  });

  test('generates unique tab and tabpanel IDs', () => {
    render(BaksTabs, { props: defaultProps });

    const tabs = screen.getAllByRole('tab');
    const tabpanels = screen.getAllByRole('tabpanel');

    tabs.forEach((tab) => {
      expect(tab).toHaveAttribute('aria-controls');
      const controlsId = tab.getAttribute('aria-controls');
      expect(controlsId).toContain('tabpanel-');
    });

    tabpanels.forEach((tabpanel) => {
      expect(tabpanel).toHaveAttribute('aria-labelledby');
      const labelledbyId = tabpanel.getAttribute('aria-labelledby');
      expect(labelledbyId).toContain('tab-');
    });
  });

  test('passes variant prop to tabs', () => {
    render(BaksTabs, {
      props: {
        ...defaultProps,
        variant: 'secondary'
      }
    });

    const tabs = screen.getAllByRole('tab');
    tabs.forEach((tab) => {
      expect(tab).toHaveClass('variant-secondary');
    });
  });

  test('renders tabpanel for active tab', () => {
    render(BaksTabs, { props: defaultProps });

    const tabpanels = screen.getAllByRole('tabpanel');
    expect(tabpanels).toHaveLength(1);
  });

  test('preserves accessibility attributes', () => {
    render(BaksTabs, { props: defaultProps });

    const tablist = screen.getByRole('tablist');
    expect(tablist).toBeInTheDocument();

    const tabs = screen.getAllByRole('tab');
    tabs.forEach((tab) => {
      expect(tab).toHaveAttribute('aria-controls');
      expect(tab).toHaveAttribute('aria-selected');
      expect(tab).toHaveAttribute('type', 'button');
    });

    const tabpanels = screen.getAllByRole('tabpanel');
    tabpanels.forEach((tabpanel) => {
      expect(tabpanel).toHaveAttribute('aria-labelledby');
    });
  });

  test('sets correct aria-selected state based on modelValue', () => {
    render(BaksTabs, {
      props: {
        ...defaultProps,
        modelValue: 'tab2'
      }
    });

    const tabs = screen.getAllByRole('tab');

    expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[2]).toHaveAttribute('aria-selected', 'false');
  });

  test('renders tabs with correct tab structure', () => {
    render(BaksTabs, { props: defaultProps });

    const tabs = screen.getAllByRole('tab');

    tabs.forEach((tab) => {
      expect(tab.tagName).toBe('BUTTON');
    });

    expect(tabs[0]).toHaveTextContent('Tab 1');
    expect(tabs[1]).toHaveTextContent('Tab 2');
    expect(tabs[2]).toHaveTextContent('Tab 3');
  });

  test('works with different tab item types', () => {
    const customTabItems = [
      { label: 'Home', key: 'home' },
      { label: 'About', key: 'about' },
      { label: 'Contact', key: 'contact' }
    ];

    render(BaksTabs, {
      props: {
        items: customTabItems,
        variant: 'primary',
        modelValue: 'home'
      }
    });

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  test('handles empty items array', () => {
    render(BaksTabs, {
      props: {
        variant: 'primary',
        items: [],
        modelValue: undefined
      }
    });

    // Should still render the tablist structure
    expect(screen.getByRole('tablist')).toBeInTheDocument();

    // But no tabs
    const tabs = screen.queryAllByRole('tab');
    expect(tabs).toHaveLength(0);
  });

  test('renders tabpanel with correct attributes', () => {
    render(BaksTabs, { props: defaultProps });

    const tabpanel = screen.getByRole('tabpanel');
    expect(tabpanel).toHaveClass('bk-tab-panel');
    expect(tabpanel).toHaveClass('p-4');
  });

  test('arrow right moves focus to next tab when direction is horizontal', async () => {
    render(BaksTabs, { props: { ...defaultProps, direction: 'horizontal' } });

    const tabs = screen.getAllByRole('tab');
    tabs[0].focus();
    expect(tabs[0]).toHaveFocus();

    await userEvent.keyboard('{arrowright}');

    expect(tabs[1]).toHaveFocus();
  });

  test('arrow right moves focus to first tab when at end when direction is horizontal', async () => {
    render(BaksTabs, { props: { ...defaultProps, direction: 'horizontal' } });

    const tabs = screen.getAllByRole('tab');
    tabs[tabs.length - 1].focus();
    expect(tabs[tabs.length - 1]).toHaveFocus();

    await userEvent.keyboard('{arrowright}');

    expect(tabs[0]).toHaveFocus();
  });

  test('arrow left moves focus to previous tab when direction is horizontal', async () => {
    render(BaksTabs, { props: { ...defaultProps, direction: 'horizontal' } });

    const tabs = screen.getAllByRole('tab');
    tabs[1].focus();
    expect(tabs[1]).toHaveFocus();

    await userEvent.keyboard('{arrowleft}');

    expect(tabs[0]).toHaveFocus();
  });

  test('arrow left moves focus to last tab when at start when direction is horizontal', async () => {
    render(BaksTabs, { props: { ...defaultProps, direction: 'horizontal' } });

    const tabs = screen.getAllByRole('tab');
    tabs[0].focus();
    expect(tabs[0]).toHaveFocus();

    await userEvent.keyboard('{arrowleft}');

    expect(tabs[tabs.length - 1]).toHaveFocus();
  });

  test('arrow down moves focus to next tab when direction is vertical', async () => {
    render(BaksTabs, { props: { ...defaultProps, direction: 'vertical' } });

    const tabs = screen.getAllByRole('tab');
    tabs[0].focus();
    expect(tabs[0]).toHaveFocus();

    await userEvent.keyboard('{arrowdown}');

    expect(tabs[1]).toHaveFocus();
  });

  test('arrow down moves focus to first tab when at end when direction is vertical', async () => {
    render(BaksTabs, { props: { ...defaultProps, direction: 'vertical' } });

    const tabs = screen.getAllByRole('tab');
    tabs[tabs.length - 1].focus();
    expect(tabs[tabs.length - 1]).toHaveFocus();

    await userEvent.keyboard('{arrowdown}');

    expect(tabs[0]).toHaveFocus();
  });

  test('arrow up moves focus to previous tab when direction is vertical', async () => {
    render(BaksTabs, { props: { ...defaultProps, direction: 'vertical' } });

    const tabs = screen.getAllByRole('tab');
    tabs[1].focus();
    expect(tabs[1]).toHaveFocus();

    await userEvent.keyboard('{arrowup}');

    expect(tabs[0]).toHaveFocus();
  });

  test('arrow up moves focus to last tab when at start when direction is vertical', async () => {
    render(BaksTabs, { props: { ...defaultProps, direction: 'vertical' } });

    const tabs = screen.getAllByRole('tab');
    tabs[0].focus();
    expect(tabs[0]).toHaveFocus();

    await userEvent.keyboard('{arrowup}');

    expect(tabs[tabs.length - 1]).toHaveFocus();
  });
});
