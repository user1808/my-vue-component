import type { Preview } from '@storybook/vue3';

import '../src/assets/main.scss'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="display: flex; justify-content: center;"><story /></div>'
    })
  ]
};

export default preview;
