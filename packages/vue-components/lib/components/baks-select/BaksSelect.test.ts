import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import BaksSelect from './BaksSelect.vue';
import { defineComponent, ref } from 'vue'; // Used in v-model test
import type { ThemeVariant } from 'baks-components-styles';

// Mock the isClippingOutside utility
vi.mock('@/lib/isClippingOutside', () => ({
  isClippingOutside: vi.fn(() => ({
    isOutside: false,
    isClippingTop: false,
    isClippingBottom: false,
    isClippingRight: false,
    sides: { top: 0, bottom: 0, left: 0, right: 0 }
  }))
}));

// Mock the styles module
vi.mock('baks-components-styles', () => ({
  resolveVariant: vi.fn((variant: string) => `variant-${variant}`)
}));

const defaultOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
];

const defaultProps = {
  id: 'test-select',
  'aria-labelledby': 'test-label',
  name: 'test-select',
  variant: 'primary' as ThemeVariant,
  options: defaultOptions,
  selectLabel: 'Choose an option'
};

describe('BaksSelect', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  test('renders with default props', () => {
    render(BaksSelect, { props: defaultProps });
    // By default, selectLabel is shown
    expect(screen.getByText('Choose an option')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  test('shows select label when selectLabel is provided', () => {
    render(BaksSelect, {
      props: {
        ...defaultProps,
        selectLabel: 'Choose an option'
      }
    });
    expect(screen.getByText('Choose an option')).toBeInTheDocument();
  });

  test('opens dropdown when clicked', async () => {
    render(BaksSelect, { props: defaultProps });
    const selectElement = screen.getByRole('combobox');
    await user.click(selectElement);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  test('selects option when clicked', async () => {
    render(BaksSelect, { props: { ...defaultProps, modelValue: 'option1' } });
    const selectElement = screen.getByRole('combobox');
    await user.click(selectElement);
    const option2List = screen.getAllByText('Option 2');
    const option2 = option2List[option2List.length - 1];
    expect(option2).toBeTruthy();
    await user.click(option2);
    await waitFor(() => {
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
  test('closes dropdown when option is selected', async () => {
    render(BaksSelect, { props: defaultProps });

    const selectElement = screen.getByRole('combobox');
    await user.click(selectElement);

    expect(screen.getByRole('listbox')).toBeInTheDocument();

    const option2 = screen.getAllByText('Option 2')[1];
    await user.click(option2);

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('navigates options with arrow keys', async () => {
    render(BaksSelect, { props: defaultProps });

    const selectElement = screen.getByRole('combobox');
    selectElement.focus();

    // Open dropdown with ArrowDown
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    // Navigate down
    await user.keyboard('{ArrowDown}');
    const highlightedOption = screen.getByRole('option', { name: /Option 2/i });
    expect(highlightedOption).toHaveClass('is-highlighted');

    // Navigate up
    await user.keyboard('{ArrowUp}');
    const firstOption = screen.getByRole('option', { name: /Option 1/i });
    expect(firstOption).toHaveClass('is-highlighted');
  });

  test('selects highlighted option with Enter key', async () => {
    render(BaksSelect, { props: defaultProps });
    const selectElement = screen.getByRole('combobox');
    selectElement.focus();
    await user.keyboard('{ArrowDown}'); // Open dropdown
    await user.keyboard('{ArrowDown}'); // Navigate to Option 2
    await user.keyboard('{Enter}'); // Select Option 2
    await waitFor(() => {
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('closes dropdown with Escape key', async () => {
    render(BaksSelect, { props: defaultProps });

    const selectElement = screen.getByRole('combobox');
    await user.click(selectElement);

    expect(screen.getByRole('listbox')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('searches options by typing', async () => {
    const options = [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'cherry', label: 'Cherry' }
    ];

    render(BaksSelect, {
      props: {
        ...defaultProps,
        options
      }
    });

    const selectElement = screen.getByRole('combobox');
    selectElement.focus();

    await user.keyboard('{ArrowDown}'); // Open dropdown
    await user.keyboard('b'); // Search for 'b'

    const bananaOption = screen.getByRole('option', { name: /Banana/i });
    expect(bananaOption).toHaveClass('is-highlighted');
  });

  test('handles disabled state', async () => {
    render(BaksSelect, {
      props: defaultProps,
      attrs: { disabled: true }
    });

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveAttribute('aria-disabled', 'true');
    expect(selectElement).toHaveClass('disabled');

    await user.click(selectElement);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('shows checkmark for selected option', async () => {
    render(BaksSelect, {
      props: { ...defaultProps, selectLabel: 'Select', modelValue: 'option1' }
    });
    const selectElement = screen.getByRole('combobox');
    await user.click(selectElement);
    // First option should be selected by default and show checkmark
    const firstOptionRow = screen.getByRole('option', { name: /Option 1/i });
    expect(firstOptionRow.querySelector('.checkmark-icon-wrapper svg')).not.toBeNull();
  });

  test('updates selected option with v-model', async () => {
    const TestWrapper = defineComponent({
      components: { BaksSelect },
      setup() {
        const selected = ref('option1');
        return { selected, options: defaultOptions };
      },
      template: `
        <label for="test-select" id="test-select-label">Test Select</label>
        <BaksSelect v-model="selected" :options="options" name="test-select" variant="primary" selectLabel="Choose an option"
          aria-labelledby="test-select-label" />
        <span data-testid="selected">{{ selected }}</span>
      `
    });
    const result = render(TestWrapper);
    expect(result.getByTestId('selected')).toHaveTextContent('option1');
    await user.click(result.getByRole('combobox'));
    const option3List = result.getAllByText('Option 3');
    const option3 = option3List[option3List.length - 1];
    expect(option3).toBeTruthy();
    await user.click(option3);
    await new Promise((r) => setTimeout(r, 10));
    expect(result.getByTestId('selected')).toHaveTextContent('option3');
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  test('handles mouse hover on options', async () => {
    render(BaksSelect, { props: defaultProps });

    const selectElement = screen.getByRole('combobox');
    await user.click(selectElement);

    const option2 = screen.getByRole('option', { name: /Option 2/i });
    await user.hover(option2);

    expect(option2).toHaveClass('is-highlighted');
  });

  test('closes dropdown on Tab key and selects highlighted option', async () => {
    render(BaksSelect, { props: defaultProps });
    const selectElement = screen.getByRole('combobox');
    selectElement.focus();
    await user.keyboard('{ArrowDown}'); // Open dropdown
    await user.keyboard('{ArrowDown}'); // Navigate to Option 2
    await user.keyboard('{Tab}'); // Tab should close and select

    await waitFor(() => {
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });
  });

  test('applies correct ARIA attributes', async () => {
    const options = [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'cherry', label: 'Cherry' }
    ];

    const props = { ...defaultProps, options, modelValue: 'apple' };
    render(BaksSelect, { props });

    const selectElement = screen.getByRole('combobox');

    expect(selectElement).toHaveAttribute('aria-label', defaultProps.selectLabel);
    expect(selectElement).toHaveAttribute('aria-expanded', 'false');
    expect(selectElement).toHaveAttribute('aria-haspopup', 'listbox');
    expect(selectElement).toHaveAttribute('aria-controls');

    await user.click(selectElement);

    expect(selectElement).toHaveAttribute('aria-expanded', 'true');

    const listbox = screen.getByRole('listbox');
    expect(listbox).toHaveAttribute('id');

    const optionsElements = screen.getAllByRole('option');
    const option = optionsElements.find((option) => {
      return option.textContent === 'Apple';
    });
    if (!option) {
      throw new Error('Option "Apple" not found');
    }
    expect(option).toHaveAttribute('aria-selected', 'true');
    expect(selectElement).toHaveAttribute('aria-activedescendant', option.id);
  });

  test('handles buffer search timeout', async () => {
    const options = [
      { value: 'apple', label: 'Apple' },
      { value: 'apricot', label: 'Apricot' },
      { value: 'banana', label: 'Banana' }
    ];
    render(BaksSelect, {
      props: {
        ...defaultProps,
        options
      }
    });
    const selectElement = screen.getByRole('combobox');
    selectElement.focus();
    await user.keyboard('{ArrowDown}'); // Open dropdown
    await user.keyboard('a'); // Search for 'a'
    await waitFor(() => {
      expect(screen.getByRole('option', { name: /Apple/i })).toHaveClass('is-highlighted');
    });
    await user.keyboard('p'); // Continue typing 'ap'
    await user.keyboard('r'); // Continue typing 'ap'
    await waitFor(() => {
      expect(screen.getByRole('option', { name: /Apricot/i })).toHaveClass('is-highlighted');
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));
    await user.keyboard('b');
    await waitFor(() => {
      expect(screen.getByRole('option', { name: /Banana/i })).toHaveClass('is-highlighted');
    });
  });
});
