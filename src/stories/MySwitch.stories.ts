import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';

import MySwitch from '../components/MySwitch';
import { colors } from '@/assets/colors/colors';

const meta: Meta<typeof MySwitch> = {
  title: 'Components/MySwitch',
  tags: ['autodocs'],
  parameters: { controls: { sort: 'alpha' } },
  component: MySwitch,
  argTypes: {
    modelValue: {
      control: false,
      description:
        'This is v-model value of the switch. It is required and is a type of boolean | undefined. Undefined is treated like false value.',
    },
    indeterminate: {
      control: 'boolean',
      description:
        'It sets an indeterminated state for the switch. It is of boolean type. It works only when v-model is undefined.',
    },
    color: {
      control: 'color',
      description:
        'This value changes color of switch track when it is active. It is of string type, however to work correctly it should be either the hex value of color or a custom color name that is available in the selection within the "Color Select" story',
    },
    disabled: {
      control: 'boolean',
      description:
        'This value disables the switch. It is of boolean type.',
    },
    readonly: {
      control: 'boolean',
      description:
        'This value sets the readonly state for the checkbox. It is of boolean type.',
    },
    inset: {
      control: 'boolean',
      description:
        'This value changes style of switch, placing the thumb inside the track. It is of boolean type.',
    },
  },
  args: {
    modelValue: undefined,
    indeterminate: false,
    disabled: false,
    readonly: false,
    inset: false,
  },
};

export default meta;
type Story = StoryObj<typeof MySwitch>;

export const DefaultStory: Story = {
  name: 'Default',
  render: (args) => ({
    components: { MySwitch },
    setup() {
      const model = ref(args.modelValue);
      return { args, model };
    },
    template: `
      <MySwitch 
        v-model="model"
        :indeterminate="args.indeterminate"
        :color="args.color"  
        :disabled="args.disabled"
        :readonly="args.readonly"
        :inset="args.inset"
      />`,
  }),
};

export const VModelAlwaysUndefinedStory: Story = {
  name: 'V-Model Undefined',
  render: (args) => ({
    components: { MySwitch },
    setup() {
      const model = ref(args.modelValue);
      return { args, model };
    },
    template: `
      <MySwitch 
        :model-value="model"
        :indeterminate="args.indeterminate"
        :color="args.color"  
        :disabled="args.disabled"
        :readonly="args.readonly"
        :inset="args.inset"
      />`,
  }),
  argTypes: {
    modelValue: { table: { disable: true } },
  },
  args: DefaultStory.args,
};

export const ColorSelectStory: Story = {
  name: 'Color Select',
  render: DefaultStory.render,
  argTypes: {
    ...VModelAlwaysUndefinedStory.argTypes,
    indeterminate: { table: { disable: true } },
    color: {
      options: Object.keys(colors),
      mapping: colors,
      control: { type: 'select' },
    },
  },
  args: {
    ...DefaultStory.args,
    modelValue: true,
    color: 'red-500',
  },
};
