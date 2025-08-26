import type { Preview } from '@storybook/vue3-vite';

import '../app.css';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    docs: {
      canvas: {
        sourceState: 'shown'
      },
      codePanel: true
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;
