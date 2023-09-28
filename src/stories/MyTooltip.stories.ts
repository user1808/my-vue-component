import MyTooltip from '@/components/MyTooltip';
import MyButton from '@/components/MyButton';
import type { Meta, StoryObj } from '@storybook/vue3';
import MyIcon from '@/components/MyIcon';

const meta: Meta<typeof MyTooltip> = {
  title: 'Components/MyTooltip',
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: '<div style="padding: 4rem 0"><story /></div>',
    }),
  ],
  parameters: { controls: { sort: 'alpha' } },
  component: MyTooltip,
  argTypes: {
    primaryPosition: {
      options: ['top', 'right', 'bottom', 'left'],
      control: { type: 'radio' },
      description:
        'Determines where the tooltip appears relative to the target point of view.',
    },
    secondaryPosition: {
      options: ['center', 'right', 'left', 'top', 'bottom'],
      control: { type: 'radio' },
      description:
        'Specifies the sliding direction of the tooltip concerning the primary position.',
    },
    hideArrow: {
      control: 'boolean',
      description: 'Controls whether to display the tooltip arrow.',
    },
    text: {
      control: 'text',
      description:
        'Sets the text content to display inside the tooltip (when not using the default slot).',
    },
    alwaysShow: {
      control: 'boolean',
      description:
        'Determines whether the tooltip is always visible or only appears on hover over the target element.',
    },
    maxHeight: {
      control: 'text',
      description:
        "Specifies the maximum height of the tooltip, either as a string (e.g., '120px') or a number (e.g., '30' -> '30px').",
    },
    maxWidth: {
      control: 'text',
      description:
        'Similar to maxHeight, but controls the maximum width of the tooltip.',
    },
    width: {
      control: 'text',
      description:
        'Similar to maxWidth and maxHeight, but specifically sets the width of the tooltip.',
    },
    height: {
      control: 'text',
      description:
        'Similar to width, but specifically sets the height of the tooltip.',
    },
    disabled: {
      control: 'boolean',
      description:
        'Controls whether the tooltip is disabled. If disabled, it will not appear.',
    },
    default: {
      description: 'Slot for the tooltip target element.',
    },
    'tooltip-content': {
      description: 'Slot for custom content inside the tooltip.',
    },
  },
  args: {
    primaryPosition: 'top',
    secondaryPosition: 'center',
    hideArrow: false,
    text: 'Tooltip',
    alwaysShow: false,
    maxHeight: '',
    maxWidth: '',
    width: '',
    height: '',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof MyTooltip>;

export const DefaultStory: Story = {
  name: 'Default',
  render: (args) => ({
    components: { MyTooltip, MyButton },
    setup() {
      return { args };
    },
    template: `
      <MyTooltip 
        :primary-position="args.primaryPosition"
        :secondary-position="args.secondaryPosition"
        :hide-arrow="args.hideArrow"
        :text="args.text"
        :always-show="args.alwaysShow"
        :max-height="args.maxHeight"
        :max-width="args.maxWidth"
        :width="args.width"
        :height="args.height"
        :disabled="args.disabled"
      >
        <MyButton>
          Hover Me
        </MyButton>
      </MyTooltip>
    `,
  }),
};

export const DifferentPositionsStory: Story = {
  name: 'Different Positions',
  render: DefaultStory.render,
  argTypes: {
    hideArrow: { table: { disable: true } },
    text: { table: { disable: true } },
    alwaysShow: { table: { disable: true } },
    maxHeight: { table: { disable: true } },
    maxWidth: { table: { disable: true } },
    width: { table: { disable: true } },
    height: { table: { disable: true } },
    disabled: { table: { disable: true } },
    default: { table: { disable: true } },
    'tooltip-content': { table: { disable: true } },
  },
  args: {
    primaryPosition: 'right',
    secondaryPosition: 'bottom',
  },
};

export const StringSizePropsStory: Story = {
  name: 'String Size Props',
  render: DefaultStory.render,
  argTypes: {
    ...DifferentPositionsStory.argTypes,
    primaryPosition: { table: { disable: true } },
    secondaryPosition: { table: { disable: true } },
    maxHeight: { control: 'text' },
    maxWidth: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
  },
};

export const NumberSizePropsStory: Story = {
  name: 'String Size Props',
  render: DefaultStory.render,
  argTypes: {
    ...DifferentPositionsStory.argTypes,
    primaryPosition: { table: { disable: true } },
    secondaryPosition: { table: { disable: true } },
    maxHeight: { control: 'number' },
    maxWidth: { control: 'number' },
    width: { control: 'number' },
    height: { control: 'number' },
  },
};

export const TooltipContentSlotStory: Story = {
  name: 'Tooltip Content Slot',
  render: (args) => ({
    components: { MyButton, MyTooltip, MyIcon },
    setup() {
      return { args };
    },
    template: `
      <MyTooltip v-bind="args">
        <template #tooltip-content>
          <div v-if="args['tooltip-content']" v-html="args['tooltip-content']" />
        </template>
        <MyButton>
          Slot Tooltip
        </MyButton>
      </MyTooltip>
    `,
  }),
  argTypes: {
    ...DifferentPositionsStory.argTypes,
    primaryPosition: { table: { disable: true } },
    secondaryPosition: { table: { disable: true } },
    'tooltip-content': { control: 'text' },
  },
  args: {
    'tooltip-content':
      '<span>Tooltip Content (You can provide here e.g. MyIcon)</span>',
    primaryPosition: 'bottom',
    maxHeight: '250px',
    maxWidth: '200px',
  },
};
