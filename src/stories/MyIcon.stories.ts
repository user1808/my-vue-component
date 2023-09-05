import { type Meta, type StoryObj } from '@storybook/vue3';

import MyIcon from '@/components/MyIcon/MyIcon.vue';
import { colors } from '@/assets/colors/colors';

const meta: Meta<typeof MyIcon> = {
  title: 'Components/MyIcon',
  tags: ['autodocs'],
  parameters: { controls: { sort: 'alpha' } },
  component: MyIcon,
  argTypes: {
    library: {
      options: ['material-symbols', 'ic', 'heroicons', 'ph'],
      control: 'select',
      description:
        "This refers to the library name from which the icon will be sourced. It is of string type with a default value of 'material-symbols'. Icons are sources from https://icones.js.org/. When selecting icons, the library name is the prefix of the icon name before the colon.",
    },
    name: {
      control: 'text',
      description:
        'This refers to the icon name you intend to use. It is of string type. Icons are sourced from https://icones.js.org/. When selecting icons from a library, this corresponds to the second part of the icon name, occurring after the colon.',
    },
    color: {
      control: 'color',
      description:
        "This value determines the color of the icon. It is of string type. For proper functionality, it should either be the hex value of a color or a custom color name available in the selection within the 'Color Select' story.",
    },
  },
  args: {
    library: 'material-symbols',
    name: 'icecream-rounded',
  },
};

export default meta;
type Story = StoryObj<typeof MyIcon>;

export const DefaultStory: Story = {
  name: 'Default',
  render: (args) => ({
    components: { MyIcon },
    setup() {
      return { args };
    },
    template: `
      <MyIcon
        :library="args.library"
        :name="args.name"
        :color="args.color"
      />`,
  }),
};

export const ColorSelectStory: Story = {
  name: 'Color Select',
  render: DefaultStory.render,
  argTypes: {
    ...DefaultStory.argTypes,
    color: {
      options: Object.keys(colors),
      mapping: colors,
      control: { type: 'select' },
    },
  },
  args: {
    ...DefaultStory.args,
    color: 'red-500',
  },
};
