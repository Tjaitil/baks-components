import type { Preview } from '@storybook/web-components-vite';

import './style.css';

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
