import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';

import MyCheckbox from '@/components/MyCheckbox';
import { colors } from '@/assets/colors/colors';

const meta: Meta<typeof MyCheckbox> = {
  title: 'Components/Checkbox',
  tags: ['autodocs'],
  parameters: { controls: { sort: 'alpha' } },
  component: MyCheckbox,
  argTypes: {
    modelValue: {
      control: false,
      description:
        'This is v-model value of the checkbox. It is required and is of a type of boolean | undefined. Undefined is treated like false value.',
    },
    indeterminate: {
      control: 'boolean',
      description:
        'It sets an indeterminated state for the checkbox, which is represented by a special icon. It is of boolean type. It works only when v-model is undefined.',
    },
    color: {
      control: 'color',
      description:
        'This value changes color of checkbox icon when it is active. It is of string type, however to work correctly it should be either the hex value of color or a custom color name that is available in the selection within the "Color Select" story',
    },
    disabled: {
      control: 'boolean',
      description:
        'This value disables the checkbox. It is of boolean type.',
    },
    readonly: {
      control: 'boolean',
      description:
        'This value sets the readonly state for the checkbox. It is of boolean type.',
    },
  },
  args: {
    modelValue: undefined,
    indeterminate: false,
    disabled: false,
    readonly: false,
  },
};

export default meta;
type Story = StoryObj<typeof MyCheckbox>;

export const DefaultStory: Story = {
  name: 'Default',
  render: (args) => ({
    components: { MyCheckbox },
    setup() {
      const model = ref(args.modelValue);
      return { args, model };
    },
    template: `
      <MyCheckbox
        v-model="model"
        :indeterminate="args.indeterminate"
        :color="args.color"
        :disabled="args.disabled"
        :readonly="args.readonly"
      />`,
  }),
};

export const VModelAlwaysUndefinedStory: Story = {
  name: 'V-Model Undefined',
  render: (args) => ({
    components: { MyCheckbox },
    setup() {
      const model = ref(args.modelValue);
      return { args, model };
    },
    template: `
      <MyCheckbox
        :model-value="model"
        :indeterminate="args.indeterminate"
        :color="args.color"
        :disabled="args.disabled"
        :readonly="args.readonly"
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
    color: 'blue-400',
  },
};
