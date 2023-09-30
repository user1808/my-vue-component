<template>
  <TransitionRoot as="template" :show="modelValue">
    <Dialog class="my-modal" as="div" @close="emitModelValue(false)">
      <TransitionChild
        as="template"
        enter="modal-background-transition-enter"
        enter-from="modal-background-transition-enter-from"
        enter-to="modal-background-transition-enter-to"
        leave="modal-background-transition-leave"
        leave-from="modal-background-transition-enter-to"
        leave-to="modal-background-transition-enter-from"
      >
        <div class="my-modal-background" />
      </TransitionChild>
      <div :class="`my-modal-${type}-wrapper`">
        <div :class="`my-modal-${type}-wrapper-container`">
          <TransitionChild
            as="template"
            enter="modal-dialog-transition-enter"
            :enter-from="`modal-dialog-transition-enter-${type}-from`"
            :enter-to="`modal-dialog-transition-enter-${type}-to`"
            leave="modal-dialog-transition-leave"
            :leave-from="`modal-dialog-transition-enter-${type}-to`"
            :leave-to="`modal-dialog-transition-enter-${type}-from`"
            @after-leave="emitModalClosed()"
            @after-enter="emitModalOpened()"
          >
            <DialogPanel
              :class="[
                `my-modal-${type}-wrapper-container-panel`,
                {
                  'my-modal-central-wrapper-container-panel--resizable':
                    resizable && isCentral,
                  'my-modal-bottom-wrapper-container-panel--scrollable':
                    bottomTypeScrollable && !isCentral,
                },
                !isColorHex && color ? `my-${color}` : undefined,
                !isBgColorHex && bgColor
                  ? `my-bg-${color}`
                  : undefined,
              ]"
              :style="computedStyle"
            >
              <div
                v-if="!hideCloseIcon"
                :class="`my-modal-${type}-wrapper-container-panel-close`"
              >
                <MyButton
                  flat
                  :class="`my-modal-${type}-wrapper-container-panel-close__btn`"
                  @click="emitModelValue(false)"
                  :bg-color="bgColor"
                >
                  <MyIcon
                    library="heroicons"
                    name="x-mark"
                    :color="color"
                  />
                </MyButton>
              </div>
              <DialogTitle
                v-if="!hideTitle && (title || slots['modal-title'])"
                :class="`my-modal-${type}-wrapper-container-panel__title`"
              >
                <slot name="modal-title">
                  {{ title }}
                </slot>
              </DialogTitle>
              <div
                :class="`my-modal-${type}-wrapper-container-panel__content`"
              >
                <slot />
              </div>
              <div>
                <slot name="modal-footer" />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from '@headlessui/vue';
import MyButton from '../MyButton';
import MyIcon from '../MyIcon';
import { computed, type StyleValue } from 'vue';
import { useColor } from '@/composables/useColor';
import type {
  TMyModalProps,
  TModelValue,
} from './utils/my-modal.types';
import constants from './utils/constants.script';

const { isHexColorValue } = useColor();

const props = withDefaults(defineProps<TMyModalProps>(), {
  hideTitle: constants.DEFAULT_HIDE_TITLE,
  resizable: constants.DEFAULT_RESIZABLE,
  stayOpened: constants.DEFAULT_STAY_OPENED,
  type: constants.DEFAULT_TYPE,
  bottomTypeScrollable: constants.DEFAULT_BTM_TYPE_SCROLLABLE,
});

const emits = defineEmits<{
  'update:modelValue': [value: TModelValue];
  modalClosed: [];
  modalOpened: [];
}>();

const slots = defineSlots<{
  default(): any;
  ['modal-title'](): any;
  ['modal-footer'](): any;
}>();

const emitModelValue = (newValue: TModelValue) => {
  if (!props.stayOpened) {
    emits('update:modelValue', newValue);
  }
};

const emitModalClosed = () => {
  emits('modalClosed');
};

const emitModalOpened = () => {
  emits('modalOpened');
};

const isColorHex = computed(() => isHexColorValue(props.color));
const isBgColorHex = computed(() => isHexColorValue(props.bgColor));

const computedStyle = computed<StyleValue>(() => {
  return {
    width: props.width && isCentral ? `${props.width}px` : undefined,
    minWidth:
      props.minWidth && isCentral ? `${props.minWidth}px` : undefined,
    maxWidth:
      props.maxWidth && isCentral ? `${props.maxWidth}px` : undefined,
    height:
      props.height && isCentral ? `${props.height}px` : undefined,
    minHeight:
      props.minHeight && isCentral
        ? `${props.minHeight}px`
        : undefined,
    maxHeight:
      props.maxHeight && isCentral
        ? `${props.maxHeight}px`
        : undefined,
    backgroundColor: isBgColorHex.value ? props.bgColor : undefined,
    color: isColorHex.value ? props.color : undefined,
  };
});

const isCentral = computed(() => {
  return props.type === 'central';
});
</script>

<style scoped lang="scss">
@use './MyModal.scss';
</style>
