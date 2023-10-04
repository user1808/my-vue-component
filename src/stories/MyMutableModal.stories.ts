import { MyButton, MyMutableModal } from '@/main';
import { type Meta, type StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

const meta: Meta<typeof MyMutableModal> = {
  title: 'Components/MyMutableModal',
  tags: ['autodocs'],
  parameters: { controls: { sort: 'alpha' } },
  component: MyMutableModal,
  argTypes: {
    modelValue: {
      control: 'boolean',
      description:
        "Determines whether the modal is visible or not. This is a common prop for every modal and must be of type boolean. It is a required prop. \n\n <b>WARNING:</b> \n This component has logic written in JavaScript. While you can use it, in most cases, it's better to rely on media queries. I created it primarily for practice.",
    },
    title: {
      control: 'text',
      description:
        'Specifies the title of the modal. This is one of the four common props for every modal and should be of type string.',
    },
    color: {
      control: 'color',
      description:
        'Sets the color of the modal. This is one of the four common props for every modal and should be a string representing a hex color or one of the color names.',
    },
    bgColor: {
      control: 'color',
      description:
        'Defines the background color of the modal. This is one of the four common props for every modal and should be a string representing a hex color or one of the color names.',
    },
    modals: {
      control: 'object',
      description:
        "An object that contains 'props' and 'fromWidth' properties. 'props' can include all MyModal props except for those mentioned here as common props. 'fromWidth' specifies the width of screen from which the modal with these props should be visible. This prop is required.",
    },
    'modal-title': {
      control: 'text',
      description:
        'A common slot for customizing the title content of every passed modal. Refer to the MyModal Story for more details on how to use this slot.',
    },
    default: {
      control: 'text',
      description:
        'A common slot for customizing the title content of every passed modal. Refer to the MyModal Story for more details on how to use this slot.',
    },
    'modal-footer': {
      control: 'text',
      description:
        'A common slot for customizing the title content of every passed modal. Refer to the MyModal Story for more details on how to use this slot.',
    },
  },
  args: {
    modelValue: false,
    title: 'My Mutable Modal',
    modals: [
      { props: {}, fromWidth: 0 },
      { props: { type: 'bottom' }, fromWidth: 600 },
      { props: {}, fromWidth: 900 },
    ],
    default: '<span> Content </span>',
    'modal-footer': '<span> Footer </span>',
  },
};

export default meta;
type Story = StoryObj<typeof MyMutableModal>;

export const DefaultStory: Story = {
  name: 'Default',
  render: (args) => ({
    components: { MyMutableModal, MyButton },
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
          My MutableModal
        </MyButton>
        <MyMutableModal 
          v-model="model"
          :title="args.title"
          :color="args.color"
          :bg-color="args.bgColor"
          :modals="args.modals"
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
        </MyMutableModal>
      </div>
    `,
  }),
};
