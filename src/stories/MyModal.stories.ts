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
        'The maximum width of the central modal dialog. It is of number type and allows you to limit the maximum width (in pixels) of the modal content. Default value is set in CSS and equals 42rem.',
    },
    minWidth: {
      control: 'number',
      description:
        'The minimum width of the central modal dialog. It is of number type and allows you to set a minimum width (in pixels) for the modal content. Default value is set in CSS and equals 8rem.',
    },
    width: {
      control: 'number',
      description:
        'The width of the central modal dialog. It is of number type and specifies the width (in pixels) of the modal content.',
    },
    maxHeight: {
      control: 'number',
      description:
        'The maximum height of the central modal dialog. It is of number type and allows you to limit the maximum height (in pixels) of the modal content. Default value is set in CSS and equals 100vh - 8rem.',
    },
    minHeight: {
      control: 'number',
      description:
        'The minimum height of the central modal dialog. It is of number type and allows you to set a minimum height (in pixels) for the modal content. Default value is set in CSS and equals 8rem.',
    },
    height: {
      control: 'number',
      description:
        'The height of the central modal dialog. It is of number type and specifies the height (in pixels) of the modal content.',
    },
    resizable: {
      control: 'boolean',
      description:
        'If set to true, it allows the central modal to be resized by the user. It is of boolean type. Default value is false.',
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
    type: {
      options: ['central', 'bottom'],
      control: { type: 'radio' },
      description:
        "This prop determines the presentation style of the modal. You have two options to choose from: 'central' and 'bottom.'\n- When set to 'central,' the modal is centered on the page. You can customize its size using related props described above, and it can be made resizable. \n- In contrast, selecting 'bottom' places the modal at the bottom of the viewport, covering its entire width. While this type doesn't support resizing, you can choose whether to enable scrolling for the entire modal or just its content. <br />You can explore these scenarios in the Modal Types story. Typically, 'central' is used for desktop screens, while 'bottom' is favored for mobile devices. The default value is 'central.'",
    },
    bottomTypeScrollable: {
      control: 'boolean',
      description:
        "Use this prop to control the scroll behavior of a 'bottom' modal. When set to 'true,' the entire modal, including the title and footer, becomes scrollable. However, when set to 'false,' only the content within the modal is scrollable, keeping the title and footer sticky at the top and bottom, respectively. The default value is 'false.'",
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
    type: 'central',
    bottomTypeScrollable: false,
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
      const content =
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt at totam numquam. Voluptatibus sequi tempora in! Cumque voluptas dolore voluptatum vel, perferendis debitis aut, aliquam tempora repellat, incidunt ducimus quis?';
      return { args, model, openModal, content };
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
          :type="args.type"
          :bottom-type-scrollable="args.bottomTypeScrollable"
        >
          {{ content }}
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
    type: { table: { disable: true } },
    bottomTypeScrollable: { table: { disable: true } },
    onModalClosed: { table: { disable: true } },
    onModalOpened: { table: { disable: true } },
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
    maxWidth: { table: { disable: false } },
    minWidth: { table: { disable: false } },
    width: { table: { disable: false } },
    maxHeight: { table: { disable: false } },
    minHeight: { table: { disable: false } },
    height: { table: { disable: false } },
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
    resizable: { table: { disable: false } },
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
    stayOpened: { table: { disable: false } },
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

export const ModalTypesStory: Story = {
  name: 'Modal Types',
  render: DefaultStory.render,
  argTypes: {
    ...ResizableStory.argTypes,
    type: { table: { disable: false } },
    bottomTypeScrollable: { table: { disable: false } },
  },
};
