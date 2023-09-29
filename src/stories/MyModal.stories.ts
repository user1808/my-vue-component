import MyModal from '@/components/MyModal/MyModal.vue';
import MyButton from '@/components/MyButton/MyButton.vue';
import { type Meta, type StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { colors } from '@/assets/colors/colors';

const meta: Meta<typeof MyModal> = {
  title: 'Components/MyModal',
  tags: ['autodocs'],
  parameters: { controls: { sort: 'alpha' } },
  component: MyModal,
  argTypes: {
    modelValue: {
      control: 'boolean',
      description:
        'This prop controls the visibility of the modal. It is of boolean type, indicating whether the modal is currently displayed (true) or hidden (false). It is required.',
    },
    title: {
      control: 'text',
      description:
        'The title of the modal dialog. It is of string type and provides a title for the modal.',
    },
    hideTitle: {
      control: 'boolean',
      description:
        'If set to true, it hides the title bar of the modal dialog. It is of boolean type. Default value is false.',
    },
    hideCloseIcon: {
      control: 'boolean',
      description:
        'If set to true, it hides the close icon/button in the modal header. It is of boolean type. Default value is false.',
    },
    maxWidth: {
      control: 'number',
      description:
        'The maximum width of the modal dialog. It is of number type and allows you to limit the maximum width (in pixels) of the modal content. Default value is set in CSS and equals 42rem.',
    },
    minWidth: {
      control: 'number',
      description:
        'The minimum width of the modal dialog. It is of number type and allows you to set a minimum width (in pixels) for the modal content. Default value is set in CSS and equals 8rem.',
    },
    width: {
      control: 'number',
      description:
        'The width of the modal dialog. It is of number type and specifies the width (in pixels) of the modal content.',
    },
    maxHeight: {
      control: 'number',
      description:
        'The maximum height of the modal dialog. It is of number type and allows you to limit the maximum height (in pixels) of the modal content. Default value is set in CSS and equals 100vh - 8rem.',
    },
    minHeight: {
      control: 'number',
      description:
        'The minimum height of the modal dialog. It is of number type and allows you to set a minimum height (in pixels) for the modal content. Default value is set in CSS and equals 8rem.',
    },
    height: {
      control: 'number',
      description:
        'The height of the modal dialog. It is of number type and specifies the height (in pixels) of the modal content.',
    },
    resizable: {
      control: 'boolean',
      description:
        'If set to true, it allows the modal to be resized by the user. It is of boolean type. Default value is false.',
    },
    stayOpened: {
      control: 'boolean',
      description:
        'If set to true, the modal remains open even after the user clicks outside or presses the Escape key. It is of boolean type. Default value is false.',
    },
    bgColor: {
      control: 'color',
      description:
        'The background color of the modal dialog. It is of string type and should be either the hex value of a color or a custom color name.',
    },
    color: {
      control: 'color',
      description:
        'The text color of the modal content. It is of string type and should be either the hex value of a color or a custom color name.',
    },
    onModalClosed: {
      description:
        'Event emitted when the modal is closed. This event is fired after the closing animation completes.',
    },
    onModalOpened: {
      description:
        'Event emitted when the modal is fully opened. This event is fired after the opening animation completes.',
    },
    'modal-title': {
      description: 'Slot for modal title',
    },
    'modal-footer': {
      description: 'Slot for modal footer',
    },
    default: {
      description: 'Slot for modal content',
    },
  },
  args: {
    modelValue: false,
    title: 'Modal Story',
    hideTitle: false,
    hideCloseIcon: false,
    maxWidth: undefined,
    minWidth: undefined,
    width: undefined,
    maxHeight: undefined,
    minHeight: undefined,
    height: undefined,
    resizable: false,
    stayOpened: false,
    bgColor: undefined,
    color: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof MyModal>;

export const DefaultStory: Story = {
  name: 'Default',
  render: (args) => ({
    components: { MyModal, MyButton },
    setup() {
      const model = ref(args.modelValue);
      const openModal = () => {
        model.value = !model.value;
      };
      return { args, model, openModal };
    },
    template: `
      <div>
        <MyButton @click="openModal">
          MyModal
        </MyButton>
        <MyModal
          v-model="model" 
          :title="args.title"
          :hide-title="args.hideTitle"
          :hide-close-icon="args.hideCloseIcon"
          :max-width="args.maxWidth"
          :min-width="args.minWidth"
          :width="args.width"
          :max-height="args.maxHeight"
          :min-height="args.minHeight"
          :height="args.height"
          :resizable="args.resizable"
          :stay-opened="args.stayOpened"
          :bg-color="args.bgColor"
          :color="args.color"
        >
          Content Slot
          <template #modal-footer>
            Footer Slot
          </template>
        </MyModal>
      <div>
    `,
  }),
};

export const ConfigureHeaderStory: Story = {
  name: 'Configurable Modal Header',
  render: DefaultStory.render,
  argTypes: {
    modelValue: { table: { disable: true } },
    maxWidth: { table: { disable: true } },
    minWidth: { table: { disable: true } },
    width: { table: { disable: true } },
    maxHeight: { table: { disable: true } },
    minHeight: { table: { disable: true } },
    height: { table: { disable: true } },
    resizable: { table: { disable: true } },
    stayOpened: { table: { disable: true } },
    bgColor: { table: { disable: true } },
    color: { table: { disable: true } },
    'modal-footer': { table: { disable: true } },
    'modal-title': { table: { disable: true } },
    default: { table: { disable: true } },
  },
};

export const SizesStory: Story = {
  name: 'Configurable Sizes',
  render: DefaultStory.render,
  argTypes: {
    ...ConfigureHeaderStory.argTypes,
    title: { table: { disable: true } },
    hideTitle: { table: { disable: true } },
    hideCloseIcon: { table: { disable: true } },
    maxWidth: { control: 'number' },
    minWidth: { control: 'number' },
    width: { control: 'number' },
    maxHeight: { control: 'number' },
    minHeight: { control: 'number' },
    height: { control: 'number' },
  },
  args: {
    maxWidth: 600,
    minWidth: 200,
    width: 400,
    maxHeight: 500,
    minHeight: 100,
    height: 200,
  },
};

export const ResizableStory: Story = {
  name: 'Resizable Modal',
  render: DefaultStory.render,
  argTypes: {
    ...SizesStory.argTypes,
    resizable: { control: 'boolean' },
  },
  args: {
    ...SizesStory.args,
    resizable: true,
  },
};

export const StayOpenedStory: Story = {
  name: 'Stay Opened Modal',
  render: DefaultStory.render,
  argTypes: {
    ...ConfigureHeaderStory.argTypes,
    title: { table: { disable: true } },
    hideTitle: { table: { disable: true } },
    hideCloseIcon: { table: { disable: true } },
    stayOpened: { control: 'boolean' },
  },
};

export const SlotsStory: Story = {
  name: 'Modal Slots',
  render: (args) => ({
    components: { MyModal, MyButton },
    setup() {
      const model = ref(args.modelValue);
      const openModal = () => {
        model.value = !model.value;
      };
      return { args, model, openModal };
    },
    template: `
      <div>
        <MyButton @click="openModal">
          MyModal
        </MyButton>
        <MyModal
          v-model="model" 
        >
          <template #modal-title>
            <div v-if="args['modal-title']" v-html="args['modal-title']" />
          </template>
          <template #default>
            <div v-if="args.default" v-html="args.default" />
          </template>
          <template #modal-footer>
            <div v-if="args['modal-footer']" v-html="args['modal-footer']" />
          </template>
        </MyModal>
      <div>
    `,
  }),
  argTypes: {
    ...ConfigureHeaderStory.argTypes,
    title: { table: { disable: true } },
    hideTitle: { table: { disable: true } },
    hideCloseIcon: { table: { disable: true } },
    default: { control: 'text' },
    'modal-footer': { control: 'text' },
    'modal-title': { control: 'text' },
  },
  args: {
    default:
      '<span style="color: red">Example red color content</span>',
    'modal-footer':
      '<span style="color: blue">Example blue footer</span>',
    'modal-title':
      '<span style="color: green">Example green title</span>',
  },
};

export const ColorStory: Story = {
  name: 'Color Select',
  render: DefaultStory.render,
  argTypes: {
    ...SlotsStory.argTypes,
    default: { table: { disable: true } },
    'modal-footer': { table: { disable: true } },
    'modal-title': { table: { disable: true } },
    bgColor: {
      options: Object.keys(colors),
      mapping: colors,
      control: { type: 'select' },
    },
    color: {
      options: Object.keys(colors),
      mapping: colors,
      control: { type: 'select' },
    },
  },
  args: {
    bgColor: 'grey-400',
    color: 'white',
  },
};
