import type { Meta, StoryObj } from '@storybook/vue3';

import MyButton from '@/components/MyButton';

const meta: Meta<typeof MyButton> = {
  title: 'Components/MyButton',
  tags: ['autodocs'],
  parameters: { controls: { sort: 'alpha' } },
  component: MyButton,
  argTypes: {
    flat: {
      control: 'boolean',
      description:
        'This is a boolean value that controls whether the button displays box shadows. Default value is false.',
    },
    withoutHoverColor: {
      control: 'boolean',
      description:
        "This is a boolean value that controls whether the button doesn't change its background color on hover. Default value is false.",
    },
    contentHoverOpacity: {
      control: 'boolean',
      description:
        'This is a boolean value that determines whether the button content will have reduced opacity, which returns to normal on hover. Default value is false.',
    },
    outlined: {
      control: 'boolean',
      description:
        'This is a boolean value that controls whether the button have black border. Default value is false.',
    },
    ripple: {
      control: 'boolean',
      description:
        'This is a boolean value that controls whether the button have ripple effect. Default value is true.',
    },
    disabled: {
      control: 'boolean',
      description:
        'This is a boolean value that controls whether the button is in a disabled state. Default value is false.',
    },
    bgColor: {
      control: 'color',
      description:
        'This value changes color of button background. It is of string type, however to work correctly it should be either the hex value of color or a custom color name that is available in the selection within the "Color Select" story',
    },
    color: {
      control: 'color',
      description:
        'This value changes color of button content (text). It is of string type, however to work correctly it should be either the hex value of color or a custom color name that is available in the selection within the "Color Select" story',
    },
    default: {
      description:
        'Slot for button content. It can be either text or some html element.',
    },
  },
  args: {
    flat: false,
    withoutHoverColor: false,
    contentHoverOpacity: false,
    outlined: false,
    ripple: true,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof MyButton>;

export const DefaultStory: Story = {
  name: 'Default',
  render: (args) => ({
    components: { MyButton },
    setup() {
      return { args };
    },
    template: `
      <MyButton
        :flat="args.flat"
        :without-hover-color="args.withoutHoverColor"
        :content-hover-opacity="args.contentHoverOpacity"
        :outlined="args.outlined"
        :disabled="args.disabled"
        :bg-color="args.bgColor"
        :color="args.color"
      />`,
  }),
};
