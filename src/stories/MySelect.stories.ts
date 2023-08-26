import { type Meta, type StoryObj } from '@storybook/vue3';

import MySelect from '@/components/MySelect';
import { ref } from 'vue';

const meta: Meta<typeof MySelect> = {
  title: 'Components/MySelect',
  tags: ['autodocs'],
  decorators: [
    () => ({
      template:
        '<div style="width: 100%; max-width: 400px; margin: 0 0 16rem 0;"><story /></div>',
    }),
  ],
  parameters: { controls: { sort: 'alpha' } },
  // Well, it looks like storybook types doesn't apply to generic components. When they will, there shouldn't be error anymore
  // @ts-expect-error
  component: MySelect,
  argTypes: {
    modelValue: {
      control: false,
      description:
        'This is v-model value of the select. It is of generic T type.',
    },
    items: {
      control: false,
      description:
        "This is an array of strings, booleans, numbers or objects. When utilizing objects, the component will require both 'itemValue' and 'itemTitle'. It is required and is of generic type: T extends string | number | boolean | object.",
    },
    itemValue: {
      description:
        "This refers to the property name of an object, which will later be used as the value within that object. It is of conditional type, that is 'keyof T' (if T type extends object) or 'never' (if T doesn't extend object)",
    },
    itemTitle: {
      description:
        "This refers to the property name of an object, which will later be used as the title for that object. It is of conditional type, that is 'keyof T' (if T type extends object) or 'never' (if T doesn't extend object)",
    },
    selectedFontSize: {
      control: {
        type: 'range',
        min: 10,
        max: 30,
        step: 1,
      },
      description:
        "This represents the font size value for the selected item. It is of number type and a default value of 18. The component also inlcudes a template named 'selected', allowing you to adjust e.g. the font size using media queries",
    },
    optionsFontSize: {
      control: {
        type: 'range',
        min: 10,
        max: 30,
        step: 1,
      },
      description:
        "This represents the font size value for the items in select options. It is of number type and a default value of 16. The component also inlcudes a template named 'option', allowing you to adjust e.g. the font size using media queries",
    },
    maxOptionItems: {
      control: {
        type: 'range',
        min: 1,
        max: 8,
        step: 1,
      },
      description:
        "This value determines the number of visible items when you open the select options. It is correlated with 'optionsFontSize' parameter. It is of number type with a default value of 5.",
    },
    clearable: {
      control: 'boolean',
      description:
        'Enables clear icon on the right side. allowing the selected value to be cleared. It is of boolean type.',
    },
    disabled: {
      control: 'boolean',
      description:
        'This value disables the select. It is of boolean type',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MySelect>;

export const DefaultStory: Story = {
  name: 'Default',
  // Same as above
  // @ts-expect-error
  render: (args) => ({
    components: { MySelect },
    setup() {
      // @ts-expect-error
      const items = args.items;
      const modelValue = ref(items[0]);
      return { args, modelValue };
    },
    template: `
      <MySelect 
        v-model="modelValue"
        :items="args.items"
        :itemTitle="args.itemTitle"
        :itemValue="args.itemValue"
        :selectedFontSize="args['selectedFontSize']"
        :optionsFontSize="args['optionsFontSize']" 
        :maxOptionItems="args['maxOptionItems']"
        :clearable="args.clearable"
        :disabled="args.disabled"
      />`,
  }),
  argTypes: {
    itemValue: { control: false },
    itemTitle: { control: false },
  },
  args: {
    items: [1, 2, 3, 4, 5, 6, 7, 8],
    selectedFontSize: 18,
    optionsFontSize: 16,
    maxOptionItems: 5,
    clearable: false,
    disabled: false,
  },
};

export const ObjectItemsStory: Story = {
  name: 'Object Items',
  render: DefaultStory.render,
  argTypes: {
    modelValue: { table: { disable: true } },
    items: { table: { disable: true } },
    itemTitle: {
      control: 'select',
      options: [undefined, 'string', 'number', 'bool'],
    },
    itemValue: {
      control: 'select',
      options: [undefined, 'string', 'number', 'bool'],
    },
  },
  args: {
    ...DefaultStory.args,
    items: [
      { string: 'one', number: 1, bool: true },
      { string: 'two', number: 2, bool: false },
      { string: 'three', number: 3, bool: true },
    ],
  },
};

export const StringItemsStory: Story = {
  name: 'String Items',
  render: DefaultStory.render,
  argTypes: {
    ...ObjectItemsStory.argTypes,
    itemTitle: { table: { disable: true } },
    itemValue: { table: { disable: true } },
  },
  args: {
    ...DefaultStory.args,
    items: ['one', 'two', 'three'],
  },
};

export const BooleanItemsStory: Story = {
  name: 'Boolean Items',
  render: DefaultStory.render,
  argTypes: StringItemsStory.argTypes,
  args: {
    ...DefaultStory.args,
    items: [true, false, false, true, false],
  },
};
